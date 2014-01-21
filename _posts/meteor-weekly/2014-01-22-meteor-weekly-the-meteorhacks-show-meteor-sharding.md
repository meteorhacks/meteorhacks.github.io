---
layout: meteor-weekly-post
title: The MeteorHacks Show, Meteor Sharding and More
category: meteorweekly
---

## The MeteorHacks Show
I have decided to do a [Monthly webinar series](http://meteorhacks.com/announcing-the-meteorhacks-show.html) showcasing some of the development & hacks at MeteorHacks. We had our first webinar yesterday and it was a success with over 50 live attendees. I mainly talked about FastRender and Subscription Optimization. Live Record and slides of the webinar will be available within this week.

## Meteor Sharding - A newer way to scale meteor
Oplog integration is the meteor's main approach for scaling at the moment. But in this case, we are backed by a single MongoDB server. (okay, we can do sharding). But there is a new approach for scaling [discussed in the meteor-core](https://groups.google.com/forum/#!topic/meteor-core/dbZsRXhSuSc) mailing list. With that, you could be able to connect to a different DDP servers depending on the some logic in the client side. There is much work needs to be done, but preliminary work has been [implemented](https://github.com/meteor/meteor/pull/1762).

## Featured Discussions on Google Groups

* [Discussion on hot code reload](https://groups.google.com/forum/#!topic/meteor-talk/sSS9jlyq5wg)
* [Using direct mongo commands](https://groups.google.com/forum/#!topic/meteor-talk/CGk-zMnkXwU)
* [Subscription Manager Preview](http://www.youtube.com/watch?v=xzPg0-_TcXU)
* [Using Cron Jobs with Meteor](https://groups.google.com/forum/#!topic/meteor-talk/hwFL1KbGnG0)
* [MongoDB and Max Pool Size](https://groups.google.com/forum/#!topic/meteor-core/DoDhaRniI7M)

## Blog and Other Resources

* [Using Cloudflare with Meteor](http://meteorhacks.com/cloudflare-meets-meteor.html)
* [DiscoverMeteor: New Year Update](https://www.discovermeteor.com/2014/01/15/the-discover-meteor-new-year-update/)
* [Live Hangout with Discover Meteor and EventedMind](https://www.meteor.com/blog/2014/01/15/live-hangout-with-discover-meteor-and-eventedmind-next-week)
* [There's A Meteor Coming!](http://blog.gopeerio.com/meteor-coming/)
* [Meteor.js: The Perfect Match For Lean Startups](http://manuel-schoebel.com/blog/meteorjs-the-perfect-match-for-lean-startups)
* [Meteor and SEO](http://manuel-schoebel.com/blog/meteor-and-seo)
* [Meteor Podcast Episode 2](http://www.meteorpodcast.com/2014/01/17/episode-2-january-17th-2014/?utm_source=crater.io)
* [Create your own real-time forum with Meteor](http://www.creativebloq.com/javascript/create-your-own-real-time-forum-meteor-11410408)
* [Create A Blog With Meteor In 30 Seconds](http://differential.io/blog/create-a-blog-with-meteor-in-30-seconds)

## New and Noteworthy Packages on Atmosphere 

* [Intercom Integration](https://atmosphere.meteor.com/package/intercom)
* [Device Detection](https://atmosphere.meteor.com/package/device-detection)
* [Filter Collections](https://atmosphere.meteor.com/package/filter-collections)
