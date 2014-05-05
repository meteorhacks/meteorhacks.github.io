---
layout: meteor-weekly-post
title: Meteor 0.8.1, Find-Faster, Velocity and More
category: meteorweekly
---

## Meteor 0.8.1

Meteor 0.8.1 was [released](https://www.meteor.com/blog/2014/04/30/meteor-081-important-oauth-update) with a few important security fixes especially on OAuth and XSS. So, it is wise to upgrade into 0.8.1 as soon as possible. If you are still on 0.7.2 due to blaze migration, use 0.7.2.2 instead.

> Meteor released a [patched version](https://groups.google.com/forum/#!topic/meteor-talk/vE2_Y53JSTQ) of 0.8.1 as well (0.8.1.1)

## Find-Faster - Faster & Efficient Implementation of Collection.find()

Find-Faster is the arunoda's recent hack to speed up MongoDB read operations inside Meteor. If your application has the correct throughput & [meet the criteria](http://meteorhacks.com/improving-meteors-mongodb-read-performance-and-cpu-usage-with-find-faster.html#when_you_should_use_findfaster), you can save a lot of CPU cycles and reduce the latency by simply using [`find-faster`](http://meteorhacks.com/improving-meteors-mongodb-read-performance-and-cpu-usage-with-find-faster.html)

Read More: 
[Improving Meteor’s MongoDB Read Performance and CPU Usage with Find-Faster](http://meteorhacks.com/improving-meteors-mongodb-read-performance-and-cpu-usage-with-find-faster.html)

## Introducing Velocity

Meteor's testing landscape is pretty scattered and there are couple of options out their. Every test framework has its own usecases. [Velocity](https://github.com/xolvio/velocity) is the unification of all these test frameworks.

Velocity is based on RTD but, very easy to use. It allows different testing frameworks to work together and integrating a new test framework is pretty simple. Mocha Web and RTD has been started to port into Velocity and you can try out the very early version from [here](https://github.com/xolvio/velocity).

* [Velocity Discussion Group](https://groups.google.com/forum/#!forum/velocity-core)

## Featured Discussions on Google Groups

* [Cutting down on memory load server side for non-reactive collection publications](https://groups.google.com/forum/#!topic/meteor-talk/B_Yi81vRiPA)
* [Render Templates in JS](https://groups.google.com/forum/#!topic/meteor-talk/MhOLaQ9EVqE)
* [TinyTest examples? testing pub.sub](https://groups.google.com/forum/#!topic/meteor-talk/Vfw8HrDToFY)
* [Avoiding flashing screens on page change](https://groups.google.com/forum/#!topic/meteor-talk/kzse10CuSS0)
* [How to make the data in a template rendered reactive](https://groups.google.com/forum/#!topic/meteor-talk/o88R6ckZJSI)
* [Metor on remote, disconnected mobile devices?](https://groups.google.com/forum/#!topic/meteor-talk/QNa5f79NaVo)
* [Does someone know a way to load a js library only when a template is rendered?](https://groups.google.com/forum/#!topic/meteor-talk/pxVlVOvErOM)
* [Handling errors using Meteor methods and HTTP](https://groups.google.com/forum/#!topic/meteor-talk/fQmeofXROuY)
* [Multi-Tenancy and Meteor - How do you do it?](https://groups.google.com/forum/#!topic/meteor-talk/_tf0jH_JnGY)

## Blogs and Other Resources

* [Meteor Devshop London - April](https://www.meteor.com/blog/2014/05/01/meteor-devshop-london-april)
* [PRISMA- Photoshop extension built with Meteor](http://www.codeadventure.com/)
* [A Guide to Meteor Templates & Data Contexts](https://www.discovermeteor.com/blog/a-guide-to-meteor-templates-data-contexts/)
* [Organizing files in Meteor](http://blog.thanish.me/organizing-files-in-meteor/)
* [Meteor - Famo.us Book](http://schonne.com/famo.us-meteor/)
* [Paypal Payments with Meteor](http://journal.gentlenode.com/meteor-8-create-and-execute-a-payment-with-paypal-rest-api/)
* [demeteorizer does not work well with 0.8.1](onmodulus/demeteorizer#48#issuecomment-41883917)
* [circular-progress](http://rteslaru.github.io/meteor-circular-progress/)