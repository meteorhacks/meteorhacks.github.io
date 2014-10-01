---
layout: blog
title: "Server Side Rendering for Meteor"
category: blog
summery: "Last weekend, I was able to spend enough time on hacking meteor specially to understand the state of the Server Side Rendering (SSR). Let's see what I've done."
---

Last weekend, I was able to spend enough time on hacking meteor specially to understand the state of the Server Side Rendering (SSR).

And luckily, I could be able to run blaze with it's full power on the server after few hours of work. Let's me show you what I've come up with and how useful it can be.

## Idea

My initial idea was to replace [fast-render](https://github.com/meteorhacks/fast-render) by rendering whole initial set of templates on the server. So, my research goes towards that. And I wanted to implement this without forking meteor. So anyone can use it right-away by adding a package.

## Success

I was able to load all the client side templates on the server. That means now we can write template helpers targeting server side and render those templates on the server.

For that you can use [`SSR.render`](https://github.com/meteorhacks/meteor-ssr#api) api. Let's give it a try:

**Install the SSR package**

~~~bash
meteor add meteorhacks:ssr
~~~

**Template on the Client**

<script src="https://gist.github.com/arunoda/852f7607c246eaf83c7f.js">
</script>

**Helpers written on the server**

~~~js
// server/posts.js
Template.posts.getPosts = function(category) {
  return Posts.find({category: category}, {limit: 20});
}
~~~

**Render it on the server**

~~~js
// server/main.js

var html = SSR.render('posts', {category: 'meteor'})
~~~

> I did this, in order to get the initial HTML when the page loads for the first time. But, I couldn't be able to get it working since it involves lot of other stuffs beside server side rendering. (Like routing, subscriptions and so on)

## Challenges

What I build was a 98% working blaze in the server. That includes dynamic templates, template inclusion, mongo cursors inside helpers and few more stuff.

Most of the stuff has been already done by Meteor. But I had to change few things. Once such thing is the use of `Tracker` apis. It does not works well for our purpose. I also had to implement [dynamic templates](https://github.com/meteorhacks/meteor-ssr/blob/master/lib/dynamic.js) support for the Server Side as well.

## Server Side only Templates

Normally, Meteor builds templates while you are bundling your app. But it does not build templates reside on your server directory. Because of that, we still needs to define our templates(only `.html` files)  inside client directory, even though we only use them on the server.

So, I've made it simple by introducing another API called `SSR.compileTemplate` to compile templates on the server. In order to do that, you need to create your templates in the `/private` directory and you need to write `.html` files with just the template content.

### Demo Time

Let's say I need to create an email which contains a list of blog post titles created by a given user. This is how I'm gonna do that with [`SSR`](https://github.com/meteorhacks/meteor-ssr).

**template on the `/private` directory (assets)**

<script src="https://gist.github.com/arunoda/ee8f48c471d082e2f994.js">
</script>

**compile the template and create helpers**

~~~js
// compile the template
SSR.compileTemplate('posts', Assets.getText('posts.html'));

Template.posts.getPosts = function(owner) {
  return Posts.find({owner: owner}, {limit: 20});
}
~~~

**get the html whenever you need it**

~~~js
var html = SSR.render('posts', {owner: 'user@company.com'})
~~~

## Future
I really like to see SSR(may be not this package) natively integrated into the Meteor core in the future. But there is a ton of more stuff needed to be done before that. So, I fear SSR won't be implemented by Meteor very soon. (even if someone sends PRs)

Until that, we can use this package as a solution.

## Things we can do with SSR

So, now we can do a lot of interesting stuff with SSR and Blaze. Here are some of them.

* Easy emails with Blaze and inline CSS
* PDF Rendering
* Static Page Building
* SEO without phantomjs and spiderable (I'm working on this for Telescope)
* Iron Router integration (as an alternative to fast-render)

In the coming weeks, I'll work on few demos and show you the power of this module. In the meantime, let me know, what do you think about this. If you build something with this, don't forget to share it.

----

{% include meteor_explained_book.html %}
