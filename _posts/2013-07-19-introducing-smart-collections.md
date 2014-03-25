---
layout: blog
title: Introducing Smart Collections for Meteor
category: blog
summery: "Smart Collections is a complete re-write of the MongoDB Collection API for Meteor. It is a drop in replacement for existing Collection API with much better speed, efficiency and scalability"
---

> Smart Collection is now retired & Meteor's Collection implementation has fixes for most of the performance bottlenecks. It is also using the MongoDB oplog just like Smart Collections.

> **TL;DR:**
>
> Smart Collections is a complete re-write of the MongoDB Collection API for Meteor. It is designed with following 3 areas in mind
>
>* Speed
>* Efficiency (Memory & CPU)
>* Scalability
>
> This is not a **toy** project! But a complete Collection replacement with a [well tested](https://github.com/arunoda/meteor-smart-collections/blob/master/test_cases.todo) source code. Still we might have bugs :)
>
> Head over to the [github repo](https://github.com/arunoda/meteor-smart-collections) for how to use Smart Collections with your app. It doesn't take more than 5 minutes.

Now you know what Smart Collections is. But next you'll ask why you need it? Let me explain.

## How Meteor uses Mongo internally

No offence, Meteor is a badAss framework. But it has some areas which needs improvements.

One of such area is how meteor deals with MongoDB(and it is the heart of the meteor). Here is how Meteor's realtime engine works. It polls mongodb for new updates and cache them on the RAM. It does polling in following situations.

1. after every write operation (insert/update or remove)
2. Every 10 secs cycle

It does polling per query basis. Lets say in your app, you've 20 different queries in the runtime.

> `{username: 'arunoda'}` && `{username: 'james'}` are two different queries

So when a write operation occurred in that collection

* meteor polls mongodb for all 20 queries
* get the full result
* diff it with the data in the RAM
* generate changes and notify affected clients
* store the new result in the RAM

> Chris Mather at EventedMind did a [great screencast](http://www.eventedmind.com/posts/meteor-liveresultsset) on Meteor LiveResultsSet. Check it out if you need more information on meteor's realtime engine.

## Why it is bad (or not so good)?

This is okay if you've few queries. But what if you've many queries? 

With this implementation, When a write operation is happening, you need to poll mongo for each query. Since most of the time those queries would not get affected by the write operation, polling is inefficient and ineffective.

### Poll operation is very expensive. Let's discuss why?
* It goes to mongo and fetch all the data for queries. This takes time. 
* After meteor got the results, it needs to be diff with the data in RAM to get the changes. Which is a CPU blocking operation.

### Caching all data is bad
* Caching is a good concept. 
* But caching all the data related to queries is not a good idea. Since it eats the RAM
* The Cache is only used for diffing purpose, So it is a white elephant.

## Solution

When I was looking into this, I was thinking for a solution. Finally, I was able to re-architect the mongo collection implementation while keeping the public API as it is. That's the born of Smart Collections.

<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-smart-collections&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="125px" height="30px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-smart-collections&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="30px">
</iframe>

Smart Collection has following characteristics.

* It does no caching (later may cache commonly used documents)
* No polling(minimum) and no diffing
* Designed to be integrated with MongoDB oplog

## How Smart Collections Works

Let's have a look at this diagram.

![Smart Collections Architecturee](http://i.imgur.com/Vn67xqK.jpg)

### Getting Changes
Smart Collection starts the magic after it just received a write operation either from the client or server. First it applies the operation. Then it started to invalidating and get the changes.

#### For insert operation
Insert operation is so easy to invalidate since we've the mongo document. So we can trigger correct cursors for the changes without interacting with the DB.

#### For update operation - with `_id`

We need to query mongo for the updated document. Then with the update modifier and the query selectors, we can decide which cursors(clients) will get affected with this update. Here, we only query mongo for the updated document.

#### For update operation - with a selector
This situation is bit tricky. We need to get all the documents associated with the update selector and do the above process(without querying mongo again) for each document.

#### Remove operation - with `_id`
Cursors know which ids they have. So we can easily send changes to cursors without dealing with mongo.

#### Remove operation - with a selector
This is the only place we need to do polling for all the queries with the db. But we only need the `_id` from the mongo. After that, we notify affected cursors.

### Notifying Clients
Smart Collections uses existing pub/sub mechanism to send changes to clients. So there are no code changes for you.

### Client Side Write Operations
Client side write operations are carried with method calls. It does permission checks as well. 

## Scalability

We can tail [mongodb oplog](http://docs.mongodb.org/manual/core/replica-set-oplog/) for all the write operations inside meteor. With those ops, we can simply invalidate cursors. MongoDB oplog is per document basis. So we don't have situations with remove and update operations with selectors, which leads to zero mongodb polling.

> See, how to [scale meteor](http://meteorhacks.com/lets-scale-meteor.html) with Smart Collections

## Benefits

I think I don't need to write this section. Anyway with Smart Collections you'll get following benefits.

* Improves overall speed
* Low Memory Usage
* Low CPU Usage
* Low MongoDB overhead
* Get the benefit from multiple CPU cores (with oplog)
* Easy Horizontal Scaling (with oplog)
* Get changes from direct writes to mongo (with oplog)

## Compatibility

SmartCollection designed to be fully compatible with existing [Collection API](http://docs.meteor.com/#collections). But there are few edge cases.

* in the **server side** you won't get `.observe()` since we don't cache documents (but you can use `.observeChanges()` anywhere)
* `_id` must be a `String` (`ObjectId` and `number` support coming soon)

I hope I could be able to explain how Smart Collection works, and why it is different from the existing implementation. So it is your turn now. [Give it a try](https://github.com/arunoda/meteor-smart-collections) and tell me how it goes. Don't forget to bug me for [issues](https://github.com/arunoda/meteor-smart-collections/issues) :)
