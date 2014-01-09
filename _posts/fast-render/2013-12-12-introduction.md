---
layout: docs
title: FastRender - Introduction
section: fast-render
permalink: /fast-render/
---

_**FastRender**_ is a small package that will make a **huge impact** on your Meteor App. It improves the initial load time of your app and gives you 2-10 times faster page loads. It gives identical result as Server Side Rendering(SSR), but still sending data over the wire without breaking one of the Meteor's core principles.

## Demo

I've added FastRender [support](https://github.com/arunoda/fast-render-telescope/blob/master/server/fastRender.js) to [Telescope](http://telesc.pe/) and you can see how fast Telescope with FastRender. Both apps are hosted on meteor.com.

* [Normal Telescope](http://oridinary-telescope.meteor.com/)
* [FastRender Powered Telescope](http://fast-render-telescope.meteor.com/)

Watch the following screencast for more details on the comparison.

<iframe width="640" height="360" src="//www.youtube.com/embed/mGcE6UVOqPk?rel=0" frameborder="0" allowfullscreen="1">
</iframe>

## How FastRender Works

FastRender simply sends the data which will be used to render the initial page with the HTML itself. So there is no loading process. Just after the HTML gets loaded, page will be rendered on the screen. No need to wait until connecting to the server and receiving data.

Although page gets rendered, your actual subscriptions will be send to the server and it will send realtime updates as usual. You can also change this behavior with [`this.forgetSubscriptions`](/fast-render/api/#thisforgetsubscriptionssubscriptionlist).