---
layout: blog
title: Let's Scale Meteor - Using MongoDB Oplog
category: blog
summery: "Now we can scale Meteor horizontally, very easily with Smart Collections. See how easy it is."
---

> Smart Collection is now retired & Meteor's Collection implementation has fixes for most of the performance bottlenecks. It is also using the MongoDB oplog just like Smart Collections.
>

>Update: See my new article on this topic: [Does Meteor Scale?](/does-meteor-scale.html)
>

A few months back, I introduced [Meteor Cluster](http://meteorhacks.com/meteor-cluster-introduction-and-how-it-works.html) on this blog, which is a way we can scale meteor horizontally while retaining Meteor's realtime behavior. But it was a hack and as a result, it was not so efficient. So I began looking into alternatives and tailing [MongoDB oplog](http://docs.mongodb.org/manual/reference/glossary/#term-oplog) seems like to be the ideal solution. But it didn't play well with the current collection implementation. So I wrote [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html).

Today, I've completed MongoDB oplog integration into Smart Collections and now you can scale meteor very effectively. What's more it's dead simple to use. 

## Five Minute Guide

> Like to watch, rather reading? Watch my Screencast on <a href='http://www.youtube.com/watch?v=ctSd9VXvp_0' target='_blank'>Scaling Meteor with Smart Collections</a>

Without digging into technical details, let's scale a Meteor app. For that,

* You need to configure MongoDB for an active oplog
* You need to use Smart Collections in your app

### Configure MongoDB

* Now you need to use a separate MongoDB server
* Start it with `mongod --replSet meteor`
* Start a `mongo` shell and configure mongo as follows

Apply these commands

    var config = {_id: "meteor", members: [{_id: 0, host: "127.0.0.1:27017"}]}
    rs.initiate(config)

### Configure App

* Use Smart Collections instead of Standard Collections

Start each Meteor instance with `OPLOG_URL` and the `MONGO_URL`

    export MONGO_URL=mongodb://localhost:27017/appdb
    export OPLOG_URL=mongodb://localhost:27017/local
    meteor

Now you've a cluster of horizontally scaled meteor instances. Isn't that easy?

> I can also help you to scale your app in production. [Let's talk :)](mailto:arunoda.susiripala@gmail.com)

## Implementation Details
![Scaling Meteor with Mongo Oplog](http://i.imgur.com/kb7stMV.png)

Let's dig in if you want to know what's really happening behind the scene.

### What is MongoDB Oplog

MongoDB oplog is the heart of MongoDB's replication engine (replicaSets). Oplog contains a log of all the write operations occurring in Mongo. In MongoDB replication, secondaries listen to master's oplog and apply changes accordingly. 

In Smart Collections, I've used the same approach. Smart Collections listen for the MongoDB oplog, apply changes and invalidate documents accordingly.

### Is it Reliable?
**Yes**. This is the same technology used in MongoDB [replication](http://docs.mongodb.org/manual/replication/), so it is very reliable. Recently [10gen](http://www.10gen.com/) started a Mongo oplog based [backup service](https://mms.10gen.com/). So you can imagine how reliable it is.

### Does it take some extra space?
**No**. Oplog is itself is a [**Capped Collection**](http://docs.mongodb.org/manual/core/capped-collections/). Capped Collections have fixed size; so we can ask MongoDB to use a very small capped collection for the oplog. You can use `--oplogSize` option for that.

### Does it affect Meteor's performance?
**No**. Smart Collections are designed with oplog integration in mind. So oplog integration does not make any notable overhead to Meteor.

Additionally, oplog integration avoids multiUpdate and multiRemove invalidation methods used in Smart Collections. So, using Oplog makes meteor performs better.

## Endless possibilities

This Oplog Integration does not only make Meteor scalable. But opens the door for endless possibilities. Some of them are,

* You can get the full power of Multi Core CPUs with Meteor
* You can directly write into Mongo and get changes from Meteor

In the upcoming hacks, I'll discuss about some of these new possibilities. 

Okay, I did my job. Now it's your turn to scale your app correctly. I'm looking forward to your suggestions and experiences with Oplog Integration.

> If you want to know more, checkout Smart Collections [github repository](https://github.com/arunoda/meteor-smart-collections) or [Talk to me](mailto:arunoda.susiripala@gmail.com).

