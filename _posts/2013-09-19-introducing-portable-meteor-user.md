---
layout: blog
title: Introducing Portable Meteor User
category: blog
summery: "You might have got bored with my articles over the last couple of weeks as almost all of them have been related to performance and scaling. So this time I decided to show you something cool and useful."
---

You might have got bored with my articles over the last couple of weeks as almost all of them have been related to performance and scaling. So this time I decided to show you something cool and useful.

## It's a portable user

I’m really not sure whether "portable" is the right term to use here. However, I'll show you an easy way to transfer login states across browsers without re-entering username/password combinations. You don't required to use any additional tool or code modifications.

Watch the demo first!

<iframe width="640" height="480" src="//www.youtube.com/embed/Xgr6oplj6fY" frameborder="0" allowfullscreen="true">
</iframe>

## Creating a portable version of you

I'll show you how easy it is. You need a browser with a JavaScript Console (I prefer Google Chrome). Visit any Meteor web app, login as a legitimate user, and paste the following code to the console.

<script src="https://gist.github.com/arunoda/b76491339c9d994e4d71.js">
</script>

You will then receive an alert with a code. Copy that code, it is the portable version of you :)

This code can be passed on to other users via chat, email, or even SMS. Once they receive the code, they can use it to login to the meteor app as you.

![Protable Meteor User](http://i.imgur.com/gI9CbEO.png)

## How to use a portable meteor user

Very simple :) Visit the related meteor app using Google Chrome, and execute the code you generated in the browser console. Wait a few seconds and ... Voila! You are now successfully logged in as the user who created the "code".

## How useful is this

It depends. 

* You can use a portable user to test your app between browsers 
* You can use it as a debug tool
* You can allow your friends to use your account on your behalf (without sharing passwords)
* You can even steal someone’s identity very easily.

## What's happening behind the scenes

There is no magic here. Let's discuss what's going on.

* Meteor uses a token to remember the user's login state
* It is identical to the "Remember Me" Cookie in traditional web apps
* But Meteor uses LocalStorage instead of Cookies
* This hack simply picks "loginToken" and the "userId" from localStorage
* Then it creates a valid JS code which sets the above into localStorage again (That's the portable user)
* Once you paste the above JS code to the browser, Meteor detects the change and performs the login process against the token

## Is this bad?

I'm not a web security specialist, so I’m not sure. But you need to focus very carefully on the points below.

* Make sure each and every external JS you are using in your app can be trusted
* Make sure your users can't inject JS to your app (prevent XSS)
* Educate users to be aware of "Bookmarklets" and "Browser Extensions" if you can

That's it for today. I would really like to know your opinion on this.
