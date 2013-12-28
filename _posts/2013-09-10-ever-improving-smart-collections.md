---
layout: blog
title: Ever Improving Smart Collections
category: blog
summery: "About two months back, I released Smart Collections with a completely redesigned Mongo driver for Meteor with performance and scalability in mind. This is a update on what are the recent changes I've implemented."
---

About two months back, I released [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) with a completely redesigned Mongo driver for Meteor with performance and scalability in mind. 

Last month, [David Glasser](https://twitter.com/glasser) from Meteor Core [reviewed](https://groups.google.com/d/msg/meteor-talk/h-ulU7guh1Y/nTfJ1F8uGxwJ) Smart Collections and pointed out some of the major differentiations between Smart Collections and the original Meteor implementation. 

Since then, I worked hard to fill those gaps and make Smart Collections compatible with the original implementation while keeping its smartness. In the following section I will show you some of the major changes I have implemented last month. 

## Limit and Sort Support

First few releases of Smart Collections did not come with a proper support for limit and sort. I had to change some of the internals to get this done. Latest Smart Collections release does support for limit and sort.

## Multiple Observers for Cursor

Earlier you can could only add a single observer to a cursor. This is okay for most apps but it's better if we could add many. With the latest release you can add as many observers as you need. 

## Bind Environment Support

SC did not follow [`Meteor.BindEnvironment()`](https://www.eventedmind.com/posts/meteor-what-is-meteor-bindenvironment) to run code inside a fiber. Latest release uses it.

## Caching Support
One of the first concerns of Smart Collections is being not required to cache documents at all. 
But with the additional feature support and Meteor collection compatibility, caching has become a must-have. If caching is not exist, some additional tasks have to be performed and these tasks are so costly for both Mongo and Meteor. 

Latest version of SmartCollection does cache on a "per query" basis and normally it does not increase the memory usage level rapidly.

## Latency Compensation Support

One of the major concerns for David was the lack of latency compensation support in Smart Collections. In reality, implementing proper latency compensation support with Smart Collections is difficult because I have to consider situations where [oplog](http://meteorhacks.com/lets-scale-meteor.html) is enabled. 

I have implemented partial latency compensation support. It does not support update and remove with selectors. I have not fully tested this yet; So I have not merged it into master. Please checkout [writefence-support](http://goo.gl/uatllo) branch and let me know how it works. 

## Observe support
With the recent decision to allow caching, now it is possible to add support for server side `.observe().` I haven't implemented this yet but will do it soon. 

## Things still we are missing 

Smart Collections does its performance magic with the use of query matcher provided by MiniMongo. It has implemented most of the mongo features, but not all. For an example it does not support geo partial queries. For such scenarios Smart Collections is not a choice. 

Smart Collections still don't support ObjectID. I [started working](http://goo.gl/9ZFVWP) on it sometime back, but with the recent changes I might have to start again. 

Smart Collections also don't support for optional `connection` parameter to use with another Mongo connection. It can be implemented without much effort though. 

Smart Collections also don't support Skip. Skip is a [very costly](http://stackoverflow.com/a/7228190/457224) operation in Mongo. So it's generally wise to ignore it. I haven't planned yet to implement this. 

## What's next

My focus for this month is to make Smart Collections compatible with the existing Meteor implementation as much as possible.  

Although Smart Collections provide a ton of performance improvements, I need to see what else is possible for us to make it even better. 

In the future, I have some plans to add better support for nested objects and arrays. It might involves changes to DDP too. But not so soon :-)

## Thank You All

Smart Collections won't be at this stage without you all. I would like to thank everyone who helped me in numerous ways. Let me know what else you need! That motivates me. 

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.
