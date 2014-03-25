---
layout: blog
title: "Meteor in Production - A Case Study"
category: blog
summery: "This is the very first guest post on MeteorHacks by Brent Abrahams. He talks about how SmartCollections help him to run his app – Standbench – in production. He also talks about how Standbench started and how he scaled it step by step."
---

> This is the very first guest post on MeteorHacks by [Brent Abrahams](http://cn.linkedin.com/pub/brent-abrahams/87/372/ba1). He talks about how [SmartCollections](http://meteorhacks.com/introducing-smart-collections.html) help him to run his app – [Standbench](http://www.standbench.com/) – in production. He also talks about how Standbench started and how he scaled it step by step.

> This article has been written prior to the release of [Meteor 0.7.2](https://www.meteor.com/blog/2014/03/18/meteor-072-scaling-realtime-mongodb). Author has mentioned some performance issues with Meteor Collection at the time article was written. But now it's all gone and you can use Meteor's Collection implementation with trust.

## Background

I teach mathematics at an international school. Last year, our administrators were looking for online curriculum management software for the organization.  I didn't like any of the existing solutions, and had just discovered Meteor.

It just happened that I had a nine-day holiday coming up. So I wrote an extremely ambitious list of features for such a system and started hacking. To my amazement, I was able to tick off almost all the items in just over a week, leaving me with a pretty impressive prototype on my hands.

## The Fun Part

Back at school, I pitched the prototype to the administration and they went for it. So I spent two months over the summer writing a role based access control system, an undo-redo stack for all user transactions, and a bunch of widgets that gave me, among other things, one-line-in-a-template editable text, editable lists, routed tabs, and reactive dialogs.

With everything refactored, secure and more feature-complete, we launched "[Standbench](http://www.standbench.com/)" in mid-August. Plaudits were rolling in and everyone was very pleased. Until disaster struck...

## Trouble in Paradise

During a practical teacher training session that created a lot of simultaneous database writes, the server started crashing ... hard. We were hosting [Standbench](http://www.standbench.com/) at school, and the server couldn't cope with the massive CPU hit that [Standbench](http://www.standbench.com/) was dishing out (having to diff multiple subscriptions across numerous collections, all unique to each user).

So we had a problem.

## Searching for Help

In an [extremely informative interview](http://book.discovermeteor.com/interview/nick-martin/) published in [Discover Meteor](http://book.discovermeteor.com/) (Premium Edition only), Nick Martin (Meteor core dev), says "I wrote a benchmark app that very heavily used data, and I got about **three** concurrent users," but he also says that apps without much data can serve **thousands** of concurrent users.

In the case of [Standbench](http://www.standbench.com/), we were crashing at about **ten** concurrent users, which obviously isn't acceptable for a production scenario where we could very well have 200+.

## Running out of Options

The solution to the issue of CPU use is not easy. After scaling vertically as far as possible, you're still stuck with the fact that a node process runs in a single thread on a single core. And one CPU core can only do so much on its own.

So ... I optimized the codebase as much as I knew how, using some principles from [this post](http://projectricochet.com/blog/things-you-need-know-when-scaling-meteor-js) and others gleaned from that [extremely informative interview](http://book.discovermeteor.com/interview/nick-martin/).  And ... we were still crashing at **ten** concurrent users.

## MeteorHacks to the Rescue

Enter [Arunoda Susiripala and MeteorHacks](http://meteorhacks.com/). Arunoda had just published his [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) package so, with nothing to lose, I simply switched (almost) all instances of `new Meteor.Collection` in my app to `new Meteor.SmartCollection`. It took about 2 minutes and everything just worked.

Since then, **we haven't had a single server crash**, although an informal load test with 20 concurrent users performing data intensive read actions still pushed the CPU to 100% (without the server failing).

## Further Scaling Efforts

I was **not** using the [Smart Collections MongoDB Oplog integration](http://meteorhacks.com/lets-scale-meteor.html), so that was the next thing I did, which I understand is a huge factor in making the server load lighter. For good measure, I also scaled horizontally, using [HAProxy to load balance](http://meteorhacks.com/load-balancing-your-meteor-app.html) across 4 instances of the node process (we have 4 cores available on the server), which presumably gives us close to 4 times the number of concurrent users.

At this stage, it feels like a lot of work to get a complex app deployed to scale on one's own servers, even when serving a relatively small user base. [Deploying to the meteor.com infrastructure](http://docs.meteor.com/#deploying) is sooo much easier, so I'm really looking forward to Galaxy (the Meteor Development Group's upcoming PaaS for Meteor apps).

## The Present

Six months into production, we're still alive. But I maintain, in all sincerity, that if Arunoda had not published his [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) when he did, [Standbench](http://www.standbench.com/) would have been on the shelf by now -- beautiful but useless.

I recently tried the oplog tailing that has now been integrated into the Meteor core, but it still lacks the comprehensive support that [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) has for mongo operators so, not surprisingly, I noticed a marked increase in CPU usage. I've switched back to [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) for the time being.

## The Future

There are two issues with [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html):

1.  Very occasionally the client gets in a bad state where successful updates to the server DB are not made to the client's minimongo collection (which is fixed by a browser refresh, but is confusing for the user).
2.  [Arunoda has stopped developing Smart Collections](http://meteorhacks.com/retiring-smart-collections.html), so we're currently in limbo waiting for the [Meteor core oplog integration](https://github.com/meteor/meteor/wiki/Oplog-Observe-Driver) to catch up with Smart Collections in terms of real-world performance. 

Because of these issues, I will eventually switch back to the Meteor core Collections.

## Thoughts about Meteor in Production Apps

Despite the challenges with scaling, at present, I don't think I'll be building a web app again **without** using Meteor. The development process was just too sweet. What would otherwise take months-to-years to develop can be put together in a matter of weeks.

In my mind, the cost of having to provision/configure a lot of server resources is worth paying if it makes the development/maintenance process easier. Obviously this trade-off isn't going to work for every use case.