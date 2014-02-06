---
layout: blog
title: "Building Static Websites with Meteor"
category: blog
summery: "Meteor is well known for building Realtime Webapp easily. It can do the same for Static Webapp too. Let's have a look!"
---

First, let's have a look at [meteor.com](http://meteor.com) and how it works.

We all know that [meteor.com](http://meteor.com) is made with Meteor itself. You might also notice that it loads very fast. Well actually there’s no loading process; just after the HTML is loaded, the page is rendered on the screen. 

But how is this possible? Normally it takes a bit of time to connect to the server, get the data and render the information on the screen. Does Meteor do some magic with Galaxy, which serves meteor.com?

Hmm. Nope. It's nothing like that. They are cheating a bit and meteor.com is not getting any data from the server via DDP. Let me show you what they have done. 

![Templates of meteor.com](https://i.cloudup.com/hKgCKSpYXE.png)

The image shows a set of templates meteor.com consists of. For each page, there is a corresponding template that provides the html output. So there is no need to get the data from the server, it’s all there. Although this doesn’t scale with thousands of pages, this is a neat trick and that’s how they handle the heavy load into meteor.com. 

There are no subscription requests or method calls sent to the server. So, this scales pretty well even with a massive load. If they add a caching proxy in front of meteor.com, technically the server behind meteor.com won't get any load at all.

## How Meteor do this?

I'm not sure whether this is the exact way how Meteor implemented meteor.com. But I'll show you how to do it very easily without any hacks.

* First install `showdown` package with `meteor add showdown`
* Then install `iron-router` which helps us to do basic routing

This is how we create a blogPost using a template.

<script src="https://gist.github.com/arunoda/c1d743650b53f5f6ac4e.js">
</script>

Now you've a template named `does_meteor_scale` which will be used to generate the HTML with `Template.does_meteor_scale()`;


Now let's add a simple route as shown below.

~~~js
Router.map(function() {
  this.route('blog', {
    path: '/blog/:slug',
    template: 'blog'
  });
});
~~~

It's time to create our blog template.

<script src="https://gist.github.com/arunoda/e5413c73795c1b91eebc.js">
  
</script>

It's clear that we are going to render the blog post into `content`. Let's see how exactly we are going to do it.

~~~js
if (Meteor.isClient) {
  Template.blog.content = function() {
    var slug = Router.current().params.slug;
    var templateFunc = Template[slug];
    if(typeof templateFunc == 'function') {
      return templateFunc();
    } else {
      return "404";
    }
  };
}
~~~

Make sure to start you Meteor app with the following environment variable. Then your server does not get any DDP requests at all.

    export DDP_DEFAULT_CONNECTION_URL=http://non-existing-url.com

With this technique, you can have a very simple blog using just Meteor templates. I just created one. 

Have a look at it: <http://static-blog.meteor.com>

<iframe width="640" height="480" src="//www.youtube.com/embed/jg404Z2Iqco" frameborder="0" allowfullscreen="1">
  
</iframe>

If you like to dig into the code, it's available on [GitHub](https://github.com/arunoda/meteor-static-blog).

This is neither the best way to build a blog nor the easiest. But I just want to show that this is also something doable with Meteor. If we are lucky, someone will come up with a very easy way to do this by bundling some of the things that I've shown into a package. 

The final take away for the day from meteor.com is this. Scaling is as much an art as it is science. You need to know when and where to use the right tactic to get the most elegant and effective solution. 
