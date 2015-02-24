---
layout: pro-meteor-post
title: Run Meteor on Multiple CPUs
category: prometeor
summery: "NodeJS(where Meteor runs on) has a single process, single threaded execution model. So it can't utilize the power of multiple CPUs by default. See how we can tackle this."
section: pro-meteor
---

> This article is old. Now Meteor apps can get the benefit of multiple cores. Read this article: [Introducing Multi-Core Support for Meteor](https://meteorhacks.com/introducing-multi-core-support-for-meteor.html)

If you read our article on the [Event Loop](HTTP://meteorhacks.com/fibers-eventloop-and-meteor.html), you already know that Node.js has a single-process, single-threaded execution model. Since Meteor is built on top of Node.js, it shares the same model. 

So, even if your hosting environment supports multiple CPUs (or multiple cores), you cannot take advantage of more than one by default.

> I'll be using the term _**multiple CPUs**_ to address the scenario of both multiple cores and multiple CPUs.

## Why not the Node.js cluster module?

Node.js has provided a solution to this limitation with its [*Cluster*](http://nodejs.org/api/cluster.html) module. Let's have a look at it. 

![How cluster works](https://i.cloudup.com/ZLG5h9hvCj.png)

Cluster spawns multiple processes of your app at your command. Then, when your app receives a new HTTP request, it passes the raw socket to one of those processes randomly. Cluster is not a proxy--it simply forwards the raw socket to another process, and that process takes care of the processing. This makes it very efficient. Unfortunately, Cluster's routing algorithm doesn't support *sticky sessions*, which we need (as discussed in the [previous article](http://meteorhacks.com/how-to-scale-meteor.html)), so we can't use Cluster directly with Meteor. 

There has been an [attempt](https://github.com/indutny/sticky-session) to add sticky session support to Cluster, but it's based on source IP information. There are better ways to implement sticky sessions, such as using cookies or HTTP path (URL), but they are nearly impossible to implement into Cluster due to the way it works. Cluster doesn't read the *content* of the raw socket--such as cookies and other HTTP information--it just forwards it before anything is read on the server. 

## Using a separate load balancer

So, how do we take advantage of multiple CPUs? The only solution is to use a separate load balancer. We talked about load balancers and how to use HaProxy with Meteor in our [last article](http://meteorhacks.com/how-to-scale-meteor.html). We can use the same technique here. 

> Make sure to add a different cookie name for the load balancer used here and the load balancer used for scaling.

Fortunately, I'm [working](https://github.com/arunoda/meteor-up/issues/8) on [Meteor-UP](https://github.com/arunoda/meteor-up) to add multi-cpu support automatically. With that, Meteor-Up will do the all the hard work for you.

---------------

> Edited by [Jon James](https://twitter.com/jonjamz) (Head of Technology at [Writebot](http://writebot.com/))