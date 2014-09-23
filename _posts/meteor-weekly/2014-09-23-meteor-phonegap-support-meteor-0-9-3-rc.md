---
layout: meteor-weekly-post
title: Meteor Phonegap Support, Meteor 0.9.3 RC and More
category: meteorweekly
---

## Meteor PhoneGap Support

Last week Meteor [released](https://www.meteor.com/blog/2014/09/15/meteor-092-iOS-Android-mobile-apps-phonegap-cordova) version 0.9.2 with phonegap/cordova support. That means, now you can build HTML5 mobile apps directly with Meteor targeting both **iOS and android**. This is not just a simple integration but Meteor comes with a super hot _**mobile hot code reload**_ support. Cordova support is also deeply integrated into Meteor and now you can use and build packages targeting cordova as well.

Mobile hot code reload is the one of most discussed features since, it helps developers to **bypass** appStore verification to push new updates. But that also comes with a fear since Apple may withdraw these apps from the appStore.

But luckily, now [apple allows](https://twitter.com/TimHaines/status/512619320170389505) developers to update cordova app code without going through the appStore verification.

Make sure to refer the [wiki](https://github.com/meteor/meteor/wiki/Meteor-Cordova-Phonegap-integration) and watch this [demo](https://www.youtube.com/watch?v=4dJLPLWMImw).

## Meteor 0.9.3 RC

Now we have another Meteor RC to try out. 

> Meteor is pushing a new release every week, so it's very hard to keep up with the recent pace of Meteor's development :)

This is an update to the core packaging system; specially to it's versioning system known as the **constraint-solver**. With this update, developers can publish packages targeting multiple meteor releases and dependency declaration syntax is much flexible than before.

Check this [meteor-talk post](https://groups.google.com/forum/#!topic/meteor-talk/q2b4UlAp-7Y) for more information. Don't forget to try this RC with your app and [send](https://groups.google.com/forum/#!topic/meteor-talk/q2b4UlAp-7Y) feedback.

## Featured Discussions on Google Groups

* [A way to call a global function when a template is rendered ?](https://groups.google.com/forum/#!topic/meteor-talk/VdGysnSiWGs)
* [does new packaging model signal the EoL for meteor on windows?](https://groups.google.com/forum/#!topic/meteor-talk/Ys5dyrQpDxY)
* [Commercial packages - how would you do it?](https://groups.google.com/forum/#!topic/meteor-talk/ytkDlOJxBLo)
* [limits of DDP / debugging in production](https://groups.google.com/forum/#!topic/meteor-talk/fPVto9_i5Z0)
* [Correct way to use cordova plugins](https://groups.google.com/forum/#!topic/meteor-talk/rjpkR41vUnU)
* [Unblock Subscriptions -this.unblock inside publications](https://groups.google.com/forum/#!topic/meteor-talk/PrFlTYimRrA)
* [Mongodb 2.6](https://groups.google.com/forum/#!topic/meteor-talk/QSBfD8D5dps)
* [What's the best way to use Sass in a Meteor app?](https://groups.google.com/forum/#!topic/meteor-talk/FD1PmAAFDaQ)
* [Introducing Meteoris - Meteor Boilerplate with a good structure](https://groups.google.com/forum/#!topic/meteor-talk/2WEA85xy0MM)
* [Introducing Humon - A hybrid wiki/collaboration platform](https://groups.google.com/forum/#!topic/meteor-talk/0VUELnJpiQE)

## Blogs and Other Resources

* [_**How we use Kadira at Edthena**_](https://dweldon.silvrback.com/kadira)
* [Publishing anything](http://meteorcapture.com/publishing-anything/)
* [How to Scale a Meteor App](http://joshowens.me/how-to-scale-a-meteor-js-app/)
* [Telescope v0.9.4 UpdateScope](http://www.telesc.pe/blog/telescope-v094-updatescope/)
* [Publishing data from an external API](http://meteorcapture.com/publishing-data-from-an-external-api/)
* [Tokenized Access and Invited Use in Meteor](http://differential.io/blog/tokenized-access-and-invited-use-in-meteor)
* [Managing Wait Time](https://kadira.io/academy/managing-waittime/)
* [Crater Roundtable](Collaborating on new packages: http://crater.io/posts/exDL2ZisCji22sg3N)
* [Video Meteor Tuts](http://meteortips.com/screencasts/)
* [Prototype to Production App In A Few Weeks](http://tech.co/meteorjs-production-app-2014-09)
* [Building better apps with Meteor](http://www.slideshare.net/stephanhochhaus/introduction-to-meteor-v2)
* [Deploy MeteorJS apps with Devo.ps](http://goo.gl/86d3Pg)

## Featured Posts from Kadira Hub   

* [Adding proper SEO support for Telescope](https://hub.kadira.io/posts/B6rZNCfv9gDyzE76a)
* [Is there a wait time breakdown for Kadira?](https://hub.kadira.io/posts/e4hbouWbZbgNxhcMd)
* [Sample Meteor App Structures](https://hub.kadira.io/posts/hZBzfqvJ8ADQaKc7o)
* [Is there a clean way to separate marketing pages from the actual app?](https://hub.kadira.io/posts/kbcX2pgp2qALdNDYu)
* [Meteor Desktop Native](https://hub.kadira.io/posts/fKEBD7RwvdRgzLbeH)
