---
layout: blog
title: "Integrating Iron Router Based Apps with Fast Render"
category: blog
summery: "This annotated presentation shows you how to integrate your existing Iron Router based Meteor app with Fast Render."
---

This annotated presentation shows you how to integrate your existing Iron Router based Meteor app with Fast Render.

![Routes on the Server](https://i.cloudup.com/8X9NUx0mvT.jpg)

Fast Render runs your routes on the server. Specifically, it depends on the **waitOn** function on the server side to know which subscriptions are used for the particular route.

So you need to bring your route definitions to a location where they can be accessed by both the server and the client. You also need to guard any client-specific code with **Meteor.isClient**, as shown above.

![Extend with FastRender.RouteController](https://i.cloudup.com/iOOcOfPPyC.jpg)

If you are extending **RouteController**, extend it with FastRender. **RouteController** as shown above. If you are not extending **RouteController** and directly passing **waitOn** function as a route option as shown below, use the fastRender:true option.

![Use fastRender:true](https://i.cloudup.com/Q8prGg7A7S.jpg)

If you are using **this.subscribe(‘foo’).wait()** inside a before handler, Fast Render cannot understand them automatically, since before handlers contain a lot of client-side logics. So it is not a good option to run them inside the server. 

Therefore, you need to specify subscriptions manually, as shown below:

![](https://i.cloudup.com/cHRnXaqNZ9.jpg)

**FastRender.onAllRoutes** can be used if **canView** is a global before handler. If it is a before handler for a specific route, use **FastRender.route** as shown below:

![](https://i.cloudup.com/YLG52kb6QY.jpg)

You might have to assign the return value of **Meteor.subscribe** directly into the **waitOn**. But in this case, Fast Render cannot detect the subscriptions, so the correct solution is to wrap the subscription with a function. 

![Use waitOn() with Functions](https://i.cloudup.com/p3Hgtpt9EW.jpg)

Hope this article helps you to integrate your Meteor app with Fast Render correctly with less issues. If you have any questions, please add a comment: I’d happy to answer.
