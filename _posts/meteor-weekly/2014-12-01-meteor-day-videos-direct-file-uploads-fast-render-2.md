---
layout: meteor-weekly-post
title: Meteor Day Videos, Direct File Upload, Fast Render 2.0 & More
category: meteorweekly
---

## Meteor Day Videos
Now we've Meteor Day videos available online. Here are they:

  * [Meteor Day - San Fransisco](https://www.youtube.com/watch?v=miMh-KMlmAM&list=PLTUf4ytkmI8SANRBwBL72iTrQjHvSQP6r)
  * [Meteor Day - London](https://www.youtube.com/watch?v=Q-hr7DuFRO4&list=PLTUf4ytkmI8Sav0rYjxXMWxH-F51T0WZX)

## Direct File Uploads

Image and File uploading is one of the key tasks in our apps. With Meteor, you have a few options to do that. But with most of those solutions, you need to first send the file to the Meteor app. Then Meteor app will upload it into the destination.(s3, google, etc).

But now, we've a very interesting project called [slingshot](https://github.com/CulturalMe/meteor-slingshot), which directly upload the file from the client to the destination securely. It support s3 and google cloud at the moment. It also have cool features like progress bars and image previewing while uploading.

Learn more about the project:

* [GItHub](https://github.com/CulturalMe/meteor-slingshot)
* [Google Groups](https://groups.google.com/forum/#!topic/meteor-talk/AOIlQ6wgdcs)
* [Crater](http://crater.io/posts/vDpswAfswGJexdThz)

## Fast Render 2.0

> [Fast Render](https://github.com/meteorhacks/fast-render) is a way to improve the initial load time of your Meteor app.

This week, we've released Fast Render 2.0. It comes with a lot of stability improvements and it has been tightly integrated into Meteor. As a result of this, now Fast Render doesn't need to patch Iron Router on the client side.

We've removed couple of unused APIs. We've also implemented a built-in [debugger](https://github.com/meteorhacks/fast-render#debugging), which helps you to test and debug how Fast Render works with your app.

* [Try Fast Render 2.0 with your app](https://github.com/meteorhacks/fast-render).

## Featured Discussions on Google Groups

* [How do you force a package version?](https://groups.google.com/forum/#!topic/meteor-talk/CDQ0p15CoGg)
* [Meteor bower/github Proof of concept](https://groups.google.com/forum/#!topic/meteor-talk/LOeKFd0SSlo)
* [Meteor hosting performance](https://groups.google.com/forum/#!topic/meteor-talk/9NdHMtZtsZw)
* [Tutorial for Meteor 1.0 + Docker or EC2 Container Service](https://groups.google.com/forum/#!topic/meteor-talk/OBpkoW_PaAw)
* [Iron Router browser compatibility summary](https://groups.google.com/forum/#!topic/meteor-talk/wwkcq5dsAXg)
* [Offline plugin for minimongo](https://groups.google.com/forum/#!topic/meteor-core/VXVv0Zn8LRc)
* [Serverside ability to set userId() after SSO passwordless authentication](https://groups.google.com/forum/#!topic/meteor-core/IQhE6lkg-5M)
* [Browser Policy and `__meteor_runtime_config__`](https://groups.google.com/forum/#!topic/meteor-core/aFYdAsX6Xjo)

## Blog Posts and Other Resources

* [Meteor Tips and Workarounds](https://medium.com/@Dominus/meteor-tips-and-workarounds-b791151ce870)
* [Meteor.js: Getting Started](https://semaphoreapp.com/blog/2014/11/19/meteorjs-getting-started.html)
* [Meteor Daily New Look](http://meteordaily.info/)
* [Telescope i18n](http://www.telesc.pe/blog/telescope-v0910-i18nscope/)
* [Famo.us FlexGrid in CoffeeScript with Meteor](http://pem-musing.blogspot.fr/2014/11/famous-flexgrid-in-coffeescript-with.html)
* [Telescope Hangout #2: Search, SEO, and SCSS](http://www.telesc.pe/blog/telescope-hangout-2-search-seo-scss/)
* [Dealing with Timezones in JavaScript](http://joshowens.me/dealing-with-timezones-in-javascript/)
* [Building Large Scalable Realtime Applications With Meteor](https://www.youtube.com/watch?v=akWn_WD2cyA&app=desktop)