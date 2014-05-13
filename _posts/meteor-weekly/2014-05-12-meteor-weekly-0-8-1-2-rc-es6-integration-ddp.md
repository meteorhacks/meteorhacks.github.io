---
layout: meteor-weekly-post
title: Meteor 0.8.1.2 RC, ECMASCRIPT 6 Integration, DDP and More
category: meteorweekly
---

## Meteor 0.8.1.2 RC

> Update: Meteor 0.8.1.2 is [out now](https://groups.google.com/forum/#!topic/meteor-talk/zbZlt4FRCC0)

Latest Meteor release 0.8.1.1 is having a session related [Memory Leak](https://groups.google.com/forum/#!topic/meteor-talk/krGbkNnfQMg). If you don't have much subscription data you might have not noticed the leak.

There is a fix already in the 0.8.1.2 RC but 0.8.1.2 is not yet released. You can update your Meteor app with **meteor --release 0.8.1.2-rc1**

## Meteor and ECMASCRIPT 6

[ECMASCRIPT 6](https://github.com/lukehoban/es6features) or ES6 is the upcoming major revision to JavaScript. It comes with a number of new [features](https://github.com/lukehoban/es6features) and syntax changes. What's more, you can use ES6 with your Meteor app very easily. Simply add 
[`harmony`](https://atmospherejs.com/package/harmony) package to your app, write es6 in files with extension `next.js` 

* [Meteor Talk Discussion](https://groups.google.com/forum/#!topic/meteor-talk/IckhkJomHFw)
* [Project on Atmosphere](https://atmospherejs.com/package/harmony)

## DDP

DDP is the protocol Meteor uses to communicate between the Meteor client and the server. It is a very simple yet efficient protocol for realtime apps. You can learn about DDP with the following MeteorHacks [article](http://meteorhacks.com/introduction-to-ddp.html).

* [Introduction to DDP](http://meteorhacks.com/introduction-to-ddp.html)

## Meteor APM

We are [launching Meteor APM](http://meteorhacks.com/june-2nd-we-are-launching-meteor-apm.html) on June 2nd. Stay Tuned!

[![Meteor APM Dashboard](http://i.imgur.com/nACulWG.png)](http://meteorhacks.com/june-2nd-we-are-launching-meteor-apm.html)


## Featured Discussions on Google Groups

* [Template build with UI.renderWithData is not reactive ?](https://groups.google.com/forum/#!topic/meteor-talk/TTx8zU54it0)
* [How can I force a dynamic template to get destroyed in Blaze?](https://groups.google.com/forum/#!topic/meteor-talk/TMf4RLfQK_w)
* [Bitpay integration or similar?](https://groups.google.com/forum/#!topic/meteor-talk/f6jVHWwiV6M)
* [Multi-Tenancy and Meteor - How do you do it?](https://groups.google.com/forum/#!topic/meteor-talk/_tf0jH_JnGY)
* [Javascript Harmony](https://groups.google.com/forum/#!topic/meteor-talk/IckhkJomHFw)
* [Cutting down on memory load server side for non-reactive collection publications?](https://groups.google.com/forum/#!topic/meteor-talk/B_Yi81vRiPA)
* [High CPU use by a minimal Meteor app](https://groups.google.com/forum/#!topic/meteor-talk/9eo3uSyabn8)
* [Multiple rendered callbacks](https://groups.google.com/forum/#!topic/meteor-talk/YjpK0fbEY9o)
* [Proposals for incremental additions to Blaze APIs](https://groups.google.com/forum/#!topic/meteor-core/jdQM5cc-7lw)
* [CPU usage of tools/main.js](https://groups.google.com/forum/#!topic/meteor-core/z4by8audkVw)

## Blogs and Other Resources

* [Using pre-made themes with Meteor](http://yauh.de/articles/385/using-pre-made-themes-with-meteor)
* [Meteor on HackerOne](https://hackerone.com/meteor)
* [Building an MVP - Crowducate.me](http://www.manuel-schoebel.com/blog/building-an-mvp---crowducateme)
* [Spacebars Secrets - Exploring Meteor Templates](https://www.discovermeteor.com/blog/spacebars-secrets-exploring-meteor-new-templating-engine/)
* [Meteor + Famo.us Book](http://schonne.com/famo.us-meteor/)
* [Meteor vs. Express vs. Rails](http://www.reddit.com/r/Meteor/comments/24sba6/meteor_vs_express_vs_rails/)
* [Login required for an url done right](http://www.manuel-schoebel.com/blog/login-required-for-an-url-done-right)
* [Meteor Internalization(i18n)](http://journal.gentlenode.com/meteor-9-internationalization-i18n/)
* [Telescope - Meteor 0.8 Update & Next Steps](http://telesc.pe/blog/meteor-0-8-update-next-steps/)