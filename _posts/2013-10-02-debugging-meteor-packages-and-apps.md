---
layout: blog
title: Debugging Meteor Packages and Apps
category: blog
summery: "Debugging is always hard! It is really hard if your project used by others. In this post, I'll show how I debug SmartCollections and those techiques could be used to debug your meteor app as well."
---

This time, I decided to discuss some of the experiences of debugging [SmartCollections](http://meteorhacks.com/introducing-smart-collections.html). Although this is about debugging a meteor package, I believe the same can be applied to meteor apps as well.

Normally, I don’t have access to the system(s) where the app is running since most of the issues are reported by SmartCollections users.  Sometimes these issues are very hard to reproduce. Here are the tools and the procedures I use to fix those issue.

## Debug Logs

Logs are really important to find issue. With logs, I can see what is really going on. At a very early stage of SmartCollections, it didn't have logs at all. But when the adoption of SmartCollections began to rise, people started submitting issues. At first I was clueless since there were no logs. Then I decided to add them.

First, I looked how Meteor does this internally. Unfortunately, I couldn't find something useful. So I started to list requirements.

1. It needs to be an integral part of SmartCollections
2. It should be turned off by default and should be possible to turn on without a code change
3. It needs to have namespaces

Fortunately, there is an NPM module called [`debug`](https://github.com/visionmedia/debug) which addresses all my requirements. Additionally, it is [widely used](https://npmjs.org/browse/depended/debug) and substantially matured.

### Using debug

Using debug is very straightforward. First we need to add it to our package or app. You can use my NPM package to load `debug` into your meteor app.

Then you can create a logger. Each logger has a namespace and the namespace will be used to show your logs at runtime. See below for some example.

    //create logger. 
    var debug = Npm.require('debug')('sc:coll:sample-collection');

    //add a log
    debug('insert document: %j', doc);

While at runtime, it does not show any logs at all. We need to turn it on explicitly via an environment variable. See how I could turn on debug logs to show above. 

    DEBUG=sc:coll:* meteor

`debug` supports wildcard filtering, multiple patterns and has many other useful [features](https://github.com/visionmedia/debug#millisecond-diff).

Now you can see a set of debug logs as shown below.

![Debugging Meteor App and Packages](http://i.imgur.com/fiiE9pA.png)

## DDP Logs

Sometimes, I need to figure out what are the actions applied by users exactly. In my case, I also needed to know what is exactly flowing over the wire and which order they are flowing. 

Solution is to log DDP messages. We've a very good tool for that and I've introduced it a few weeks back. See [DDP Analyzer](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html).

## Node-Inspector

Once I got the Debug logs and DDP logs, it is very easy to isolate the issue. After the isolation, I will try to reproduce it locally.

Once reproduced, we can use [`node-inspector`](https://github.com/node-inspector/node-inspector) to see what is really happening inside. `node-inspector` has been re-touched recently and now it is much stable and feature rich.

[See how you can use node-inspector with Meteor](https://github.com/oortcloud/unofficial-meteor-faq#how-do-i-debug-my-meteor-app)

## Happy Debugging

I hope these tools and the process will help you to debug your app or package. If I have missed something or you have a better way to do any of this, let us know about it.

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.