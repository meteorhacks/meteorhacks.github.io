---
layout: blog
title: "Meteor Subscription Optimization"
category: blog
summery: "This annotated presentation shows you how to optimize subscriptions while keeping your both users and servers happy at the same time."
---
This annotated presentation shows you how to optimize subscriptions while keeping your both users and servers happy at the same time.

Subscriptions management is a common issue with Meteor and sometimes introduces weird issues. That's why we need to take care of optimizing subscriptions. This guide will give you some tips on where you can optimize your subscriptions effectively.

![Subscriptions on the Server](https://i.cloudup.com/EQpEAZ7oaB.jpg)

First we need to understand how subscriptions are handled on the server, which will help us to make good decisions. 

![Grouped by Query](https://i.cloudup.com/agZPzf3NxG.jpg)

In the above publication, a static query has been used. It doesn't change with the arguments from the subscription, so it creates only one **LiveResultSet**. Even if you had 20 subscriptions, there would be only one **LiveResultSet**. This is an advantage because, when a polling takes place, there will be less overhead.

![Grouped by Query](https://i.cloudup.com/yxd8LQDty0.jpg)

In contrast to the previous publication, this one creates a LiveResultSet for every subscription. So when the polling takes place, it will be much costlier, since we will have many LiveResults.

Practically, it is not possible to avoid these kinds of scenarios all the time. That's why oplog integration plays such a huge role: it doesn't do polling and makes subscriptions lightweight in the server

![Data is Cached for Each Session](https://i.cloudup.com/U79xqDmKKw.jpg)

The Meteor server keeps a copy of data (documents) available on each client. It allows Meteor to make better decisions when sending changes to the client. But it also increases the RAM usage, if your data set is large.

![Deps.autorun and Subscriptions](https://i.cloudup.com/xhfoFcwNMT.jpg)

Next, we need to understand how subscriptions behave in the client, especially inside a `Deps.autorun` computation.

![After an Invalidation](https://i.cloudup.com/T0xFW7pQx9.jpg)

In the first invalidation round, slug is **meteorhacks**. It adds two subscriptions to singlePost and postList.

In the next invalidation, slug is **oplog**. The computation removes the old subscription to **singlePost**, with **meteorhacks** as the argument. After that it adds a subscription to singlePost, with oplog as the argument. It does not change the existing subscription to **postList**.

This feature is one of the core concepts underlying Iron Router's subscription model.

![Relation with Iron Router](https://i.cloudup.com/Wm1Lgz7nnc.jpg)

Iron Router runs on a Single Computation. So when it switches between routes, all the subscriptions made from the previous route are removed, **unless they are used in the current route**.

![Three Simple Optimization Rules](https://i.cloudup.com/nHszCg13zG.jpg)

Here are three simple subscription optimization rules that will help you build better applications while keeping both users and servers happy.

![Send data only the page/client requires](https://i.cloudup.com/iJGTtxKRRc.jpg)

We should send only the data that a page or user requires. The page will load faster, and less overhead (in terms of memory usage) will be added to the server.

![Don't unsubscribe busy subscriptions](https://i.cloudup.com/4KUbHwKgUC.jpg)

Some subscriptions are meant to be used in multiple pages/routes of your app, so it is wise to keep them open. Otherwise there will be some bandwidth issues and users will have to wait while data gets loaded from the server again.

![Break the rules as needed](https://i.cloudup.com/FVacZRQdod.jpg)

These are not hard and fast rules: break them whenever necessary.

## Case Studies (Atmosphere & Telescope)

This is a case study where I review Atmosphere and Telescope in terms of subscription usage.

<iframe width="640" height="480" src="//www.youtube.com/embed/nkWtsLjLtmc?rel=0" frameborder="0" allowfullscreen="1">
</iframe>

## Sneak Peak: Subscription Manager

Subscription Manager is a simple package that allows you to avoid some of the subscription-related issues described in the case study above.

<iframe width="640" height="480" src="//www.youtube.com/embed/xzPg0-_TcXU?rel=0" frameborder="0" allowfullscreen="1">
</iframe>

I hope these suggestions will be helpful as you build better quality Meteor applications.

