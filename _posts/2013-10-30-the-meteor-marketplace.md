---
layout: blog
title: "The Meteor Marketplace"
category: blog
summery: "Meteor Marketplace is marketplace for Meteor Components. You can buy components you need or you can sell your own."
---

Let's have a look at [Meteor](http://www.meteor.com/) Marketplace. It's a marketplace like Apple App Store, but for Meteor components. You can purchase components for your Meteor app with a seamless experience. You can even sell your own. Let's see how this works

> Meteor Component is a pre built functionality for your meteor app. Meteor account system and the login window is a good example of it.
>
> With upcoming Meteor 1.0, creating Meteor Components will be [super simple](http://www.youtube.com/watch?v=pGQ-ax5cFnk).

## Your Company Intranet

Let's say, you are supposed to create an **Intranet Portal** for your company. It needs to have 
  
1. A forum
2. A chat room
3. An admin user panel


You have few options, either you can choose some existing product/service or you could build something on your own. With the first option, you are limited to the features of the product/service you are going to use. What you use can be hard to customize or such an endeavor can be too costly. 

If you choose to develop a solution yourself, it might take a considerable amount of time. That's not good either.

But if you choose Meteor to build your app, there is another way to get things done. With Meteor marketplace, you have the flexibility to build your portal, as you like while reusing components built by others.
 
### Company Intranet with Meteor

First, lets create a Meteor App

    meteor create intranet-portal

Now you need to select some components for your app, like forum and chat room. 

So you visit <https://marketplace.meteor.com> and select whatever components you need. Meteor Marketplace is a place for both **free** and **paid** components.

Since you need to implement the intranet quickly, you might prefer using paid versions assuming they are well tested and in production quality.

So let's add your selected components to your app.

    meteor add smart-chat smart-forum smart-admin

This will ask you to provide Credit Card Information, since this is the first time.

Now you have 3 components. Let's integrate these components into the Intranet. For an example, see how you can add the forum.

<script src="https://gist.github.com/arunoda/35ae201d307614a3791c.js">
</script>

It's that simple! You can do the same for other two components as well.

Now you've a unique customized intranet for your company under 30 minutes.

### This is just a concept

There is already a package repository for Meteor. Meet [Atmosphere](https://atmosphere.meteor.com). Every major language/framework, has its own package/addon repository. **But none of these is a marketplace**. Meteor brings the concept of the marketplace into a package repository and with it brings pure awesomeness.

### How is this possible with Meteor?

Directly monetizing the [NPM Registry](https://npmjs.org/) or Python [PyPi](https://pypi.python.org/pypi) will not work as expected. That's because most of the packages/modules are libraries and they just bring some valuable functionality to the framework/language.

But Meteor's use case is different. We can build components with both UI and the Backend. This provides a great value to the developer who uses meteor.

The Meteor Marketplace is also different from the [WordPress Plugin Directory](http://wordpress.org/plugins/). You can use Meteor Components wherever you want and you don't need to follow any rules. It’s just a simple [handlebar](http://handlebarsjs.com/) helper. And the installation is pretty simple too. Just select a component and add it with a command. Then, it's in your project.

## Hope we could see this in future

Although this is just a concept, everything we need to make this a reality is available right in front of us. All we need is to execute and glue them properly. Hope Meteor would consider this and make this into a reality pretty soon. May be with 1.5.

So what do you think about this? [Take this survey!](https://docs.google.com/forms/d/1mEGOmdNEaUEVLj0SrU-7EPjd0R609lhgg-ZMYNSyzqc/viewform)<br>
I promise, it won't take 2 minutes.

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.
