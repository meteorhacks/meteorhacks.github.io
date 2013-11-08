---
layout: pro-meteor-post
title: Understanding Meteor Internals
category: prometeor
summery: "Meteor hides a lot of complexities from you. But you must understand them in order to follow this **Pro Meteor** guide. This section covers that."
---

We are trying to build a Production Quality Meteor Setup with this [Pro Meteor](/pro-meteor/) Guide. Before we touch anything, I assume you have a basic understanding of Meteor. I highly recommend following [Discover Meteor](http://www.discovermeteor.com/), which is the best way to get started with Meteor.

It would also help if you have some basic understanding of the Meteor internals. I'll cover them in this section.

## Meteor is a Server. It is also a Client
Ultimately, browsers, proxy servers, routers and other network components see your Meteor application as a typical web application. Meteor has a part that runs **inside the browser** and another part that runs **inside the server**. These two parts are configured to communicate with each other much like other modern web applications. ([Gmail](https://gmail.com), [Trello](https://trello.com) and so on)

![Meteor has 2 parts, which runs on the browser and the server](https://i.cloudup.com/J2CMCytr1Q.png)

Meteor simply allows you to build your application without worrying about these complexities.

## Meteor Handles Three Different Types of Requests

Even though you don’t realize, Meteor handles 3 types of requests. They are;

* Static Files
* DDP Messages
* HTTP Requests

### Static Files

Static files are simply images and other resources you put inside the `/public` folder. Meteor serves them automatically once you start your app. 

Also, Meteor minifies and concatenate all the JavaScript and CSS files and serve them as static files. (All your templates are compiled into JavaScript and they are also included when minification.)

### DDP Messages

[DDP](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md) is the protocol Meteor use to communicate between the client and the server. All your client side subscription data, method calls and MongoDB operations are communicated as DDP messages. It is a very tiny protocol. You can even inspect these messages with a handy tool called [ddp-analyzer](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html).

### Http Requests

Meteor can handle HTTP Requests similar to other traditional applications. Although there is no official documentation, you can handle them. See this StackOverflow [question](http://stackoverflow.com/questions/15059125/how-to-serve-http-requests-over-meteor).

For an example, when you are uploading a file to your Meteor app, you are sending it as a HTTP Request.

## Meteor has Two Types of Servers

Although you are using a single port for your Meteor application, internally meteor works as two separate servers.

1.HTTP Server
2.DDP Server

![Meteor Server is a combination of a HTTP Server and a DDP Server](https://i.cloudup.com/Se41C2BcEE.png)

### HTTP Server

HTTP Server is used to serve static files and HTTP Requests. Meteor uses [`connect`](https://github.com/senchalabs/connect) NodeJS module for this purpose.

### DDP Server

Meteor has a DDP Server that handles all the publications, MongoDB operations and Meteor methods. Meteor uses [SockJS](https://github.com/sockjs/sockjs-node) as the transport protocol for this. In actuality DDP Server is a SockJS Server customized for Meteor.

I will show you how to scale these two servers separately for your Meteor application in the upcoming sections.

## MongoDB and Meteor

Even though we've scaled HTTP and DDP Servers, we can't fully achieve 100% scalability. By default Meteor polls MongoDB for changes. So when you are having multiple Meteor instances, there is a delay for other servers to get those changes.

For an example, lets say we've two Meteor servers. (A and B). You are connected to server A. Now you are adding a new post to your app. Users who've connected to server B won't get the new post in realtime, they've to wait a few seconds to get it loaded.

<!-- Show how this 10 secs latency works -->

We need to configure both Meteor and MongoDB to get rid of this issue. I'll show you how to do these in upcoming sections.

> This polling logic is [very expensive](http://meteorhacks.com/introducing-smart-collections.html#poll_operation_is_very_expensive_lets_discuss_why), for a production usage Mongo Oplog based solution is recommended. Meteor 1.0 comes with a such driver and you can [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) until 1.0 comes.

Now we have a better understanding of Meteor internals that we need to focus on when it comes to scaling. Let's start our journey.

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.