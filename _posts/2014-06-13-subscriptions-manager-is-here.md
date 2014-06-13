---
layout: blog
title: "Subscriptions Manager is Here!"
category: blog
summery: "Long awaited Subscriptions Manager is here. Now you can use it with any Meteor app."
---

A few months ago, I started to work on a project called Subscriptions Manager. In February, I [released](http://meteorhacks.com/subscription-manager-for-iron-router.html) an alpha version, which was built into Iron Router. Today, I'm happy to release [Subscriptions Manager](https://github.com/meteorhacks/subs-manager), and now you can use it in any Meteor applications, even if you don't use Iron Router (i.e., for games)

## Why Subscriptions Manager?

I've talked about this [several times](http://meteorhacks.com/meteor-subscription-optimizations.html), but let me say it again:) When you are creating subscriptions using a `Deps.autorun` computation, when it is re-running, all the previous subscriptions will be unsubscribed. Refer to the following example:

~~~js
Deps.autorun(function() {
  var postId = Session.get('postId');
  if(postId) {
    Meteor.subscribe('post', postId);
  }
});
~~~

* If you set postId as "post1," then there will be a subscription for “post1".
* Then, if you set postId as “post2", then meteor will unsubscribe from "post1" and subscribe to “post2".

This is a feature of `Meteor.subscribe`, and you can learn more about in my previous [article](http://meteorhacks.com/meteor-subscription-optimizations.html).

### Relating to Iron Router

In Iron Router, all the routes run inside a Deps.autorun computation. Then, when you are switching routes, all the subscriptions made in the previous route will be unsubscribed. This causes two problems:

1. The user has to wait while changing routes
2. There is an increase in [SubRate](http://support.kadira.io/knowledgebase/articles/347439-subrate) of your application, a possible reason for high CPU and network usage

See what happens when you change routes, normally without Iron Router.

<iframe width="640" height="480" src="https://www.youtube.com/embed/YZJMuJdI76E" frameborder="0" allowfullscreen="1">
</iframe>

## Welcome to Subscriptions Manager

Subscription caching is the solution to the above issue. With subscription caching, you keep previously initialized subscriptions inside a Deps.autorun computation. Therefore, when you are changing routes, previous subscriptions won't be unsubscribed.

[Subscriptions Manager](https://github.com/meteorhacks/subs-manager) is a general-purpose subscription caching solution with tools to manage the caching behavior. Subscriptions Manager runs its own computation, and you have full control of it. For example, this is how you can use Subscription Manage with Iron Router:

First, install the subs-manager package from Atmosphere with `mrt add subs-manager`.
Then, change your routes as follows:

~~~js
var subs = new SubsManager({
  // will be cached only 20 recently used subscriptions
  cacheLimit: 20,
  // any subscription will be expired after 5 minutes of inactivity
  expireIn: 5
});

Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function() {
      return subs.subscribe('postList');
    }
  });

  this.route('singlePost', {
    path: '/post/:id',
    waitOn: function() {
      return subs.subscribe('singlePost', this.params.id);
    }
  });
})
~~~

This is what it looks like after enabling Subscriptions Manager.

<iframe width="640" height="480" src="https://www.youtube.com/embed/y8t3Hiy-EUE" frameborder="0" allowfullscreen="1">
</iframe>

Subscriptions Manager can be used for any Meteor application even if they are not using Iron Router. Please check the [documentation](https://github.com/meteorhacks/subs-manager) for more information.

## Do I need to add Subscriptions Manager everywhere?

No, you don't. You can use Subscriptions Manager whenever you need it. This is how to check whether you need Subscriptions Manager or not:

* First, connect the app with [Kadira](https://kadira.io).
* Then, play around with your app a bit.
* Visit the "PubSub Detailed View" section.
* Sort your publications by “Short Lifespan".

Then, add Subscriptions Manager support for all the publications with a "Low Lifespan" and a "High SubRate" See the following image:

![Subscriptions Without Subscriptions Manager](https://i.cloudup.com/9VOU29DPwP.png)

Once you've added Subscriptions Manager, play around with your app a bit again. Check it with Kadira and verify.

![Subscriptions Without Subscriptions Manager](https://i.cloudup.com/Qh223Wk5ud.png)

## I'm sending 1000's of documents to a client. Do I need to add Subscriptions Manager?

Of course, you must add Subscriptions Manager. Without Subscriptions Manager, you are sending a great deal of data to the client, so it wastes your bandwidth and CPU usage. Server’s memory usage is not as bad as it seems. Check my article on Kadira Academy on [memory usage](https://kadira.io/academy/optimize-memory-usage/). I'll write more about this in the next week.

Play with Subscriptions Manager and let me know how it works with your app. If you find any issues, please submit an [issue](https://github.com/meteorhacks/subs-manager/issues). I’ll be happy to help you out.
