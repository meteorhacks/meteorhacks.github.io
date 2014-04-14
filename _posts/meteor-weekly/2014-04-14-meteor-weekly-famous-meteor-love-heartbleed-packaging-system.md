---
layout: meteor-weekly-post
title: Meteor - Famo.us Love, HeartBleed Bug, Packaging System & More
category: meteorweekly
---

## Meteor - Famo.us Love
[Famo.us](https://famo.us/) is one of the most loved frontend JavaScript framework due to their [insane demos](http://codepen.io/befamous). Famo.us was not available for the public until last week, when they [opensourced](https://github.com/Famous/famous) the project. Meteor developers started to play with famo.us and researching on ways to integrate it with Meteor. See following resources to explore famo.us with Meteor.

* [Meteor + Famo.us Devshop talk](https://www.youtube.com/watch?v=bmd-cXSGQAA&feature=youtu.be&utm_content=bufferd9c22&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
* [Famo.us, Meteor Blaze, and Iron Router](https://groups.google.com/forum/#!topic/meteor-talk/WyaqcEwVnHw)
* [Famono -  Famo.us + RequireJS for meteor](https://groups.google.com/forum/#!topic/meteor-talk/WwlvwIEvLM0)

## HeartBleed Bug

Meteor does not come with any SSL support by default. So Meteor itself is not vulnerable to the popular [HeartBleed](http://heartbleed.com/) bug. However, since you'll be using some other service or tool to enable SSL for your Meteor app, you might have vulnerable to the bug. So, [test your app](https://filippo.io/Heartbleed/) against the HeartBleed bug and take necessary actions. Read the official Meteor [blog](https://www.meteor.com/blog/2014/04/09/heartbleed).

## How Meteor Packaging System Works

In the last Devshop, we've [seen](https://www.youtube.com/watch?v=nOdLlvmJgRk) the Meteor's upcoming packaging system. But you might have some problems and need more clarifications about it. Follow this [meteor-talk thread](https://groups.google.com/forum/#!topic/meteor-core/MNzKXHlCGE0) to learn more about the upcoming packaging system.

## Featured Discussions on Google Groups

* [Prevent multiple logins using the same credentials](https://groups.google.com/forum/#!topic/meteor-talk/z5kdJiawltI)
* [Meteor with the Espruino Microcontroller](https://groups.google.com/forum/#!topic/meteor-talk/SYCjJk5cpPo)
* [Best way to handle server-side aggregates](https://groups.google.com/forum/#!topic/meteor-talk/RH_WEIp2uDs)
* [Blaze: Rendering a Dynamic Template by Name](https://groups.google.com/forum/#!topic/meteor-talk/Ygiwv87Kp1Y)
* [designing an email notification system](https://groups.google.com/forum/#!topic/meteor-talk/ro7vQvngHYo)
* [Session variables and collection helpers](https://groups.google.com/forum/#!topic/meteor-talk/nzkrV0y7wx4)
* [find values by objectid](https://groups.google.com/forum/#!topic/meteor-talk/bshEhEbxF50)
* [Scala or other custom compiler?](https://groups.google.com/forum/#!topic/meteor-talk/wMfVtTgxRl8)
* [Solving "Unexpected mongo exit code 100" on upgrade to 0.8.0 without running "meteor reset"](https://groups.google.com/forum/#!topic/meteor-talk/sJ0YNKQYdA4)
* [How to Add a css class on collection change and remove it after few seconds](https://groups.google.com/forum/#!topic/meteor-talk/iQ37mTP3hLg)
* [Ensure that document was saved](https://groups.google.com/forum/#!topic/meteor-core/hHKI2gFwYeE)
* [Observer Join performance](https://groups.google.com/forum/#!topic/meteor-core/ZGRcquaH_44)
* [Meteor.setTimeout required on server?](https://groups.google.com/forum/#!topic/meteor-core/vKfNG7JWjgU)
* [Meteor and MongoDB 2.6](https://groups.google.com/forum/#!topic/meteor-talk/Z8g_Rf4AZ8M)

## Blogs and Other Resources

* [Cross Site Scripting(XSS) and Meteor](http://meteorhacks.com/xss-and-meteor.html)
* [Vacancies @ Meteor](https://www.meteor.com/jobs)
* [A JavaScript Primer For Meteor](https://www.discovermeteor.com/blog/javascript-for-meteor/)
* [Meteor London Devshop: Photos](https://www.flickr.com/photos/cwaring/sets/72157643793714985/)
* [Best Resources To Become a Meteor Master](http://journal.gentlenode.com/meteor-4-best-meteor-ressources/)
* [The Meteor universe - a list of Meteor resources](http://www.okgrow.com/posts/2014/03/24/meteor-resources/)
* [Impersonating a Meteor user](https://dweldon.silvrback.com/impersonating-a-user)
* [Rendering a Handlebars Template with Dynamically Loaded Data](http://empire5.com/development/meteor-rendering-a-handlebars-template-with-dynamically-loaded-data/)