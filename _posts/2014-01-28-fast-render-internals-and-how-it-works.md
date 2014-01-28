---
layout: blog
title: "Fast Render Internals and How It Works"
category: blog
summery: "This annotated presentation shows you how Fast Render works and some of the hacks it does."
---

This annotated presentation shows you how Fast Render works and some of the hacks it does.

First of all, let’s see how Meteor normally works. 

![How Meteor Normally Works](https://i.cloudup.com/G7FJMkTwwh.jpg)

Normally, Meteor client can’t show anything until it connects to the Meteor server via DDP and receives the data from the server. Depending on the Internet connectivity, this will be an issue, especially in mobile and Wi-Fi.

Fast Render is a solution for this–see how it fixes this issue:

![With Fast Render](https://i.cloudup.com/6azak1msMh.jpg)

Fast Render sends the data required to render the initial page with the HTML, so the browser can render the page without the DDP connection. This provides the same experience as server-side rendering: the user can see the page immediately after HTML has been loaded.

Here is the initial HTML page normally sent by Meteor:

![HTML Comes with Meteor](https://i.cloudup.com/Mluhtxk16m.png)

This is how it looks with Fast Render:

![HTML Comes with Fast Render](https://i.cloudup.com/buJq5psf8o.png)

![Some Hacks I Did](https://i.cloudup.com/fAMz3Md4Y4.jpg)

As you have seen in the screen shots above, Fast Render sends data with the HTML, even though there is no such API available with Meteor to do that. Here is how Fast Render does it:

![Injecting Data into HTML](https://i.cloudup.com/mOlVnB7Lfy.jpg)

Fast Render directly overrides the NodeJS HTTP module, as shown above, to inject the data into the HTML. It is the only possible way to do what Fast Render needs, and works very smoothly.

![DDP Rewrite](https://i.cloudup.com/LQSRhPepzx.jpg)

The next hack I did is the DDP Rewrite, which takes place inside the Meteor client. Let’s see why we need it in the first place. The slide above shows how Meteor subscription works normally.

The **ready** message is useful, since it triggers the Meteor client by saying that the initial data for the subscription has been sent. Now the client can render the page with all the data. 

Iron Router is a special case, because it looks for the **ready** message before it renders the templates for the route. In this case, Fast Render has an issue, as shown below:

![DDP Rewrite](https://i.cloudup.com/hLc33Pkpvx.jpg)

With Fast Render, the browser has the data even before sending the subscription request. But Iron Router will not render the route since it didn’t get the ready message. The solution is to send a **fake ready** message, as shown above. The code below shows how Fast Render implements this hack, again without the support of any Meteor API. 

![DDP Rewrite - Code](https://i.cloudup.com/myawcxa3fo.jpg)

There are some other hacks involved in building Fast Render. You can learn more about them by looking at the source.

![Security Concerns](https://i.cloudup.com/GT9QuTTDGF.jpg)

Fast Render exposes some security issues that are not normally issues with Meteor. The following section describes what they are and how to prevent them. Some of the issues have been already fixed.

> Our thanks goes to Emily Stark from the Meteor core team for raising these issues.

![LoginToken over Cookies](https://i.cloudup.com/ul8K98Qr78.jpg)

LoginToken is a simple token used to identify the user in the browser. It is identical to the Remember Me cookie used traditionally. Meteor uses localStorage for this purpose instead cookies.

Since localStorage data is never sent to the server, Fast Render cannot identify the logged-in user. The only solution is to send the LoginToken over the cookies. This introduces the following issues:

![Avoid Side Effects](https://i.cloudup.com/vmJyEAw6WN.jpg)
![Avoid Side Effects](https://i.cloudup.com/u98AnBuFRq.jpg)

If your publications trigger side effects  as shown above, they may have been triggered by directly calling to route. This can be done via an AJAX request called by a malicious web site. They can’t get the user’s subscription data, but they can trigger side effects. Directly sending an HTTP request can also trigger this.

So it is recommended to avoid side effects, inside publications, Fast Render routes and IronRouter waitOn functions.

![CORS Issue](https://i.cloudup.com/4RCoQWXz9B.jpg)

CORS is a specification that comes with HTML5; it allows cross-domain communication to work inside the browser. When your app or one of your packages adds CORS support, as shown above,  it is possible for malicious sites to extract the user’s subscription data by sending an XHR request.

This is not something normally happens, but there is a possibility. In those situations, Fast Render detects it, and turns off Fast Render support for particular routes, _**so there is nothing to worry about.**_

![Questions](https://i.cloudup.com/sJGV6VtABg.jpg)

This article has described how Fast Render actually works and some of its internal workings. If you have any questions, please add a comment: I’d happy to answer.

