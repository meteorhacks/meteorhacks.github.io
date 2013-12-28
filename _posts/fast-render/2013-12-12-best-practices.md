---
layout: docs
title: Best Practices
section: fast-render
permalink: /fast-render/best-practices
---

The concept behind FastRender is very simple -- Just send the data which needs to render the initial page.

So the user can see the page, without need to load anything. In the background other subscriptions may load some other data.

Keep in mind that you are sending bunch of data with the initial HTML, if you send too much of data, your page(initial HTML) will load slowly. That's not good.