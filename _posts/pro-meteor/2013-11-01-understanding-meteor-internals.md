---
layout: pro-meteor-post
title: Understanding Meteor Internals
category: prometeor
summery: "Now we are trying to explore how to deploy meteor applications in production with confidence. But before we are touching any topics, you should have a proper understanding of Meteor. I highly recommend following Discover Meteor which is best way to get started with meteor"
---

With this tutorial, we are trying to explore how to deploy Meteor applications in production servers with confidence. However, before we touch base on any topic, you should have a basic understanding of Meteor. I highly recommend following Discover Meteor, which is the best way to get started with Meteor.

It would also help if you have some basic understanding of the Meteor internals. I'll cover them in this section. You'll be learning everything you need to know about Meteor internals when it comes to scaling.

## Meteor is a Server. It is also a Client
Ultimately, browsers, proxy servers, routers and other network components see your Meteor application as a typical web application. Meteor has a part that runs inside the browser and another part that runs inside the server. These two parts are configured to communicate with each other much like other web applications. (Gmail, Facebook and so on)

Meteor very cleverly hides this complexity from you.

<!-- Illustration goes here with client and server -->

## Meteor Handles Three Different Types of Requests

Even though you don’t realize, Meteor handles 3 types of requests. They are;

* Static Files
* DDP Messages
* HTTP Requests

<!-- Illustration goes here with client and server talking with 3 different types of messages -->

### Static Files

Static files are simply images and other resources you put inside the `/public` folder. Meteor serves them automatically once you start your app. Meteor minify and concatenate all the JavaScript and CSS files and serve them as static files. 

All your templates are compiled into JavaScript and they are also included when minifying as well.

### DDP Messages

DDP is the protocol Meteor use to communicate between the client and the server. All your client side subscription data, method calls and MongoDB operations are communicated as DDP messages. It is a very tiny protocol. You can even inspect these messages with a handy tool called ddp-analyzer.

### Http Requests

Meteor can handle HTTP Requests similar to other traditional applications. Although there is no official documentation, you can handle them with [Meteor Router](https://github.com/tmeasday/meteor-router#server-side-routing).

For an example, when you are uploading a file to your Meteor app, you are sending it as a HTTP Request.

## Meteor has Two Types of Servers

Although you are using a single port for your Meteor application, internally meteor works as two separate servers.

1.HTTP Server
2.DDP Server

<!-- Illustration goes here with client and server talking with 2 different servers-->

### HTTP Server

HTTP Server is used to serve static files and HTTP Requests. Meteor uses `connect` NodeJS module for this purpose.

### DDP Server

Meteor has a DDP Server that handles all the publications, MongoDB operations and Meteor methods. Meteor uses SockJS as the transport protocol for this. In actuality DDP Server is a SockJS Server customized for Meteor.

I will show you how to scale these two servers separately for your Meteor application in the upcoming sections.

## MongoDB and Meteor

Even though we've scaled HTTP and DDP Servers, we can't fully achieve 100% scalability. By default Meteor polls MongoDB for changes. So when you are having multiple Meteor instances, there is a delay for other servers to get those changes. 

For an example, lets say we've two Meteor servers. (A and B). You are connected to server A. Now you are adding a new post to your app. Users who've connected to server B won't get the new post in realtime, they've to wait a few seconds to get it loaded.

<!-- Show how this 10 secs latency works -->

We need to configure both Meteor and MongoDB to get rid of this issue. I'll show you how to do these in upcoming sections.

Now we have a better understanding of Meteor internals that we need to focus on when it comes to scaling. Let's start our journey.