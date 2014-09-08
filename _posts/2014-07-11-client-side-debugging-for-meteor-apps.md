---
layout: blog
title: "Client-Side Debugging For Meteor Apps"
category: blog
summery: "Last weekend at MeteorHacks, we did some research into client-side error tracking and found some very useful resources and techniques. Let me share our experiences with you."
---

> Update: We've released our [Error Tracking Solution for Meteor](https://kadira.io/blog/awesome-error-tracking-solution-for-meteor-apps-with-kadira/). 
>
> It comes with Kadira. [Check it out!](https://kadira.io/blog/awesome-error-tracking-solution-for-meteor-apps-with-kadira/)

Last weekend at MeteorHacks, we did some research into client-side error tracking and found some very useful resources and techniques. We've integrated some of them with Meteor. Let me share our experiences with you.

There are several ways we can debug client-side errors effectively. I will walk you through some of them and show you how to debug client-side errors for Meteor apps very easily.

## Our App
We will be using a simple Meteor app with a single method called getData, which returns `null`. Here's the code for the app:

~~~js
if(Meteor.isServer) {
  Meteor.methods({
    getData: function() {
      return null;
    }
  });
}

if(Meteor.isClient) {
  Template.main.events({
    "click button": function() {
      Meteor.call('getData', afterGetData);
    }
  });


  function afterGetData(err, data) {
    setTimeout(function() {
      var avg = data.total / data.count;
      alert(avg);
    }, 300);
  }
}
~~~

* [Click here](https://github.com/meteorhacks/zones-simple-example) to get the complete code

When you click on the button, a Meteor method call will be invoked. When the result comes back, the app tries to do a calculation using the method result, but since the result is `null`, it will throw an exception. The calculation happens inside a setTimeout (just to mimic the async aspect).

## Inspecting Errors in the Browser Console

When you simply click on the button, you’ll get an error message in the console:

[![Error in the Browser Console](https://i.cloudup.com/F1RerfBJiT.png)](https://i.cloudup.com/F1RerfBJiT.png)

The message does not help much since it only shows us where the error was thrown. We have no clues to identify what caused the error or to find the root cause.

_**Let me give you some background information.**_

All our JavaScript code runs inside an eventLoop in the browser. It can only get the stack trace of the current running loop. If there are async operations, they are run in different loops. Since the flow of our example code is async, our error only has the stack trace for the current running loop. Which is not helpful for debugging.

## Chrome's Async Debugger

Chrome now has an async debugger, which helps to track the async call stack. We can use it to learn more about our error and find out which action caused it. See the following video:

<iframe width="640" height="480" src="//www.youtube.com/embed/xSXAmluDuJY" frameborder="0" allowfullscreen="1">
</iframe>

Now, Chrome's async debugger shows us the place where the issue initiated (inside the Meteor.call result callback). That information helps us a bit more to figure out the reason. But still, we don't really know what the user did to get this error. We can guess or ask the user directly, but we need something better.

## Debugging with Zone.Js

We've a better way to debug errors thanks to the [Zone.Js](https://github.com/angular/zone.js) project from the Angular team. Zone.Js is an execution context that allows us to group a set of async code flows and manage them. It is very easy to get an async stack trace with Zone.Js. We recently integrated Zone.Js into Meteor, which is available on Atmosphere as [`zones`](https://atmospherejs.com/package/zones).

Let's try to debug our app with Zone.Js. Install the [`zones`](https://atmospherejs.com/package/zones) package into our app with `mrt add zones` and let's generate the error:

[![Meteor Error Stack Trace with Zones](https://i.cloudup.com/3sZMoRt2GX.png)](https://i.cloudup.com/aAwUHcJedQ.png)

* [Click here](http://simple-example-zones.meteor.com/) to see the deployed version

Wow! That's awesome. Now we've the whole stack trace from where the user invoked the action. We can use Chrome’s debugging tools with this stack to find out the root cause very effectively. Watch the following video:

<iframe width="640" height="480" src="//www.youtube.com/embed/CtkN9QXyUmQ" frameborder="0" allowfullscreen="1">
</iframe>

### Try Zones based Error Tracing

Check [this deployed app](http://zones-example.meteor.com/) and see how zones can track errors in difference places inside a Meteor app.

(Use Google Chrome for better results)

## Debugging in Production

Debugging in production is a little bit more tricky:

1. All our JavaScript code is minified.
2. Errors are thrown on the user's browser.
3. It’s hard to reproduce errors.

With our `zones` package, we can still get an idea of what's happening but we can't debug the error using Chrome's debugging tools (similarly with other browsers). So we need some help. Let me talk about this.

In Kadira, we implemented server-side error tracking from the very beginning. We are able to show you an actual trace of what really happened when an error is thrown:

![Kadira Server-Side Error Tracking](https://i.cloudup.com/vDDQlx00_j.png)

Trace is very helpful to figure out the root cause and apply a fix. Now we are working on doing the same for client-side errors.

With Kadira's new client error tracking, we can show you the following additional information along with the async stack trace (yes, we are using Zones):

* URL
* UserId
* Browser information
* Method call traces (arguments and result)
* Subscription traces (arguments and result)
* Collection method invocations

Then it's very easy to find the root cause for the error and you can apply a fix very quickly. Even though we show you a lot of information, you don't actually need to do anything. All you have to do is simply connect to Kadira.

---

Update: This is our new [Error Tracking Solution for Meteor](https://kadira.io/blog/awesome-error-tracking-solution-for-meteor-apps-with-kadira/) comes with Kadira!

[![Error Tracking for Meteor](https://cldup.com/iS7yufivIz.png)](https://kadira.io/blog/awesome-error-tracking-solution-for-meteor-apps-with-kadira/)
