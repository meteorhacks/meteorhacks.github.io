---
layout: pro-meteor-post
title: Does Meteor Scale?
category: prometeor
summery: "Does Meteor Scale? This is the question, I think most people worried about Meteor. After you read this article, you can decide your own -- whether Meteor scales or not!"
hide: true
---

Does Meteor Scale? This is the question, I think most people worried about Meteor. Some argue Meteor is a really good framework for prototyping, but not for a real production app. After you read this article, you can decide your own.

## Scaling Myth

With the emerge of Cloud Computing (and specially Heroku), some people think scaling is just adding more instances. That is completely wrong. 

You need take care of routing, sessions, job processing, static file serving, database optimization and a lot more things. Any Meteor app needs to address most of these issues. Besides that Meteor also needs to address some more unique issues. 

## Issues Unique to Meteor

These are some of the issues, you don't need worry about when you are using Ruby on Rails, PHP, ExpressJS or similar. They are native to Meteor. But some of these issues are already solved. We only need to figure out how to fit them together and apply correctly into Meteor. So let's have a look at these issues first.

### Use of SockJS

Meteor uses [SockJS](https://github.com/sockjs/sockjs-node) as the transport layer for communicating between client and the server. SockJS needs Sticky Sessions. Which means: All the requests for a particular client must be served from a Single Server for a specific amount of time.

This is not an uncommon issue to solve.

### Hot Code Reloading

Meteor apps are consider as _Single Page Apps_ and long lived in the Browser. Sometimes there are conflicts in the server and client. It is due to the version mismatch of client side code. This becomes a real issue, if you push new code often, which is not so rare these days. Fortunately Meteor identifies these code changes and ask the browser to reload. Also, Meteor is smart enough to preserve session information even after the reload. This feature is called "Hot Code Reload".

Due to the default Hot Code Reload logic, Meteor client app needs to connect to the same server it was loaded from.

### Polling For Changes in MongoDB

Meteor is all realtime. Meteor currently achieves the realtime behavior by, polling and comparing documents after every db write operation. This is the main bottleneck for scaling and it introduces two main issues.

1. This polling and comparing logic takes a lot of CPU power and network I/O.
2. Just after we did a write operation, there is no way to propagate changes to other Meteor instances in realtime. Changes will only be picked in the next time when meteor polls. (in ~10 secs)

See following illustration to see how Meteor identifies db changes with polling
![Realtime Changes with MongoDB Polling](https://i.cloudup.com/NUonhQFdUh.png)

## How We Can Solve Meteor Scaling Issues

There is nothing, which cannot be solved. This section shows you how to solve above mentioned issues and some other common scaling issues. We won't be discussing about the implementations in this article, but in next few articles.

### Sticky Session Enabled Load Balancing

Any Load Balancer put in front of Meteor instances needs to take care of issues raised from SockJS and Hot Code Reload. Actually these are not so hard to solve. We need to configure the Load Balancer for Sticky Sessions. We need to make sure Sticky Session applies for static content as well (at least for the first HTML page). 

### Meteor With MongoDB Oplog

As mentioned before, Meteor's scaling bottleneck is the use of polling and comparing algorithm. There is a better approach to get realtime changes from MongoDB. That is with the [MongoDB Oplog](http://docs.mongodb.org/manual/core/replica-set-oplog/). Additionally, oplog based solution works with multiple meteor instances without much effort. Even you can directly write into the Database and Meteor can see the changes.

So oplog integration will solves both issues raised from the MongoDB Polling.

MongoDB Oplog is a log, which records each and every db write operations. It is so reliable and used for MongoDB Replication (Replica Sets). Also Oplog is a [Capped Collection](http://docs.mongodb.org/manual/core/capped-collections/), which can be configured to have a fixed size and can be tailed. [Tailing](http://docs.mongodb.org/manual/tutorial/create-tailable-cursor/) nature of Oplog can be used to capture db changes in realtime.

See following illustration to see how Meteor gets db changes with the Oplog.
![Realtime Changes with Oplog](https://i.cloudup.com/Qrw3Ezy2DE.png)

### Smart Caching

It is a good idea to put a caching server in front of Meteor. This will reduce the load on Meteor to serve static content. NodeJS(where meteor runs) [**does not** work well](http://www.quora.com/Node-js/What-are-the-disadvantages-of-using-Node-js-for-handling-static-resources/answer/Vineet-Markan) with static file serving, so using a cache server gives you much better performance.

But we need to make sure, caching server does not cache the first HTML page loaded from Meteor into the browser. Actually it is the only HTML content meteor loads. This HTML page contains a JavaScript variable called 'serverId' which will be used to compare versions in Hot Code Reload logic.

### Improved Application & MongoDB Performance

We need to fix most common performance issues, which helps a lot in the scaling process. First place to look for them are queries and indexes. Meteor does not auto-magically add indexes, so we need to add them explicitly. Indexes can give us a lot of performance gain. 

If you can optimize the usage of Subscriptions and Queries, you could expect some notable performance gains too.

### Scaling MongoDB

MongoDB is a core component of meteor. So we need to take care of MongoDB well. Generally, MongoDB performs quite well. It supports both vertical and horizontal scaling. You can add a more powerful server for the MongoDB or use [MongoDB Sharding](http://docs.mongodb.org/manual/sharding/) to scale horizontally. 

Although MongoDB comes with better sharding tools, you need to do it very carefully.

### Use of CDN

If your app is so heavy on static content like images and video. You **must not** host them inside meteor. Nowadays using a CDN is not much that hard.

## Okay, Does Meteor Scale?

Now you can decide whether Meteor scales or not! In the next few articles you'll be learning how to use commonly available tools and services for scaling Meteor.

