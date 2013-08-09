---
layout: blog
title: How Meteor Uses NodeJS
category: blog
summery: "Meteor obviously builds on top of NodeJS. But Meteor's use of NodeJS is far from typical. Learn how Meteor uses NodeJS and learn how to find the NodeJS version used by Meteor."
---

Everybody knows Meteor uses NodeJS behind the scene. But does it use NodeJS version in your PATH? 

**Hmmm.... No!**

Meteor is ultra portable and the developer does not need to know about NodeJS at all. So when you are installing Meteor, it will download something called `dev_bundle` which has NodeJS and all the NPM modules needed by Meteor. All these modules are pre-compiled for your platform. That makes getting started with Meteor easier and quicker.

## Is there any problem with this approach?

No. This is perfect. But problems arise when you are bundling an app and try to run it somewhere else or even on the same machine. 

If you've used any binary NPM module such as `nodetime` or `usage`, you might need to re-install those modules again. This is obviously not very good.

> What's more, you may also need to re-install `fibers` as well.

You might also come across some errors not detected on the dev machine. The reason is the node version Meteor uses and the version in your PATH is not the same. 

## So what's the solution?

Follow these steps.

1. Bundle your app, inside the machine (or server) where you need to run your app.
2. Use the node binary, used by Meteor 

Doing that, we can avoid re-installing binary NPM modules  after the bundling process. We will be using the same node version used by Meteor and as a result, we can expect the same behavior as if it was running on the dev machine.

Step #1 seems OK. But how about #2? How do I find the node version used by Meteor?

I've 2 answers: One short and one long. Let's start with the short one. Life's too short for long answers.

## Finding NodeJS binary with mnode

So I've created a simple tool called [mnode](https://github.com/arunoda/mnode), which shows you the path to the NodeJS binary used by Meteor. Let's install it.

    sudo npm install -g mnode

* Go to your project
* Run your project once and close it (You need to do this only once)
* Simply run `mnode` and you can get the full path of the NodeJS binary
* You can run the node binary like this too - `$(mnode)`

This project is on github and it is quite small. [Read it](https://github.com/arunoda/mnode/blob/master/index.js). 

> If you need to some help on deploying or scaling your app, [Talk to me](mailto:arunoda.susiripala@gmail.com).

## Long Answer - Do It Yourself 

Alright, you want know how to do it yourself. Let me guide you.
> If your app is using a custom git checkout with meteorite, you can't apply this solution to it. Read the [source](https://github.com/arunoda/mnode/blob/master/index.js) of `mnode` and see what's happening there.

* You need to get the Meteor version you are using
* It's stored at `./.meteor/release`, let's call it  as `RELEASE`
* Now open this file - `'~/.meteor/releases/[RELEASE].release.json'`
* Get the value assigned to `tools`, let's call it `TOOLS_ID`
* Here is the path to the node binary
* `~/.meteor/tools/[TOOLS_ID]/bin/node`

Hope this helps you to deploy and run your app smoothly without much issues. Let me know your thoughts. 

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.

