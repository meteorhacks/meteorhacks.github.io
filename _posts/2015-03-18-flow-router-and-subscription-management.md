---
layout: blog
title: "Flow Router and Subscription Management"
category: blog
summery: "Let's me introduce Flow Router and some patterns to manage subscriptions."
---

Meteor [released](https://www.meteor.com/blog/2015/03/17/meteor-104-mongo-cordova-template-subscriptions) template-level subscriptions with Meteor 1.0.4, and everyone is looking for some patterns for using it.

At the same time, we have been using [Flow Router](https://github.com/meteorhacks/flow-router/) for months with our Meteor apps([BulletProof Meteor](https://bulletproofmeteor.com/) and [Kadira](http://kadira.io/) UI). We think that now is the time to launch it for everyone. 

So, what does Flow Router have to do with subscriptions? I'll talk about that. Let me first introduce Flow Router.

## Why Did We Create a Router?

It's a long story, which starts with our attempt to build React's flux architecture on top of Meteor. Anyway, we [gave up](https://forums.meteor.com/t/meteorflux-flow/920/9?u=arunoda) on that. 

Then we began to think about some issues we were having at the time and started to find solutions for them. And Flow Router was a part of that. 

**Let me tell you some of the issues we had:**

* There were a lot of re-renders in the UI and we had no control over them.
* Iron Router waitOn gives little control over page loading patterns. 
* Everything is based around the router and tightly coupled to it (especially rendering).
* Our UI code is everywhere and it lacks maintainability (we solved this with flow components, but we are not ready to launch this yet).

That’s why we started to work on something new built from the scratch. That’s Flow Router.

## Introducing Flow Router

It's a minimalistic router that uses page.js behind the scenes. Here are some of the characteristics of Flow Router.

* It does routing and has a reactive API.
* It registers subscriptions but does not wait for them.
* It does not re-run a route based on reactive changes.

Have you noticed? It doesn't do rendering at all. We decoupled rendering from the router so it can be used with any kind of rendering framework. So, Flow Router can work with Blaze, React, Famous or any other rendering framework.

For an example, you can use [Flow Layout](https://github.com/meteorhacks/flow-layout) for rendering Blaze templates or use [React Meteor](https://github.com/reactjs/react-meteor/) for rendering React components.

**Before talking more about Flow Router, let me show you how to use it.**

First add Flow Router to your project:

~~~js
meteor add meteorhacks:flow-router
~~~

Then, here's how you can define a route:

~~~js
FlowRouter.route('/blog/:postId', {
    subscriptions: function(params) {
        console.log("subscribe and register this subscription as 'myPost'");
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));
    },
    action: function(params) {
        console.log("Yeah! We are on the post:", params.postId);
        // You can use Flow Layout to render templates here
    }
});
~~~

We also have a carefully designed [API](https://github.com/meteorhacks/flow-router#api), which prevents unwanted re-renders in our app. Make sure you go through the following links to get familiar with Flow Router:

* [Flow Router Docs](https://github.com/meteorhacks/flow-router)
* [Flow Layout](https://github.com/meteorhacks/flow-layout) for Rendering Blaze Templates
* [Using Flow Router with React](https://github.com/meteorhacks/flow-router/issues/29)

## How is it different from Iron Router?

As a community we've built a lot of apps with Iron Router and those apps are tightly coupled with it. Iron Router tries to do everything from routing, subscriptions and to rendering. I'm not going to say whether that’s a good or bad thing. 

In contrast, Flow Router only tries to do a few things and APIs are designed with UI performance in mind. With Flow Router, you can predict what's going to happen next.

We made some major decisions when designing it. Here they are:

* You can't use reactive content inside the router.
* When a user visits a route, the route's action and subscriptions methods are invoked. But they are never re-run for any reason unless the user changes the route.
* `FlowRouter.current()` is not reactive. We introduced a new set of APIs as substitutes. [See why](https://github.com/meteorhacks/flow-router#routercurrent-is-evil).
* Flow Router registers only subscriptions (I'll talk about this in a moment).
* There is no concept like waitOn.
* It doesn't do server-side routing.

There is a [section](https://github.com/meteorhacks/flow-router#difference-with-iron-router) in our docs that explains why we made those decisions. [Have a look at it](https://github.com/meteorhacks/flow-router#difference-with-iron-router).


## Subscription Management

Now we’ve Meteor version 1.0.4 with template-level subscriptions. Flow Router supports [subscription registration](https://github.com/meteorhacks/flow-router#subscription-management). So now it's a perfect time to think about subscription management in Meteor again.

For me, there is only one rule we need to follow:

**Templates(or the UI layer) should be able to check the state of a subscription and do actions based on it.**

Even though subscription’s state will be used in templates, we can define subscriptions in either inside routes or inside templates. We can use both depending on the use case. Let’s have a look at them.

### Route-level Subscriptions

Let’s try to think how users are going to use a typical web app.
(We've two users called Sam and John.)

* Sam visits a page.
* Sam browses the app for a few minutes.
* Now Sam wants to share the current page with his friend John.
* Sam copies the URL and sends it to John in an email. 
* Once John clicks on the page, he gets the same page as Sam was looking at.

So, in this case what's in the page is aligned with the route. Since the page is rendered with data, the subscriptions are also aligned with the route. 

**This is a case where you should define subscriptions at the route level.**

By doing so, you can clearly see what subscriptions you've used by looking at a single page. But, you should let templates render the data as they want. Flow Router is built for this. Let’s have a look at it:

This is how we can register subscriptions for a blog page:

~~~js
FlowRouter.route('/blog/:pageId', {
  subscriptions: function(params) {
    this.register('blogCategories', Meteor.subscribe('categories'));
    this.register('currentPost', Meteor.subscribe('post', params.pageId));
    this.register('currentComments', Meteor.subscribe('comments', params.pageId));
  },

  action: function() {
    // We render the template with Flow Layout
    FlowLayout.render('page');
  }
});
~~~

Here's our template (which acts as a layout):

![Our page template](https://cldup.com/9Er9is4L90.png)
(Click here for [HTML version](https://gist.github.com/arunoda/26c77af787a50be2b73d) of the template)

Here's the `isReady` template helper:

~~~js
Template.page.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
});
~~~

This is how it looks like:

![](https://cldup.com/esLzM8cjEL.gif)
(You can checkout the full source code from [here](https://github.com/flow-examples/subscriptions-management).)

As you can see, now the template has more control over managing the subscription state.

* A blog post will wait for a subscription registered with `currentPost` and it will display the "Loading..." text.
* Categories are rendered after all subscriptions have been loaded, but they won't show the "Loading" text.
* Comments do not wait for any subscriptions; they simply render the data as they arrive.

> Flow Router supports [Fast Render](https://github.com/meteorhacks/fast-render) by default. Simply add Fast Render to your app and you'll get the initial data for subscriptions you've registered. That's another reason we should define subscriptions in the router.

### Template-level Subscriptions

Now let's look at cases where the route will not change after a user action. Here are some examples:

* Chat solutions
* Infinite scrolling (like in Facebook)
* Charts and Gauges (like in Kadira)
* Data-arranging apps (like Trello)

For these cases, template-level subscriptions can be used to define subscriptions and manage them.

This is how you can use template-level subscription for a chat solution:

~~~js
Template.chatWidget.onCreated(function () {
  var self = this;
  self.subscribe("recentChatMessages");
});
~~~

You can render the `chatApp` template like this:

![ChatApp template](https://cldup.com/QaOwGlbKCa.png)
(Click here for [HTML version](https://gist.github.com/arunoda/c841223830f2498ef98c) of the template)

> If you follow this approach, Fast Render can't detect subscriptions since they are inside templates.

So, I hope I've explained how we should try to get the benefit of both Flow Router and template-level subscriptions for managing subscriptions.

Try both Flow Router and template-evel subscriptions and let me know your experience.