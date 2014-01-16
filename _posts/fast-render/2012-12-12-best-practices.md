---
layout: docs
title: Best Practices
section: fast-render
permalink: /fast-render/best-practices
---

## Send The Mininum Amout Of Data

The concept behind FastRender is very simple -- Just send the data which needs to render the initial page.

So the user can see the page, without need to load anything. In the background other subscriptions may load some other data.

Keep in mind that you are sending bunch of data with the initial HTML, if you send too much of data, your page(initial HTML) will load slowly. That's not good.

If you are using IronRouter and if you need much control over the data you are sending, try [this option](/iron-router-support/#option_3_using_fastrender_with_much_control).

## Handle Common Subscriptions In a Single Place

You app may be using few subscriptions is all or most of the pages. If so, there is a better way you can add the with FastRender. 

Let's say you are fetching some custom set of fields from the user object. You are doing it with `currentUser` subscription. You are subscribing it in every page. This is how you can do the same with FastRender.

    FastRender.onAllRoutes(function(urlPath) {
      //you can also use "urlPath" parameter to customize a bit as well 
      this.subscribe('currentUser');
    })

---

> This list is still evolving, you can help on improving it. If you've a good hint, it has a place in here. Add [an issue](https://github.com/arunoda/meteor-fast-render/issues) with it.