---
layout: blog
title: "Subscription Manager for Iron Router"
category: blog
summery: "Iron Router is doing a great job at handling subscriptions inside it. But it has some issues; that's why Subscription Manager comes to fix it."
--- 

Iron Router has made a significant change to the way we handle subscriptions with its waitOn functionality. Most of the time now we handle subscriptions directly from Iron Router. 

But this comes at a cost. When we switch between routes, we lose the previous route's subscriptions. This means that the meteor has to load the subscriptions again when switching back to that route. This is not problem of Iron Router itself; it is simply how subscriptions behave inside a `Deps.autorun` computation. You can learn more about this in my [Subscription Optimization](http://meteorhacks.com/meteor-subscription-optimizations.html) presentation. 

##  Here comes the solution

Last month at the first Meteor Hacks Show, I demonstrated how [Subscription Manager](http://www.youtube.com/watch?v=xzPg0-_TcXU) is able to handle this issue correctly. Since then I have experimented with several ways of integrating Subscription Manager into Iron Router (of course, with suggestions from Chris and Tom). Now we have the first preview of it. 

See the following demo:

<iframe width="640" height="480" src="//www.youtube.com/embed/hLnb4uxJmqk" frameborder="0" allowfullscreen="1">
</iframe>

Here is the app shown in the demo: <http://ir-sub-manager.meteor.com>

##  How to add Subscription Manager to your app?

First of all let's get familiar with some of the concepts used in Subscription Manager.

### It's based on routes

Subscriptions are typically handled under routes, so it makes sense that the best place to add rules is directly into the routes. This way all the subscriptions underneath the routes will inherit those rules. This is a very important point, as it means that we don’t need to think about subscriptions, only routes. 

###Caching 

Subscription Manager allows subscriptions inside a route to be cached. You can specify how many instances of a route you want to be cached.

For example, a typical blog will have a route like this: `/post/:_id`. With Subscription Manager you can ask to cache 5 recent blog posts. 

If you find the term caching confusing, note that it relates here not to caching the documents inside a subscription, but to caching the subscriptions between routes.

###Expiration 

Because we are now able to cache subscriptions, we may also cache subscriptions that are not used often. We need to find a way to remove these or get rid of them. 

We do this with expirations: you can explicitly ask Subscription Manager to expire subscriptions for a particular route after n number of minutes. 

##  Putting all this together 

Now that you have a sound understanding of the terms and concepts used in Subscription Manager, it's time to try an example. This is how we define routes for a simple blog with Subscription Manager enabled.

~~~js
Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function() {
      return Meteor.subscribe('postList');
    },
    cache: true 
  });

  this.route('postPage', {
    path: '/post/:_id',
    template: 'postPage',
    waitOn: function() {
      return Meteor.subscribe('post', this.params._id);
    },
    cache: 5, //cache 5 blog posts
    expire: 3 //expire them if inactive for 3 minutes
  });
});
~~~

You can learn more about the [API here](https://github.com/EventedMind/iron-router/tree/sub-manager).

## Why is Subscription Manager built into Iron Router?

Initially, I started Subscription Manager as an independent project. Chris invited me to integrate it into Iron Router and I liked it, since most of the apps are built with Iron Router and it is the ideal place for Subscription Manager. 

I’m sure there will be some use cases where Subscription Manager will be useful outside Iron Router too. Let's discuss what we could do for that.

## Give it a try and bug me

This project is available on Iron Router's [`sub-manager`](https://github.com/EventedMind/iron-router/tree/sub-manager) branch. You can use this with your app by [tweeking the `smart.json`](https://github.com/EventedMind/iron-router/tree/sub-manager#installation) a bit. Give it a try and let me know your suggestions. Most importantly, file [issues](https://github.com/EventedMind/iron-router/issues) and send me patches :)

> Due to the alpha nature of this project, API and semantics can be changed rapidly. So, if you join with [this email list](http://mad.ly/signups/102205/join), I can send you an email with every change that might break your app.