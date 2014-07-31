---
layout: docs
title: Security Measures
section: fast-render
permalink: /fast-render/security-measures
---

FastRender has the ability to detect the loggedIn user without a DDP connection. It does this by sending the same `loginToken` used by the DDP connection over the cookies.

This is not a bad situation, but this might cause some security issues. Those issues are described below with the possible counter measures. Fortunately, Fast Render built-in measures to prevent some of them.

> These issues are [raised](http://goo.gl/eGwb4e) by [Emily Stark](https://twitter.com/estark37) from the meteor-core team.

## Side Effects

It is possible to send custom HTTP requests to one of the routes handled by `fast-render` either as a XHR request or a direct HTTP request.

In this case, if you are doing some DB write operations or saving something to the filesystem, those are also get executed. This gets worst, if the HTTP request is a XHR request called by an evil site. He can't read anything, but he can cause the side effects.

> So, it is wise to avoid side-effects from publications, fastRender routes and IronRouter waitOn.

> So, Fast Render detects CORS headers with conflicting routes and turned off Fast Render alterations for those routes

## CORS headers

If one of your packages or your app adds [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers via connect handlers, there is a potential security issue.

It is okay to add CORS headers to custom server side routes, but if they are conflicting with the client side routes(which handled by Fast Render), there is a security issue. This issue allows malicious XHR requests from other domains to access loggedIn user's subscription data.

## Do not use on shared domains

If you are using fast-render on a shared domain like `*.meteor.com` or `*.herokuapp.com` you are exposed to a serious security issue. If then, you should not use fast-render.

If you are hosting under `*.meteor.com` but using a separate domain for your app. You are not vulnerable for this issue.

[Learn more about this issue](https://groups.google.com/forum/#!topic/meteor-talk/Zhy1c6MdOH8).
