---
layout: meteor-weekly-post
title: Meteor 0.6.6.2, 10000+ GitHub Stars, Dynamic Templates and More
category: meteorweekly
section: meteor-weekly
---

## Meteor 0.6.6.2 with NodeJS Security Fix

As promised, Meteor [released](https://groups.google.com/forum/#!topic/meteor-talk/oCTLEUF0Gss) its version 0.6.6.2 with the NodeJS security fix introduced with node version 0.10.21. If you are using your Meteor app in production, you must update it to this version. If you are still using Meteor 0.6.5.x, you could update to 0.6.5.2.

## Meteor Exceeds 10000 Stars in GitHub

Meteor github repo exceeded [10000](https://github.com/meteor/meteor/stargazers) stars last week reason enough for some good celebration.

[See Discussion on Meteor Talk ](https://groups.google.com/forum/#!topic/meteor-talk/04qN9vc9V4o)

## Introducing view-manager for Dynamic Templates

Routers provide a good way to change content in your Meteor app. But now there is [another approach](http://frozeman.de/blog/2013/10/meteor-view-manager/). You can change templates in your app dynamically via session variables. This is very easy to use and you can customize UI components very easily with [view-manager](https://atmosphere.meteor.com/package/view-manager).

## Easy file uploading with DropzoneJS

[DropzoneJS](http://www.dropzonejs.com/) is a very nice way to drag n’ drop and upload files. Now you can use it very easily with Meteor using this [smart package](https://atmosphere.meteor.com/package/Dropzonejs).

## Iron Router 0.6.0 released

Last week Iron Router 0.6.0 [released](https://groups.google.com/forum/#!topic/meteor-talk/uOVJznn9_Uo) with some really good improvements. There are some [breaking changes](https://github.com/EventedMind/iron-router/blob/dev/History.md#v060) too, beware of that.

## Animated Intros for your Meteor App

You might have seen that GMail, YouTube and other popular web apps introduced new features with in-app slideshows. Now you can implement those with your Meteor apps, thanks to the [meteor-tutorials](https://github.com/mizzao/meteor-tutorials) smart package.

## Request for a Server Side Global Error Hook

There is a global hook for [unhandled errors](http://nodejs.org/api/process.html#process_event_uncaughtexception) in NodeJs. [Tim Haines](https://twitter.com/TimHaines), raised that we need to have something like that for Meteor methods. This is something great for better error handling and logging.

[Original Request](https://groups.google.com/forum/#!topic/meteor-core/aCOJYXrxdqg)

## Access Server Time from Meteor client

Server Time and the Client Side is not always the same. Sometimes you may need to use a server time in you app logic(client-side). So this [Pull Request](https://github.com/meteor/meteor/pull/1527) gets you there. Still there is more to go, but this is a good start.

## Videos and Talks

* [David Glasser: Meteor Past, Present & Future](https://www.youtube.com/watch?v=r996yhHNs5k)
* [EventedMind: Env Configurations and Settings.json](https://www.eventedmind.com/feed/sg3ejYnmhxpBNoWan)
* [NitrousIO 0 to Meteor in 60 secs](http://www.youtube.com/watch?v=Y6WANmBe1Tk&feature=youtu.be)
* [Meteor Apps in AppStore](http://www.youtube.com/watch?v=eeY1mZhvDy4)

## Blogs and Other Resources

* [Emily Stark: Web Security at Meteor](http://www.slideshare.net/emilystark/web-security-at-meteor-pivotal-labs)
* [Serving static files from a smart package](https://groups.google.com/forum/#!topic/meteor-talk/zV318rqyPNk)
* [One Time Box OpenSourced](https://github.com/oliversong/onetimebox)
* [Multiple Meteor apps in the same domain](http://timita.org/wordpress/2013/10/21/multiple-meteor-js-apps-on-the-same-domain-under-virtual-directories/)
* [Reactive Web Development with Meteor](http://blog.tagged.com/2013/10/reactive-web-applications-and-meteor-js/)





