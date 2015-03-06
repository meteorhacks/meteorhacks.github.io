---
layout: blog
title: Load Balancing Your Meteor App
category: blog
summery: In this article, I'll show you how to load balance a Meteor app in few different ways.
---

In this article, I'll show you how to load balance a Meteor app in few different ways. Before that, let's learn a bit about Meteor.

## How meteor works

We develop meteor apps without worrying too much about the client server architecture. But at the end, meteor is another client server app. It has a part runs on the browser, and a part runs on the server. And there is a communication channel between the two. This is the same way how Gmail, Google Docs and so many other apps work.

When we are running a meteor app with a cluster of nodes, we need to load balance connections between the client and server correctly. Technically what we have to do is to load balance a set of websocket and SockJs connections.

[Websocket](http://en.wikipedia.org/wiki/WebSocket) is a part of the HTML5 specification, which makes it is possible to established a direct connection between the server and the client. Due to several reasons, availability of websocket cannot be guaranteed every time. So we need a way to communicate in those situations. That is when [SockJS](https://github.com/sockjs) comes in to the table as a websocket emulation layer. It is a set of techniques which allows you to do websocket like communication between the server and the client.

## Let's scale

Okay! Now we know what to scale, then lets discuss  how to scale. Our Ideal load balancer much fulfill these requirements.

* It needs to support websocket
* It should support [sticky-sessions](http://wiki.metawerx.net/wiki/StickySessions) which needs by SockJS

Basically, there are two ways we can do this, either use some cloud service provider, or do it yourself. I will discuss about the both here.

### Load balancing meteor with cloud service providers

If you choose this path, you will have to deploy your app (with the meteor cluster) on their infrastructure. That is not so uncommon these days. Let's start analyzing these services.

#### [Modulus](http://modulus.io/)
Modulus is technically equivalent to Nodejitsu, but they are quite new. They are the people behind popular [demeteorizer](https://github.com/OnModulus/demeteorizer) tool, which converts a meteor app into a standard nodejs app.

#### [AWS Elastic Load Balancer (ELB)](http://aws.amazon.com/elasticloadbalancing/)
If you try to load balance your app using ELB, you are in bit trouble. ELB natively does not support websocket, but it does support Sticky Sessions. There is a way we can turn on websocket with the TCP mode, but then it drops Sticky Session support. If you decide to go with ELB try following.

* Enable HTTP load balancing with Sticky Session on Port 80
* Enable TCP load balancing on Port 8080, which allows websocket

By default client connects to port 80 and it allows SockJS to works fine. You can also ask clients to use port 8080 if they have websocket. (have to do it manually)

#### [Heroku](https://www.heroku.com/)

Heroku supports websockets but not Sticky Sessions.

## Implement a load balancer yourself

Let's discuss  implementing a load balancer which supports both Sticky Sessions and websocket. This is not so difficult as it seems.

### Use Cluster

[Cluster](https://meteorhacks.com/cluster-a-different-kind-of-load-balancer-for-meteor.html) is a very interesting load balancer which resides on your app. It can automatically discovery new server instances. It's specifically designed for Meteor so, you don't need to worry much about configuring it. It also has multi-core support.

Even though it does a lot, it's a simple Meteor [package](https://github.com/meteorhacks/cluster). Just add it your app and that's all you've to.

Follow this articles for More Information:

* [Meteor Cluster - A Different Kind of Load Balancer for Meteor](https://meteorhacks.com/cluster-a-different-kind-of-load-balancer-for-meteor.html)
* [Meteor Cluster Performance Test](https://meteorhacks.com/cluster-performance-test-its-impressive.html)
* [Introducing Multi-Core Support for Meteor](https://meteorhacks.com/introducing-multi-core-support-for-meteor.html)

### Use [Nginx](http://wiki.nginx.org/Main) or [HAProxy](http://haproxy.1wt.eu/)

Both tools are identical when it's comes to load balancing. They do support both of our requirements. Configuration is also not so difficult. But if you need to add and remove meteor nodes with the load(auto scaling), you have do some work.
