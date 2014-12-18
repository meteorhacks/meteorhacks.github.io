---
layout: blog
title: "Meteor Server-Side Rendering for SEO Purposes"
category: blog
summery: "This is the follow-up blog post for the talk I did on the MeteorHacks Show 2. Here I describe how to get rid of PhantomJS for SEO Purposes."
---

> This is the follow-up blog post for the talk I did on the MeteorHacks Show 2.
> You can watch the talk through [this link](https://www.youtube.com/watch?v=rcQaNl3qaXc).

Before starting anything, we need to understand why server-side rendering is important for apps like Meteor. There are two main reasons:

1. To improve initial loading performance
2. For SEO purposes

[Fast Render](https://github.com/meteorhacks/fast-render) tackles the initial loading problem, and it works great. However, we can improve it even further with server-side rendering. 

We can also use server-side rendering for SEO purposes and allow search engines to see the content in our apps. This is the purpose of this blog post.

## Meteor and SEO – Current State

We know that Meteor does not send HTML over the wire. Search engines usually only read HTML and never execute JavaScript. Thus, it's nearly impossible for search engines to see what's available inside the Meteor app. 

To fix this issue, Meteor uses a protocol called [AJAX crawling](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started) to allow search engines to see the content inside the Meteor app. This is how it works:

[![Meteor's AJAX Crawling](https://cldup.com/4cHYcVvd23.jpg)](https://cldup.com/4cHYcVvd23.jpg)

In the above graph, you can see the usage of PhantomJS. [PhantomJS](http://phantomjs.org/) is a headless Web browser that Meteor uses to render the page and get HTML content. This solution works well.

## But PhantomJS is hard

Even though this solution works well, the practical use of PhantomJS is very hard. Here are some of the problems that we face:

* Meteor spawns a new PhantomJS instance for every search engine request. If a search engine crawls many pages, your CPU and memory usage will suddenly spike. This might kill your app.
* PhantomJS runs an older version of JavaScript, so your app might not work.
* PhantomJS is not available on cloud-hosting services like modulus.io. 
* Sometimes you'll see errors on the server log and PhantomJS won't render HTML output. It's extremely hard to debug the issue.

Everyone in the Meteor community is looking for a solution. 

## Server-side rendering is also hard

The ultimate version of server-side rendering is something like this. 

* You simply add a package
* Then it will do all the hard work for you
* When a new request comes it will send the HTML along with the initial request

But it requires a lot of changes to a few core packages. Because of that, you won't see an official server-side rendering solution soon.

That being said, we still need a solution.

## Replacing PhantomJS with Blaze

We're going to replace PhantomJS and use Blaze to get HTML content in the aforementioned AJAX crawling flow. To do that, we need to create a separate set of HTML templates for the server side.  

That's because it’s a little hard to use current client-side templates on the server. But I'm not saying it's impossible. 

In this blog post, we're going to use two versions of the templates. The first set is for the client, and the other is for the server. Let’s assume we’ve all client side templates and we’ve a working meteor app like below:

![Demo App for Meteor SSR](https://cldup.com/-fdsU-rvd9.png)

Link: <http://seo-without-spiderable.meteor.com/>

We are also going to use the following packages in this process. 

* [meteorhacks:ssr](https://github.com/meteorhacks/meteor-ssr) – for compiling and rendering templates on the server
* [meteorhacks:picker](https://github.com/meteorhacks/picker) – for server-side routing

If you need to learn more about these, watch this: [video](http://youtu.be/rcQaNl3qaXc?t=8m56s).

## Creating Templates

In the **private** directory of your app, define all the templates for the server side. In our case, we have three templates:

### home.html
This is the template to render the home page content (post list).

<script src="https://gist.github.com/arunoda/6e8fbe6678e16f78a9cd.js"></script>

### singlepost.html
This is the template to render a single page.

<script src="https://gist.github.com/arunoda/0af625220d2325ece75c.js"></script>

### layout.html
This is the layout of the app.

<script src="https://gist.github.com/arunoda/1e9cf96f8c4b448a8805.js"></script>

We are using a dynamic template to render our home and single post templates in this layout.

We also have a CSS file inside the private directory named `style.css`.

## Compiling Templates

We can compile these templates by adding the following file to the **ssr/server** directory.

~~~js
SSR.compileTemplate('layout', Assets.getText('layout.html'));
// Blaze does not allow to render templates with DOCTYPE in it.
// This is a trick to made it possible
Template.layout.helpers({
  getDocType: function() {
    return "<!DOCTYPE html>";
  }
});

SSR.compileTemplate('home', Assets.getText('home.html'));
SSR.compileTemplate('singlepost', Assets.getText('singlepost.html'));
~~~

We are getting the content of the templates that reside in the private directory via the [`Assets.getText`](http://docs.meteor.com/#/full/assets_getText) API.

## Define Routes

Now that we have templates on the server, it's time to define routes. For that, we will use the meteorhacks:picker package. It has a route syntax that is very similar to that of expressjs and iron-router. But it’s a simple router made only works in the server. (It also has a very nice feature called filtering.)

This route file also goes into the **ssr/server** directory.

~~~js
var css = Assets.getText('style.css');

// filtering only HTTP request sent by seo via AJAX-Crawling
// this is meteorhacks:pickers coolest feature
var seoPicker = Picker.filter(function(req, res) {
  return /_escaped_fragment_/.test(req.url);
});

// route for the home page
seoPicker.route('/', function(params, req, res) {
  var posts = Posts.find();
  var html = SSR.render('layout', {
    css: css,
    template: "home",
    data: {posts: posts}
  });

  res.end(html);
});

// route for the single post
seoPicker.route('/post/:_id', function(params, req, res) {
  var post = Posts.findOne(params._id);
  var html = SSR.render('layout', {
    css: css,
    template: "singlepost",
    data: {post: post}
  });

  res.end(html);
});
~~~

## One Last Step

Now everything is ready. However, our app is not yet AJAX-crawling enabled. To enable crawling, we need to put following file into the ssr/client directory. It will contain the meta tag required in the AJAX crawling flow.

<script src="https://gist.github.com/arunoda/088ac7002f4e4c25f2e0.js"></script>

That’s all you have to to. 

You can get the complete source code from this [GitHub Repo](https://github.com/arunoda/meteor-seo-without-spiderable).

This is not as easy as adding a package like spiderable, but with this solution, you can get rid of PhantomJS, and that'll eliminate a ton of issues. Ultimately, this solution will save you time and resources.

Try to implement this in your app, and share your experience. I'm looking forward to hearing about them.