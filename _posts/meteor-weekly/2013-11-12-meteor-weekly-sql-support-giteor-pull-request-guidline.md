---
layout: meteor-weekly-post
title: SQL Support, Giteor, New Pull Request Guideline and More
category: meteorweekly
section: meteor-weekly
---

## SQL Support

> Although that being said, you can't expect to see this in 1.0. But some version after that. [See more](https://groups.google.com/d/msg/meteor-talk/Zy9oa4r8zdU/23-d_Ztje6wJ).

SQL Support is the one of the most requested features in the [Meteor Roadmap](https://trello.com/b/hjBDflxp/meteor-roadmap). Meteor seems to be considering to implement it [sooner than planned](https://twitter.com/meteorjs/status/399904048683290625).

## Giteor - GIt Based Meteor Deployments

[Giteor](http://giteor.com/) is a very interesting git based deployment solution for apps hosted on meteor.com. Just push a new commit, giteor will take care of the deployments.

* [Meteor Talk  Discussion](https://groups.google.com/forum/#!topic/meteor-talk/HE_0JqntogA)

## New Pull Request Guideline

[Matt](https://twitter.com/debergalis), [announced](https://groups.google.com/forum/#!topic/meteor-talk/MSVgAxkkB4k) a new Pull Request(PR) Guideline for Meteor. So this is how it works.

* Always try to build Smart Packages and push to Atmosphere
* If the PR contains a breaking change(code or docs), you should think twice
* We are focusing more on Packaging, Scaling, and Meteor UI; So others will have less priority 
* If you still looking for a PR, Start a discussion in [meteor-core](https://groups.google.com/forum/#!forum/meteor-core)

## Encrypting OAuth Tokens

There was a [request](https://groups.google.com/forum/#!topic/meteor-talk/qiM4-7ZnjqA) for encrypting OAuth Tokens and store them in the db. Due the complexity, this won't be happening sooner. But there is an [open proposal](https://meteor.hackpad.com/Proposal-for-encrypting-oauth-secrets-ilcyDRz7oQG) on hackpad.

## Other Announcements

* New Meteor UI Release - [template-engine-preview-4](https://groups.google.com/forum/#!topic/meteor-talk/gHSSlyxifec)
* [Pince - Logger for Meteor](https://groups.google.com/forum/#!topic/meteor-talk/xUqTBrHMw6k)
* [RTD - JSHint and CucumberJS Integration](https://groups.google.com/forum/#!topic/meteor-talk/la7cEylO1sU)
* [Meteor 0.6.6.3-rc-1 released](https://groups.google.com/forum/#!topic/meteor-talk/YYWkHwTvUP0)

## Minimalistic Meteor Core

Meteor is considering a minimalistic Meteor Core and move some of the core packages into Atmosphere. You can find hints for this in following discussions

* [http://goo.gl/gvfN67](http://goo.gl/gvfN67)
* [http://goo.gl/YCrBfD](http://goo.gl/YCrBfD)

## New Atmosphere Updates

* [Account Instagram](https://github.com/khamoud/meteor-accounts-instagram)
* [Account Stripe](https://atmosphere.meteor.com/package/accounts-stripe)

## Blogs and Resources
* [Meteor and Web Security: Emily Stark](http://pivotallabs.com/meteor-and-web-security/)
* [Isomorphic JavaScript: The Future of Web Apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)
* [Slides: Building an Production Ready Meteor App](http://www.slideshare.net/RitikM/building-a-production-ready-meteor-app)
* [UK Got Mapped with Meteor](http://illustreets.co.uk/explore-england/)


