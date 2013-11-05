---
layout: pro-meteor-post
title: Understanding Meteor Internals
category: prometeor
summery: "Now we are trying to explore how to deploy meteor applications in production with confidence. But before we are touching any topics, you should have a proper understanding of Meteor. I highly recommend following Discover Meteor which is best way to get started with meteor"
---

Now we are trying to explore how to deploy meteor applications in production with confidence. But before we are touching any topics, you should have a proper understanding of Meteor. I highly recommend following Discover Meteor which is best way to get started with meteor.

Also, you need to have some basic understading of some of the meteor internals. I'll cover them in this section. You'll be learning everything you need to know about Meteor internals when it comes to scaling.

## Meteor is a server, also it is a client
Ultimately, browsers, proxy servers, routers and other network components see your meteor application as a typical web application. Meteor has a part which runs inside the browser and another part which runs inside the server. These two parts are configured to communicate with each others as other web applications does (like Gmail, Facebook and so on).

Meteor very cleverly hides this complexity from you.

<!-- Illustration goes here with client and server -->

## Meteor handles three different types of requests

Even though you didn't realized, Meteor handles 3 types of request. They are

* Static Files
* DDP Messages
* HTTP Requests

<!-- Illustration goes here with client and server talking with 3 different types of messages -->

### Static Files

Static files are simply images, and other resources you put inside the `/public` folder. Meteor serves them automatically once you started your app. Meteor minify and concatnate all the JavaScript and CSS files and serves them as static files. 

Also, all your templates are compiled into JavaScript and they are also included when minifying.

### DDP Messages

DDP is the protocol meteor used to communicate between the client and the server. All your client side subscription data, method calls and mongodb operations are communicated as DDP messages. It is very tiny protocol. You can even inspect these messages with a handy tool called ddp-analyzer.

### Http Requests

Meteor can handle HTTP Requests as other traditional applications. Although there is no officail documentation, you can handle them with [Meteor Router](https://github.com/tmeasday/meteor-router#server-side-routing).

For an example, when you are uploading a file to your meteor app, you are sending it as a HTTP Request.

## Meteor has two types of servers

Although you are using a single port for your meteor application, internally meteor works as two seperate servers.

1.HTTP Server
2.DDP Server

<!-- Illustration goes here with client and server talking with 2 different servers-->

### HTTP Server

HTTP Server will be used to serve static files and HTTP Requests. Meteor uses `connect` NodeJS module for this purpose.

### DDP Server

Meteor has a DDP Server which handles all the publications, mongodb operations and Meteor methods. Meteor uses SockJS as the transport protocol for this. Actually DDP Server is a SockJS Server customized for Meteor.

I will show you how to scale these two servers seperately for your Meteor application in the upcoming sections.

## MongoDB and Meteor

Even though we've scaled HTTP and DDP Servers, we can't fully achieve the 100% scalability. By default meteor polls mongodb for changes, so when you are having muliple meteor instances there is a delay for other servers to get those changes. 

As an example, lets say we've two meteor servers. (A and B). You are connected to server A. Now you are adding a new post to your app. Users who've connected to server B won't get the new post in realtime, they've to wait few seconds to get it loaded.

<!-- Show how this 10 secs latency works -->

We need to configure both meteor and mongodb to get rid of this issue. I'll show you how to do them in upcoming sections.

Now we have a better understanding of Meteor internal which we need to focus on when its comes to scaling. Let's start our journey.

