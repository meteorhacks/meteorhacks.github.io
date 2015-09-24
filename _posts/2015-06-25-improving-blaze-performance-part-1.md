---
layout: blog
title: "Improving The Performance of Blaze - Better Way To Destroy Views"
category: blog
summery: ""
---

We all agree that Blaze has decent performance, but it's not close to React for some reason. But in theory Blaze should be much better than react because Blaze know how to deal with Meteor's reative data. 

So, I decided to spend time on where Blaze is having issues and how we can improve blaze. In my recent code review, I found three possible way to improve the performance of Blaze.

1. Better way to destroy views
2. DOM/Template caching
3. Asynchnous DOM rendering

In this article, I'm talking about "destroying views" and why it's an issue. Unfortunately, implementing a proper fix takes a lot of time and effort. So, that's not something I can do with my limited time. But, I'll share a possible solution we can use.

> In Blaze View is any kind of UI element. It includes not only Templates but if, with, value lookups and other control elements.

## The Problem

We've seen few issues about Blaze's slowness when working with a large project. Often, the problem was view destruction. I could be able to get a good sense of when I was using Kadira Debug. 

So, I've created a [simple app](link to the app) to showcase this.

Let's have a look at our app:

![Demonstrating The App](the-video)

As you seen on the video, View Destruction is costly. This gets worst with the number of DOM elements/views in your app.

![View Destruction is Hard](https://cldup.com/zwUdtEjUHA.png)

## The Issue

So, why it's so hard to destroy views. Let's have a look at how Blaze destroy views. 

> Here's I'm not going to give you extact details, but this is how it works.

Let's say our top view is destroying. Then, blaze trie



