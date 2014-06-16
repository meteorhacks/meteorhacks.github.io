---
layout: meteor-weekly-post
title: These Days at MDG, Subscriptions Manager, Meteor 0.8.2 RC and More
category: meteorweekly
---

## These Days at MDG
Last Week's [Meteor Podcast](http://www.meteorpodcast.com/e/episode-22-june-13-2014/) is a special edition featuring Meteor's Ekate and Avital. They were talking about what they are doing these days at Meteor and what are things which will be coming soon. Here are the some of thing they have talked.

* Meteor Packaging System
* [Refactoring Blaze](https://meteor.hackpad.com/Blaze-Proposals-for-v0.2-hsd54WPJmDV)
* [Meteor Control File](https://meteor.hackpad.com/New-control-file-brainstorming-ZDBMiEQ6DZl) for structuring your Meteor app

Listen to the [podcast](http://www.meteorpodcast.com/e/episode-22-june-13-2014/). It's short but sweet.

## Subscription Manager

Last week arunoda has released a production ready version of the [Subscriptions Manager](http://meteorhacks.com/subscriptions-manager-is-here.html). Earlier it was tightly coupled with iron router, but now it's a standalone package and it can be used it with any Meteor app.

With Subscription Manager, you could save a lot of server resources while improving the user experience at the same time. Click [here](http://meteorhacks.com/subscriptions-manager-is-here.html) to learn more about Subscription Manager.

* [A Success Story](https://groups.google.com/d/msg/meteor-talk/IonQkUbqijI/ThPKqLygi0sJ)

## Meteor 0.8.2 RC

Meteor is working on the next release 0.8.2. Now you can try out a [release candidate](https://groups.google.com/forum/#!topic/meteor-talk/HICaFOzRPKk)(RC) with your app. One of the important change comes with this release it the underline authentication system.

Meteor has been used SRP based authentication system for a long time. Now with this release Meteor is using popular [bcrypt algorithm](https://meteor.hackpad.com/SRP-bcrypt-J5mdBojeVfe) instead of SRP. Beside that, there are several changes to blaze and some of the bug fixes will come with [this release](https://github.com/meteor/meteor/blob/release-0.8.2/History.md).

## Featured Discussions on Google Groups

* [Meteor DDOS Protection](https://groups.google.com/forum/#!topic/meteor-talk/XyYhi8ZMgd8)
* [How do I remove webapp functionality and http server?](https://groups.google.com/forum/#!topic/meteor-talk/81XthjW2ur8)
* [performance questions](https://groups.google.com/forum/#!topic/meteor-talk/IonQkUbqijI)
* [CSS Injection](https://groups.google.com/d/msg/meteor-talk/0XqKOouKzmE/Pun8Q3Z3TpIJ)
* [Is Meteor really a secured platform?](https://groups.google.com/forum/#!topic/meteor-talk/mllofLbHDyU)
* [API Security - Best practices](https://groups.google.com/forum/#!topic/meteor-talk/hL4iDzoreBo)
* [Reactive PostgreSQL to MongoDB transformation](https://groups.google.com/forum/#!topic/meteor-talk/_eemT_X1nbk)
* [TokuMX with Meteor](https://groups.google.com/forum/#!topic/meteor-talk/9Ysxz05dp1A)
* [Better Python DDP Client](https://groups.google.com/forum/#!topic/meteor-talk/BZteO3mY6us)
* [http://audit.meteor.com](https://groups.google.com/forum/#!topic/meteor-talk/rxMrat-vG3c)
* [Disable oplog tailing from blocking until returning the first result](https://groups.google.com/forum/#!topic/meteor-core/pE6SO-OEx34)

## Blogs and Other Resources

* [Meteor Capture by David Burles](https://meteor-capture.hackpad.com/collection/ziVbX1vntPd)
* [Tracking Meteor CPU Usage with Kadira](https://kadira.io/blog/tracking-cpu-usage-with-kadira/)
* [Timbre demo from Famo.us University using Meteor.js and CoffeeScript](http://pem-musing.blogspot.fr/2014/06/timbre-demo-from-famous-university.html)
* [JavaScript And Future Development Landscape](http://axelerant.com/blog/javascript-and-future-development-landscape)
* [METEOR #12 THE COMPLETE GUIDE TO SEO](http://journal.gentlenode.com/meteor-12-seo-guide/)
* [Some bubbles with Famo.us's physic engine in CoffeeScript and Meteor.js](http://pem-musing.blogspot.fr/2014/06/some-bubles-with-famouss-physic-engine.html)
