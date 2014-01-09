---
layout: blog
title: "Introducing Fast Render"
category: blog
summery: "Any meteor app needs to wait until connecting to the server, before rendering something relevant to the user. Fast Render cleverly solves that issue."
---

Meteor is supercool when it comes to productivity and building real-time web apps very quickly. But one of the common issues with Meteor is page load time: you have to wait until a WebSocket connection is made and data comes from the server. This is a crucial issue for many apps, especially forums, blogs and public facing web apps.

Server Side Rendering (SSR) is the solution for this issue.  It will render the initial page on the server. It also works well with Search Engines, and does not require PhantomJS  (which is how Meteor currently supports search engines). Unfortunately, SSR is not a priority in Meteor's roadmap, as Meteor's co-founder Geoff confirmed on the Devshop 8. 

## Meet Fast Render

[Fast Render](http://meteorhacks.com/fast-render) is not an SSR, but it is very similar technique and performs the same functionality very efficiently. 

What Fast Render does is pretty simple. It sends the data required to render your first page with the initial HTML loaded from Meteor, so the page is rendered just after the JavaScript is loaded to the client. No more waiting! 

> However, Fast Render does not help much with Search Engines and does not change how Meteor deals with Search Engines.  

## Demo

Let's try a demo to see what Fast Render can do. I have added Fast Render support to Telescope so you can see the difference below. 

* [Standard Telescope App](http://oridinary-telescope.meteor.com/)
* [Telescope with Fast Render](http://fast-render-telescope.meteor.com/)

For more information on the comparison, see the [video](http://youtu.be/mGcE6UVOqPk) below. 

## Simple Integration

Fast Render does all the hard work for you. All you have to do is tell them what data and subscriptions need to send to the client with the HTML. You can do that with a simple API. See the example below:

First add Fast Render to your Meteor app
    mrt add fast-render

[Fast Render](http://meteorhacks.com/fast-render) has been deeply integrated with Iron Router. With just few steps, you can power your existing Meteor App with Fast Render. Here's all you have to do: 

1. If you are extending from `RouteController`, extend it from `FastRender.RouteController`
2. If you are directly using routes, use `fastRender:true` as shown here. 
3. Then bring your route definitions to a place that can be seen by both the client and the server. 
4. Make sure, `waitOn()` does not contains any client specific code. If you have such, guard them with `Meteor.isClient`

Fast Render supports more IronRouter [integration methods](), as well as the ability to integrate without IronRouter. Please refer to the [documentation](http://meteorhacks.com/fast-render) for more information.

## Try it Out

Don't take my word for it. Try it out with your app: I bet you'll love it. I'd also love to hear your thoughts about Fast Render. And this is the first project comes with the new MeteorHakcs.

