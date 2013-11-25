---
layout: pro-meteor-post
title: Understanding Meteor Internals
category: prometeor
summery: "Meteor hides a lot of complexities from you. But you must understand them in order to follow this **Pro Meteor** guide. This section covers that."
---

[Pro Meteor](/pro-meteor/) is a guide that has been created as a reference for building a production-quality Meteor setup. The guide assumes that its reader has a basic understanding of Meteor, but for readers that need a better introduction, [Discover Meteor](http://www.discovermeteor.com/) comes highly recommended.

This article is an introduction to Meteor’s internals, and serves as the foundation for future articles in the Pro Meteor guide.

## Meteor Internals: Meteor as a Server and a Client
A Meteor application is seen by browsers, proxy servers, routers and other network components as a typical web application. Yet Meteor is comprised of two main components: a part that runs **inside the browser** and another part that runs **inside the server**. These two parts are configured to communicate with each other in a way that’s similar to modern web applications (e.g. [Gmail](https://gmail.com) and [Trello](https://trello.com)).

![Meteor has 2 parts, which run on the browser and the server](https://i.cloudup.com/J2CMCytr1Q.png)

Meteor allows developers to build applications without worrying about the complexities of client-server connectivity.

## Meteor Handles Three Different Types of Requests

Underneath its surface, Meteor handles 3 types of requests. They are:

* Static Files
* DDP Messages
* HTTP Requests

### Static Files

Static files are images and other resources inside the `/public` folder. Meteor serves these files automatically when the app starts. 

Additionally, Meteor minifies and concatenates all JavaScript (including templates, which are pre-compiled as JavaScript) and CSS files, and serves them as static files.

### DDP Messages

[DDP](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md) is the protocol Meteor uses to communicate between client and server. All client-side subscription data, method calls and MongoDB operations are communicated as DDP messages. This is a very lightweight protocol. These messages can be inspected with a handy tool called [ddp-analyzer](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html).

### HTTP Requests

While there is no official documentation, Meteor can handle HTTP Requests similar to other traditional applications. For example, file uploads to a Meteor app are sent as HTTP Requests. See this StackOverflow [question](http://stackoverflow.com/questions/15059125/how-to-serve-http-requests-over-meteor) for details on how to manually handle HTTP requests.



## Meteor has Two Types of Servers

Although Meteor runs on a single port, internally it works as two separate servers:

* HTTP Server 
* DDP Server

![Meteor Server is a combination of a HTTP Server and a DDP Server](https://i.cloudup.com/Se41C2BcEE.png)

### HTTP Server

The HTTP server is used to serve static files and HTTP requests. Meteor uses the [`connect`](https://github.com/senchalabs/connect) Node.js module for this purpose.

### DDP Server

The DDP server handles all publications, MongoDB operations and Meteor methods. Meteor uses [SockJS](https://github.com/sockjs/sockjs-node) as the transport protocol. In actuality, the DDP server is a SockJS server customized for Meteor.

Future guides will detail how to scale these two servers separately.

## MongoDB and Meteor

It's possible to scale Meteor's HTTP and DDP servers by running multiple instances of Meteor connected to the same database, but the result isn't ideal. Because of the way Meteor polls MongoDB for changes, if one Meteor instance updates MongoDB, it may take several seconds for other instances to detect the change and propagate it to connected users.

To illustrate this further, think of two Meteor instances (A and B, with their respective HTTP and DDP servers) serving the same chat app. In front of these, a reverse proxy randomly connects users to one of these instances.  When someone connected to server A posts a chat, users connected to server B won't see the chat in real-time, as they would have to wait a few seconds before server B recognizes the change and pushes the chat to its users' browsers.

In upcoming articles, I'll show you how to configure both Meteor and MongoDB to get rid of this issue. 

> This polling logic is [very expensive](http://meteorhacks.com/introducing-smart-collections.html#poll_operation_is_very_expensive_lets_discuss_why) for production use, and it would be better to use a solution based around the MongoDB Oplog.<br>
> Meteor 1.0 comes with a such driver, but you can use [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) until 1.0 comes.

Now you have a better understanding of Meteor internals, particularly when it comes to scaling. Let's start our journey.

> Edited by [Jon James](https://twitter.com/jonjamz) (Head of Technology at [Writebot](http://writebot.com/))<br>
> Originally edited by [Aloka Gunasekara](https://twitter.com/alokag).