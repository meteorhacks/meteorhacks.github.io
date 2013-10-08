---
layout: blog
title: Retiring SmartCollections
category: blog
summery: "As Meteor 1.0 was announced, Meteor revealed that they are releasing an oplog based Mongo driver with 1.0. So I decided to retire SmartCollections when 1.0 get released."
---

As Meteor 1.0 was [announced](http://goo.gl/zVnSt7), Meteor revealed that they are releasing an oplog based Mongo driver with 1.0. You can see the developments on the [oplog branch](https://github.com/meteor/meteor/tree/oplog). 

This is really great and this is something I’ve wanted to see. With the upcoming Meteor 1.0 release, there is no reason for [SmartCollections](http://meteorhacks.com/introducing-smart-collections.html) to exist.

## Retiring
After 1.0 arrives, I will retire SmartCollections. I assume Meteor core collection implementation will provide SmartCollections level of performance with all new 1.0 features. 

I will maintain SmartCollections until Meteor 1.0 is released and my top priority would be to fix bugs. But there won't be any more feature implementations. (Like ObjectID support)

## Migrations

Since SmartCollections is almost compatible with `Meteor.Collection` you don't require any code change except for collection name revert back to `Meteor.Collection`. However, the way how you expose `OPLOG_URL` to the app might get changed.

## What’s Next

This is not the end of the road. There are more places where we can improve Meteor a lot. 

So after Meteor 1.0 release, I will start optimizing DDP to support nested objects and arrays, which are not yet supported and there are no plans for supporting those. 

This DDP upgrade is really important. See how it works now. 

If you have an array inside a document, and if you did some change to the array, the whole array is sent back to the client. This is the same with nested objects. So fixing the issue will allow us to build very efficient Meteor applications with mongoDB.

## Thank You

I suppose SmartCollections energized Meteor core team to implement oplog support for 1.0. Earlier they had plans to add a Mongo proxy layer to support scaling. But all of us together showed that oplog enabled solution is a much better and a simple solution. 

Thank you all for supporting and using SmartCollections. Hope I could release SmartCollections2 early next year.

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.
