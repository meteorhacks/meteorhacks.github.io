---
layout: docs
title: Iron Router Support
section: fast-render
permalink: /fast-render/iron-router-support
---

FastRender has been deeply intergrated into IronRouter and with some few changes you can add FastRender support very easily. There are several ways to integrate depending on how you are using IronRouter.

## Option 1: If you are using waitOn

If you are using waitOn functionality, you can add FastRender support very easily. Follow the steps shown below:

* Make your route definition files accessible to both the server and the client
* If you are extending `RouteController`, add a new field called `fastRender` with `true` as the value

See how it's looks like:

    PostsListController = RouteController.extend({
      fastRender: true,
      template: 'myTmpl',
      ...
    })

* If you are directly using `this.route`, add `fastRender: true` option.

See how it's looks like:

    this.route('post_edit', {
      path: '/posts/:_id/edit',
      waitOn: function () {
        return Meteor.subscribe('singlePost', this.params._id);
      },
      fastRender: true
    });

* Make sure your `waitOn` function doesn't have any client specific code or guard them with `Meteor.isClient`.

## Option 2: If you are not using waitOn

If you are using `wait` functionality on a `before` handler or you are not comfortable with exposing route definitions into server side, use this option.

Create FastRender routes identical to the IronRouter routes and subscribe accordingly with `this.subscribe` as shown below:

    FastRender.route('/blog/:slug', function(params) {
      this.subscribe('blogPost', params.slug);
      this.subscribe('blogAuthor', params.slug);
    })

If your `blogAuthor` subscription accepts the `_id` of the author instead of the `slug`. You can use something like following:

    FastRender.route('/blog/:slug', function(params) {
      this.subscribe('blogPost', params.slug);

      //assuming, PostCollection is the Meteor Collection for your blog posts
      var authorId = PostCollection.findOne({slug: params.slug}).authorId;
      this.subscribe('blogAuthor', authorId);
    })

## Option 3: Using FastRender with much Control

Let's say your IronRouter route `/blog/:slug` is waiting on `blog` and `authors` subscriptions. This case you are loading all the blogs and authors in to the page. If you've few number of blogs and authors this is not bad. But it is not good to load all these data with FastRender, because it might slow down the initial HTML loading.

In this case, you can only load data for the current blog post and trick IronRouter with saying subscription is completed even before it completed. You can try something like below: (in the service side)

    FastRender.route('/blog/:slug', function(params) {
      //assuming, PostCollection is the Meteor Collection for your blog posts
      this.find(PostCollection, {slug: params.slug});
      //now we are forcling Meteor client to say it has successfully loaded the blog subscription
      this.completeSubscriptions(['blog']);

      //there are only few authors, loading all of them is not a bad idea
      this.subscribe('authors');
    })

> [`this.completeSubscriptions()`](/fast-render/api/#thiscompletesubscriptionssubscriptionlist) can also be used without IronRouter. It might help if you've implemented some custom loading indicator.