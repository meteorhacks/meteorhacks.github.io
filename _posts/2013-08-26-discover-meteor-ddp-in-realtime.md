---
layout: blog
title: Discover Meteor DDP in Realtime
category: blog
summery: "DDP is the protocol Meteor uses to communicate between clients and the server. With the good knowledge of DDP, you can optimise your app for meteor better. I'll show you a tool which will helps you a lot in this process."
---

Today I will show you a tool that helps me immensely to understand Meteor internals and [DDP](http://meteorhacks.com/introduction-to-ddp.html). 
DDP is the [protocol](http://goo.gl/4N7HrM) Meteor uses to communicate between client and the sever. It's a very simple and tiny protocol ([learn DDP](http://meteorhacks.com/introduction-to-ddp.html)). But it's somewhat tough to look at DDP messages being generated while you're using your app. 

## Meet DDP Analyzer
[Meteor DDP analyzer](https://github.com/arunoda/meteor-ddp-analyzer) comes with a DDP proxy which proxies your app's DDP requests and dump them into the console. 
With DDP analyzer, you can see DDP messages that are being generated, when you are using your app.

![Meteor DDP Analyzer in Action](https://i.cloudup.com/IsUVXUOspa.png)

### how to use the DDP analyzer

* install it from npm - `sudo npm install -g ddp-analyzer`
* start the proxy - `ddp-analyzer-proxy`
* Then start your meteor app as shown below

apply these commands in the console.

    export DDP_DEFAULT_CONNECTION_URL=http://localhost:3030
    meteor

DDP Analyzer is OpenSouced(as usual) and hosted on [Github](https://github.com/arunoda/meteor-ddp-analyzer).

<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-ddp-analyzer&amp;type=watch&amp;count=true&amp;size=small" allowtransparency="true" frameborder="0" scrolling="0" width="80px" height="25px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-ddp-analyzer&amp;type=fork&amp;count=true&amp;size=small" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="25px">
</iframe>

<p></p>
>This is a debugging and learning tool. You get the best results when used with a single client. Please don't ever try to use this in production :-) 

## Watch how I analyze telescope meteor app

<iframe width="640" height="480" src="//www.youtube.com/embed/K7wvsy4UNZ8" frameborder="0" allowfullscreen="true">
</iframe>

## Why I built this?
When I started to work with [SmartCollections](http://meteorhacks.com/introducing-smart-collections.html), I needed to learn more about the Meteor internals. I also needed to debug apps for which I don't have access directly. 

I searched for ddp tools. There are some. But none of these tools could be used in conjunction with a real app. So I built the DDP analyser. 

What's good about DDP analyzer is I can see what exactly is going on, even if I don't have access to the app. 

## How does this work?

As usual, let me tell you what exactly is happening behind the scene. 

In Meteor, there are two kinds of servers. 

1. Static HTTP server which serves HTML, js, CSS and other static content. 
2. DDP server which runs the logic of your app. 

It is possible to use two different servers for a single app. That's what exactly I'm doing here.

* You can run your Meteor app as usual while running both types of servers. 
* But with `DDP_DEFAULT_CONNECTION_URL` environment variable, I ask Meteor client to connect to a different DDP server. 
* That DDP server is a proxy which proxies requests to your existing DDP server.
* The proxy logs DDP messages to the console. 

I think it is a really good idea to look at what's happening on the wire related to your app. With that, you'll get a chance to learn how Meteor works and optimize your app for it. 

Hope you like this. Let me know your suggestions. That encourage me to hack more :-)

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.
