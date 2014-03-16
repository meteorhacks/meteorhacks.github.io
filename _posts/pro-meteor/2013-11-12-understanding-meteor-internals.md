---
layout: pro-meteor-post
title: Understanding Meteor Internals
category: prometeor
summery: "Meteor hides a lot of complexities from you. But you must understand them in order to follow this **Pro Meteor** guide. This section covers that."
section: pro-meteor
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

Meteor is built top of the MongoDB and Meteor is totally depending on MongoDB at this moment. But this can be changed in the future.
But MongoDB is **not** a real-time database; but Meteor is realtime. Meteor makes MongoDB realtime using two techniques as shown below.

1. Polling MongoDB every ~10 secs
2. Using MongoDB oplog

Polling is very expensive operation and that's why Meteor includes another option (using oplog). But it needs some additional setup and is not possible with shared MongoDB hosting services. I will talk more on this topic in a future section.

> Edited by [Jon James](https://twitter.com/jonjamz) (Head of Technology at [Writebot](http://writebot.com/))<br>
> Originally edited by [Aloka Gunasekara](https://twitter.com/alokag).