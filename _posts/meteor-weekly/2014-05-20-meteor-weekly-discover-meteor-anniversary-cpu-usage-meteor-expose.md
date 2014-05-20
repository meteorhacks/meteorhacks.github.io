---
layout: meteor-weekly-post
title: DiscoverMeteor First Anniversary, High CPU Usage, Meteor Expose and More
category: meteorweekly
---

## DiscoverMeteor First Anniversary 

DiscoverMeteor has [announced](https://www.discovermeteor.com/blog/discover-meteor-one-year-anniversary-sale/) a special discounted sale for their first anniversary. You also will be able to win some exciting prizes including an awesome T-Shirt.

Don't miss the opportunity - [Buy DiscoverMeteor or Upgrade](https://www.discovermeteor.com/)

## High CPU Usage

If your Meteor app is pretty large, you might be having [High CPU issues](https://groups.google.com/forum/#!topic/meteor-core/z4by8audkVw) when you are developing your app. That's due to issues with the file-watcher which detects the changes of your files.

[David Glasser](https://twitter.com/glasser) did some [initial work](https://groups.google.com/forum/#!msg/meteor-core/z4by8audkVw/7ULi6dEllL4J) with the atom's [file-watcher](https://github.com/atom/node-pathwatcher) recently. Now we can think, this issue will get solved near future.

## Meteor Expose

Meteor is a great frameworks and works for most of us. Sometimes meteor does things, actually we don't like to have in our app.

In order to change them, you need to alter some of the Meteor internals specially in livedata and mongo-livedata package. That's pretty hard since those APIs are private and not generally available.

But now, you can alter most of the livedata and mongo-livedata internals with [expose](https://github.com/arunoda/meteor-expose) smart package. It expose some of the crucial internal Meteor APIs. With those APIs you can jump start your core Meteor hack.

## Featured Discussions on Google Groups

* [Cutting down on memory load server side for non-reactive collection publications](https://groups.google.com/forum/#!topic/meteor-talk/B_Yi81vRiPA)
* [Using jquery plugins and cleaning up after template is destroyed](https://groups.google.com/forum/#!topic/meteor-talk/XJCzctKR-_Q)
* [Do oauth tokens get refreshed on expire?](https://groups.google.com/forum/#!topic/meteor-talk/8P2ohBCENV0)
* [How can I disable DDP requests and enable them only when user reaches a specific page?](https://groups.google.com/forum/#!topic/meteor-talk/LjE9PeJVOBQ)
* [What is the difference of #with and #if in this use case](https://groups.google.com/forum/#!topic/meteor-talk/_5zz_ILGcvo)
* [Access Meteor App from Cordova using InAppBrowser](https://groups.google.com/forum/#!topic/meteor-talk/mmYRi7yzZPM)
* [Pure javascript library or meteor package?](https://groups.google.com/forum/#!topic/meteor-talk/g5G-dI4pWkc)
* [spacejam released, a console test runner for meteor packages](https://groups.google.com/forum/#!topic/meteor-talk/NvW5b8k8rxQ)
* [What's involved to use TokuMX as a MongoDB replacement backend for Meteor?](https://groups.google.com/forum/#!topic/meteor-talk/9Ysxz05dp1A)
* [Meteor-Editable - X-Editable inspired inline editor for Meteor](https://groups.google.com/forum/#!topic/meteor-talk/N_bBpOyeKEI)
* [Alternative to `window.opener` in 0.8.1](https://groups.google.com/forum/#!topic/meteor-core/Ma3XTZk4Kqg)
* [Allow meteor create on the current directory](https://groups.google.com/forum/#!topic/meteor-core/1wlD_X3FoPc)

## Blogs and Other Resources

* [WebStrom9 support for Meteor planned](http://blog.jetbrains.com/webstorm/2014/05/webstorm-9-development-roadmap-discussion/)
* [dok.io - Your team's digital memory](http://dok.io/)
* [Paperless and Tree Hugging in 21 Days with Meteor](http://www.stephentcannon.com/2014/05/paperless-and-tree-hugging-in-21-days.html)
* [Why don't I see meteor.js everywhere?](http://www.reddit.com/r/javascript/comments/24hxfv/why_dont_i_see_meteorjs_everywhere/)
