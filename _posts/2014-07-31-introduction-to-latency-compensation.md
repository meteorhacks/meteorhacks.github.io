---
layout: blog
title: "Introduction to Latency Compensation"
category: blog
summery: "Latency Compensation is the one of the core features of Meteor. This is an introduction to it and show you how to implement it correctly."
---

If you’ve browsed [meteor.com](http://www.meteor.com) carefully or watched some Meteor videos, you will definitely have heard the term "latency compensation". Some people think this is just a buzzword and frankly I have not heard this term used anywhere else. But actually, it is very useful and adds a pleasant user experience to your app. Let me help you to understand it and show you how to use it correctly.

## Latency compensation 101

In a traditional application, when a user does some action on an app, they have to wait until the request is processed on the server before the changes are reflected by the UI. But with latency compensation, users no longer need to wait. The result of an action is reflected by the browser immediately. This is a built-in feature of Meteor and you can use it very easily. Let me explain more about it with an example.

We'll be using a simple blog app as an example. Here's the JavaScript code for our app:

~~~js
// File: /lib/collections.js

Posts = new Meteor.Collection('posts');

Meteor.methods({
  addPost: function(post) {
    // add a delay to mimic the network time
    if(Meteor.isServer) {
      Meteor._sleepForMs(2000);
    }
    var postId = Posts.insert(post);
    return postId;
  }
});

~~~

~~~js
// File: /client/app.js

Template.addPost.events({
  "click button": function() {
    var title = $('#title').val();
    var content = $('#content').val();

    var post = {
      title: title,
      content: content
    };

    Meteor.call('addPost', post, function(err, postId) {
      if(err) {
        alert(err.reason);
      } else {
        Router.go('/post/' + postId);
      }
    });
  }
});

~~~

You can read the full source code from [here](https://github.com/meteorhacks-samples/simple-blog).

### Without latency compensation

![Without latency compensation](https://i.cloudup.com/cGFO63m3qk.png)

When a user adds a new post, a request will be initiated to the server. The server will process the request and send back the document changes. After that it will send the method response and it will fire the callback. Only then will the user be redirected to the actual post added.

There is a wait time between the request initiation and delivery of the result. The user has no clue whether the action has been successfully initiated or not. We can add a loading indicator to get rid of this uncertainty, but there is a better way.

### With latency compensation

![With latency compensation](https://i.cloudup.com/LgntBPnyDI.png)

When the user adds a new post, a request will be sent immediately to the server as usual. But now, the result of the request will be instantly reflected on the client. Meteor detects the document changes on the client side and reflects the changes on the UI.

The server will process the request and send back the changes as usual. But this time, Meteor will diff and merge the server changes with the changes it has detected from the client. Most of the time, both of these are the same unless the server adds some additional fields to the post before inserting it.

So, now all the user actions are reflected immediately and there is no need to wait for the server result. Isn't that nice?

> Latency compensation is not supported in our example app yet!

### Wait, what if the server rejects the request?

It is possible for the server to reject the request or throw some error. In this scenario, the Meteor client will detect it and revert the changes. This might surprise the user, but there are ways to deal with situations like this. I will explain these later.

## Implementing latency compensation

Implementing latency compensation in your app is pretty easy. Meteor has done most of the hard work for you. Let's begin.

* Latency compensation works only if you are doing write operations to a data store supported by Meteor (currently only MongoDB and Redis).
* If you are relying on content from a third-party service like Twitter, there is no way to implement latency compensation directly.
* There are only two places where you can do a write operation to a data store: inside a method call or directly via a local collection.

If you are using a local collection, you don't have to do anything. But if you are using a method, you need to implement your method on both the server and the client.

On the client side, Meteor will evaluate your method and pick out only the data store changes. It will reject the method result or any errors that have occurred. Your method on the client is known as the method stub and the evaluation of it is known as the method simulation.

You might have noticed that our example app has defined its `addPost` method inside the `lib` directory. In this way, it should be available on both the server and the client. So, our example has latency compensation support.

But wait... I mentioned earlier that our app doesn't have latency compensation support. Why?

That's because, we are explicitly waiting for the server result and only then do we route the user to the post. Even though latency compensation works, we simply ignored it by waiting for the server response.

Let's try to fix our app and add latency compensation support.

### The fix

We can simply fix our app by adding `_id` to the post inside the client. By doing this, we no longer rely on the server result to get the postId. Now we can route the user to the newly added post just after the method call has been invoked.

Still, it's possible for the server to reject the request or throw an error. So, we need to add a callback and watch for an error. If there is an error, Meteor will revert the changes made in the client. You will also get notified about the error via the callback. Then, you can simply display an error message to the user.

This is the code, after I made the fix:

~~~
// File: /client/app.js
Template.addPost.events({
  "click button": function() {
    var title = $('#title').val();
    var content = $('#content').val();

    var post = {
      title: title,
      content: content,
      _id: Random.id()
    };

    Meteor.call('addPost', post, function(err) {
      if(err) {
        alert(err.reason);
      }
    });

    Router.go('/post/' + post._id);
  }
});
~~~

This is the diff view of the fix:

![Fix for the latency compensation](https://i.cloudup.com/iRnmkAJJqP.png)

You can have a look at the complete fixed app from [here](https://github.com/meteorhacks-samples/simple-blog/tree/latency-compensation).

## When to use latency compensation

This completely depends on your app and what you need to achieve. If there is a mission critical task, you may need the users to wait for the server response.

In Kadira, when a user adds an [alert](https://kadira.io/blog/stay-alert-with-your-meteor-app/), they need to wait until it gets processed on the server. So there is no latency compensation. That's a design decision we've chosen for Kadira alerts since we think it's important for the user to know the result before continuing.

But for an app like Telescope, latency compensation is a must and it will increase user engagement.

So, this is a subjective question and it's up to you to decide whether to support latency compensation or not.

## Common Issues

### I forgot to add the client-side method stub

Check your code and implement the method on both the client and the server. You can easily do this by implementing your method somewhere where it is accessible from both the client and the server. You can use the `Meteor.isSimulation` flag to determine whether your code runs inside a simulation or not. That may help you to tweak your method to behave differently on different environments.

### I have some secret logic in my method and I don’t want the client to see it

Yes, that's a valid question. But we only need to implement data store changes. So, you can create a method on the server with all the secret logic. Just implement data store changes in a separate method with the same name inside your client code.

### I need to rely on the server response

If you wait for the server result (using callback), you won’t get the benefit of the latency compensation. So, design your application to not rely on the server response. Actually, this is always possible, and I don’t believe it's impossible.

### I'm using a third-party service

Let's say you are building a Twitter client and the user just created a new tweet. Now, you may invoke an API call to Twitter. But still, it's a good idea to store all the tweets that have been created from your app in a collection. Then you can implement latency compensation.

---

I think you now have a better understanding of latency compensation and know how to use it correctly. Try it out with your application and share your experience.

> Thanks [Slava Kim](https://twitter.com/imslavko) for reviewing the article

---

If you’d like to learn exactly how **latency compensation** works inside Meteor, buy my book [Meteor Explained](https://gumroad.com/l/meteor-explained). I discuss latency compensation in **Chapter 4**, where I talk about Methods.

{% include meteor_explained_book.html %}
