---
layout: blog
title: Load Balancing Your Meteor App
category: blog
summery: 'I think you remember, I have talked about scaling your meteor app with Meteor Cluster in our <a href="http://meteorhacks.com/meteor-cluster-introduction-and-how-it-works.html">first article</a>. In that article, I just skipped from talking about load balancing. With this article, I tried to explain how  to load balance your meteor app correctly.'
---

>
>Update: See my new article on this topic: [Does Meteor Scale?](/does-meteor-scale.html)
>

Now scaling meteor is not a very difficult task, thanks to the [Meteor Cluster](http://meteorhacks.com/meteor-cluster-introduction-and-how-it-works.html). But Meteor Cluster only takes care about the synchronization of collections across the cluster. But there is another part when comes to scaling, that is load balancing between these nodes.

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

#### [Nodejitsu](https://nodejitsu.com)

Nodejitsu is a one of the greatest NodeJS PAAS provider which has a good track record. If you deploy your app with Nodejitsu, there is nothing you have to do for the load balancing. Their load balancer supports both websocket and sticky sessions.

#### [Modulus](http://modulus.io/)
Modulus is technically equivalent to Nodejitsu, but they are quite new. They are the people behind popular [demeteorizer](https://github.com/OnModulus/demeteorizer) tool, which converts a meteor app into a standard nodejs app.

#### [AWS Elastic Load Balancer (ELB)](http://aws.amazon.com/elasticloadbalancing/)
If you try to load balance your app using ELB, you are in bit trouble. ELB natively does not support websocket, but it does support Sticky Sessions. There is a way we can turn on websocket with the TCP mode, but then it drops Sticky Session support. If you decide to go with ELB try following.

* Enable HTTP load balancing with Sticky Session on Port 80
* Enable TCP load balancing on Port 8080, which allows websocket

By default client connects to port 80 and it allows SockJS to works fine. You can also ask clients to use port 8080 if they have websocket. (have to do it manually)

#### [Heroku](https://www.heroku.com/)

Unfortunately, they don't support either websocket or Sticky Sessions.

### Implement a load balancer yourself

Let's discuss  implementing a load balancer which supports both Sticky Sessions and websocket. This is not so difficult as it seems.

### Use [Nginx](http://wiki.nginx.org/Main) or [HAProxy](http://haproxy.1wt.eu/)

Both tools are identical when it's comes to load balancing. They do support both of our requirements. Configuration is also not so difficult. But if you need to add and remove meteor nodes with the load(auto scaling), you have do some work.

### Using NodeJS load balancing

There is a couple of good NodeJS load balancers out there. (try [http-proxy](https://github.com/nodejitsu/node-http-proxy) or [bouncy](https://github.com/substack/bouncy)). Actually these are reverse proxy servers which support websocket. But it is not so difficult to convert them as load balancers, which support Sticky Sessions. These tools provide much more flexibility, and you can very easily configure them for autoscaling. But the downside is, they consume more resources than Nginx or HAProxy.

I think now you've got a good understanding to load balance your meteor app. So it's up to you to decide which path you should take.

## Dedicated load balancer for Meteor.

I am working on a new kind of load balancer for Meteor. It is a load balancer where it does not proxy websocket or SockJs connections by itself. It simply asks the client to connect with a particular meteor node instead. [Subscribe](https://tinyletter.com/meteorhacks) to MeteorHacks to get more information on this :)
