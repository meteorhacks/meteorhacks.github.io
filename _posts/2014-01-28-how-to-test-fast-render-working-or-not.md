---
layout: blog
title: "How to Test whether Fast Render is Working or Not"
category: blog
summery: "Once you've added Fast Render support, you might not be sure whether Fast Render is correctly applied or not. This article shows you, how to find it out."
---

Once you've added Fast Render support, you might not be sure whether Fast Render is correctly applied or not. Normally it is very hard to detect it locally, since there is not much latency for connecting to the DDP server.

Here is a simple way to check whether you are using Fast Render or not.

![Non Existing DDP Endpoint](https://i.cloudup.com/DaBMkEnXdy.jpg)

Start your app by exporting `DDP_DEFAULT_CONNECTION_URL` with something that does not exist. When you ask the Meteor client to connect to a DDP endpoint that does not exist, it will keep asking for the connection and never get any data from the DDP. It totally depends on FastRender to render the page.

If you've followed the above instructions for your app (and not added Fast Render yet), it should look like this:

![Without Fast Render](https://i.cloudup.com/N8jVxk09tR.jpg)

Once you've added Fast Render support it should look something like this: 

![With Fast Render](https://i.cloudup.com/1MohsGbKOg.jpg)

You can verify that the Meteor client is still trying to connect to the DDP server we've provided with `DDP_DEFAULT_CONNECTION_URL`.