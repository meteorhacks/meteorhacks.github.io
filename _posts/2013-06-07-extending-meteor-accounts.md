---
layout: blog
title: Extending Meteor Accounts (login system)
category: blog
summery: 'In this tutorial, I will guide you, how to add custom authentication system by extending Meteor Accounts'
---

Meteor has a really good user authentication system called [Accounts](http://docs.meteor.com/#accounts_api). It is so powerful and has built in support for login using password, facebook, twitter and few other oauth providers. Another important fact is that Meteor Accounts is tightly coupled with core meteor services to provide great level of security.

Okay, what if you want to add a custom authentication method? There is not much information out there for you to build such. So I began hacking into [Meteor Accounts system](http://goo.gl/PfIvj). It was written pretty well and I found that adding a custom authentication method is also pretty simple. Let's find out how.

In this tutorial I'll be creating a custom authentication system for **administration purpose** of our meteor app.
> This is not a properly implemented authentication system, but only used for demonstration purpose.

## First we need a sample app

* Create a meteor app with `meteor create admin`
* Add `accounts-ui` package with `meteor add accounts-ui`
* modify `admin.html` with following code

we simple add `loginButtons` helper from the `account-ui` package

<script src="https://gist.github.com/arunoda/08389b0250cd6e6eb788.js">
</script>

Now, when you start you app you'll see something like below. (dont worry about the message in red)

![our sample app with accounts-ui](http://i.imgur.com/GNOR8BK.png)

## Let's add the login handler

Now we need to register a login handler for our admin authentication system. This is a server side functionality, so create following content in `server/admin.js`. See comments for more information.

    Accounts.registerLoginHandler(function(loginRequest) {
      //there are multiple login handlers in meteor. 
      //a login request go through all these handlers to find it's login hander
      //so in our login handler, we only consider login requests which has admin field
      if(!loginRequest.admin) {
        return undefined;
      }

      //our authentication logic :)
      if(loginRequest.password != 'admin-password') {
        return null;
      }
      
      //we create a admin user if not exists, and get the userId
      var userId = null;
      var user = Meteor.users.findOne({username: 'admin'});
      if(!user) {
        userId = Meteor.users.insert({username: 'admin'});
      } else {
        userId = user._id;
      }

      //send loggedin user's user id
      return {
        id: userId
      }
    });

now we are done with our basic loginHandler. 

## Let's add client side login function

Add following content to a file, named `client/admin.js`. see comments in the code.

    Meteor.loginAsAdmin = function(password, callback) {
      //create a login request with admin: true, so our loginHandler can handle this request
      var loginRequest = {admin: true, password: password};

      //send the login request
      Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: callback
      });
    };

Now we've added our admin login system. Just call `loginAsAdmin` method in the browser console. You'll see admin user has logged in.
  
    //call following in the browser console.
    Meteor.loginAsAdmin('admin-password');

!['user logged as admin'](http://i.imgur.com/jEa7ZJW.png)

## Let's try to refresh the browser

Once you refresh the browser, you'll see that admin user is no longer logged in. That's because we didn't add resume token functionality to our handler. 

Let's update our loginHandler with following code to add a resume token.

    Accounts.registerLoginHandler(function(loginRequest) {
      if(!loginRequest.admin) {
        return undefined;
      }

      if(loginRequest.password != 'admin-password') {
        return null;
      }
      
      var userId = null;
      var user = Meteor.users.findOne({username: 'admin'});
      if(!user) {
        userId = Meteor.users.insert({username: 'admin'});
      } else {
        userId = user._id;
      }

      //creating the token and adding to the user
      var stampedToken = Accounts._generateStampedLoginToken();
      //hashing is something added with Meteor 0.7.x, 
      //you don't need to do hashing in previous versions
      var hashStampedToken = Accounts._hashStampedToken(stampedToken);
      
      Meteor.users.update(userId, 
        {$push: {'services.resume.loginTokens': hashStampedToken}}
      );

      //sending token along with the userId
      return {
        id: userId,
        token: stampedToken.token
      }
    });

This updated code will fix the problem.

So let's review what've done. 

* We were trying to create a administration login system for our app
* Then, we added the loginHandler for that
* We added a client side function to invoke the login request too
* Finally we added a refresh token

You can checkout [this application](https://github.com/arunoda/meteor-custom-authentication-system) from Github

Isn't it is easy to add a new authentication system/method in meteor? Just let me know your thoughts.