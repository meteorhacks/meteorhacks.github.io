---
layout: meteor-weekly-post
title: Meteor UI, NodeJS Security Fix, Packaged Apps and More
category: meteorweekly
summery: '<p>Meteor Cluster is a <a href="https://atmosphere.meteor.com/package/cluster">Smart Package</a> for meteor which allows you to run cluster of meteor nodes and scale horizontally, which is <a href="http://stackoverflow.com/a/13716069/457224">not possible</a> with the default meteor setup.</p>'
---

## Meteor UI - Preview Release
Meteor UI is the upcoming rendering engine for Meteor which supposed to be released with Meteor 1.0 on early next year. Now you can try out the preview version of Meteor UI. It is not production ready yet, but you can get your hands dirty with it.

* [Getting Started Guide](https://github.com/meteor/meteor/wiki/New-Template-Engine-Preview)
* [Discussion on Meteor Talk](https://groups.google.com/forum/#!topic/meteor-talk/gHSSlyxifec)

## NodeJS Security Fix
NodeJS released a major security fix last week. It was a fix to prevent DOS attacks when you are serving HTTP with NodeJS. So this affects most of the NodeJS apps including Meteor. Meteor’s plan to release a new version (0.6.6.2) by this week. 

>
> It does not allow an attacker to do anything unauthorized or read any privileged data, it only allows a malicious person to force your server to allocate lots of memory.
> <br> *- Nick Martin, Meteor Core Team*
>

* [Original Announcement](https://groups.google.com/forum/#!topic/nodejs/NEbweYB0ei0)
* [Discussion on Meteor Core](https://groups.google.com/forum/#!topic/meteor-core/moQ4SxH3iJo)

## Meteor and Packaged Apps
Meteor is not only limited to the web. You can build mobile apps and browser extensions with meteor. There is a very impressive discussion on how to work with packaged apps with meteor. You can find a tool called packmeteor in the discussion, which allows you to automatically bundle your meteor app for chrome (as chrome packaged app) and for coredova.

* [Packmeteor Demo](http://www.youtube.com/watch?v=7UFIqetFC-k)
* [Packmeteor on Github](https://github.com/raix/packmeteor)
* [Discussion in Meteor Talk](https://groups.google.com/forum/#!topic/meteor-talk/vv6Rq8iGM0M)

## Settings.json Usage
Settings.json is the meteor’s way of exposing settings and configurations to both client and server environments. This is still an experiment API and we can see a better configuration handling API near future, probably with 1.0

There is a very nice discussion on how people are using settings.json with their apps. See how you can use settings.json with your app.

* [Jump in to the Discussion](https://groups.google.com/forum/#!topic/meteor-talk/K79-i3LYL3g)

## Iron Router Progress Bar
There is a very nice progress bar implementation for Iron Router which mimics nprogress. Of course you can directly use nprogress with meteor, but this is a deep integrated version to iron router, which the best router for your meteor app.

* [Demo](https://iron-router-progress.meteor.com/)
* [Project on Atmosphere](https://atmosphere.meteor.com/package/iron-router-progress)

## See Also

* [Meteor DevShop 8 Lightning Talks](http://www.meteor.com/blog/2013/10/15/meteor-devshop-8-lightning-talks-nitrousio-autoparts-vonvo-and-the-new-meteor-rendering-engine)
* [Azimuth CMS based on Meteor](http://azimuthc.ms/)
* [Meteor at HackMIT](http://www.meteor.com/blog/2013/10/11/meteor-at-hackmit-onetimebox-codebox-pulse)