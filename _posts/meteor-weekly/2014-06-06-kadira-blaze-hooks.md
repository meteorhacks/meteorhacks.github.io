---
layout: meteor-weekly-post
title: Kadira, Blaze Hooks and More
category: meteorweekly
---

> Note:
>
> I was too busy on the last weekend so I was not able to publish Meteor Weekly on monday. So, this episode covers both last week and this week. There won't be a Meteor Weekly on next monday(June 9th). But Meteor Weekly will be continued as usual after that.

## Kadira

Kadira, our Performance Monitoring Solution for Meteor was released to the public this week. Now you can try out Kadira at <https://kadira.io>. It helps you to find out performance issues on your app and help you to fix them.

## Accessing Dom Changes with Blaze Hooks

Although, blaze comes with a lot improvements, for some apps it was causing issues. For an example, there was no way to detect DOM changes after the template has been rendered. Last month, Meteor has started a Hackpad [discussion](https://meteor.hackpad.com/Blaze-Proposals-for-v0.2-hsd54WPJmDV) which lists those kind of issues and finding solutions to fix them.

Now, Meteor dev branch has a [feature](http://goo.gl/bMHwq7), which allow us to detect DOM changes inside the `_rendered` callback and act accordingly. This will help us to do better animations and customizations with the DOM changes.

* Demo: [Transition Animations with Blaze Hooks](http://goo.gl/Hre8ev)

## Featured Discussions on Google Groups

* [Meteor and Famo.us CDNs](https://groups.google.com/forum/#!topic/meteor-talk/DIwkRASNrCM)
* [Using google content experiments with Meteor](https://groups.google.com/forum/#!topic/meteor-talk/59kMvw7pfWU)
* [Announcing Meteor Webstorm Library](https://groups.google.com/forum/#!topic/meteor-talk/ShJ4LYlXuK4)
* [iron router transitions](https://groups.google.com/forum/#!topic/meteor-talk/PYq8vWIz3UU)
* [PCI Compliance with Meteor](https://groups.google.com/forum/#!topic/meteor-talk/mkcBA_-yoj8)
* [Twitter bot to post about Atmosphere packages](https://groups.google.com/forum/#!topic/meteor-talk/2Qo71D3iKio)
* [how to properly use zurb foundation html structure](https://groups.google.com/forum/#!topic/meteor-talk/hPSTvrHa-o8)
* [ObserverChanges Overhead](https://groups.google.com/forum/#!topic/meteor-core/s3qoBF1w99k)

## Blogs and Other Resources

* [The (not so) real problems of meteor.js](http://differential.io/blog/the-not-so-real-problems-of-meteorjs)
* [Getting Started with Databases in Meteor](http://meteortips.com/mongodb-database-tutorial/)
* [Meteor and Famo.us on mobile](https://www.meteor.com/blog/2014/06/03/meteor-famous-mobile)
* [EventedMind Livedata Class](https://www.eventedmind.com/classes/livedata/introducing-the-livedata-class)
* [Going Further With Meteor - Links & Resources](https://www.discovermeteor.com/blog/going-further-with-meteor-links-resources/)
* [MeteorHacks: June -- a big month for us](http://meteorhacks.com/june-a-big-month-for-us.html)
* [Design for Realtime](http://blog.percolatestudio.com/design/design-for-realtime/?utm_content=buffere92ae&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
