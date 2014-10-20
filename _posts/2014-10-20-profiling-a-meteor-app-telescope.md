---
layout: blog
title: "Profiling a Meteor app: Telescope"
category: blog
summery: "Meteor is reaching version 1.0 and stabilizing its APIs and that's great news. So I decided to do a load test on Meteor to identify its CPU usage."
---

Meteor is [reaching](https://groups.google.com/forum/#!topic/meteor-core/IGORBS6GBAM) version 1.0 and stabilizing its APIs and that's great news. So I decided to do a load test on Meteor to identify its CPU usage. Frankly, I wanted to play around with Kadira's new CPU-profiling feature and this is what I did.

I usually use [Telescope](http://www.telesc.pe/) to benchmark and test experiments I work with. So I decided to do a load test on Telescope to see what happens. 

This is a DDP-based load test, written using our unfinished load-testing tool "meteor-down". My friend [Thanish](https://twitter.com/mnmtanish), the guy behind "meteor-down", helped me to set up the load test.

> I'll talk more about "meteor-down" in another post.

The test case is pretty simple:

* A user logs into Telescope.
* Read a posts and some comments.

I ran this test with a concurrency of 50 which means 50 users were browsing Telescope at the same time. I did this test on my MacBook Air and my intention was not to compare Meteor with some other framework, rather to find out what was happening inside.

If you are interested in looking at the load-testing script then check it out [here](https://gist.github.com/mnmtanish/fe4f7efb3db24e83c310).

## Taking the Profile

Once the load test was in progress, I took a [CPU profile](https://kadira.io/academy/meteor-cpu-profiling/) of the Telescope instance using Kadira. You can learn more about how to take a CPU profile here. Here's the summary:

![Telescope CPU Profiling Summary](https://cldup.com/uUvt1EhuKi.png)

By look at this breakdown, we can understand that over 20% of cpu is spent on sending data to the client.

## Diving Deep

So let me dive deep and show you what's really happening inside. Before that I need to explain what a flame graph is.

### Flamegraphs

A flamegraph is a way to analyze the CPU utilization of individual functions and their call stacks very easily. Here's a sample flame graph:

![Sample Flamegraph](https://cldup.com/pT-YdnTfRb.png)

* Each bar represents a function in the app.
* The color of a bar has no meaning.
* The length of a bar represents the amount of time it (the function and its children) was on the CPU.
* A function can be a direct parent for one or many functions. In this example, an anonymous function is the parent for both buildPayload and HTTP.call.
* The function (or part of it) on the top is known to be on the CPU. You can think about this another way: functions with a black background are those that stay in the CPU.

Let me explain this further:

* `countObservers` is wholly on the CPU as it is always on the top of the stack.
* `_.each._.forEach` spends some of its time on the CPU itself and it is also a parent of countSubData.
* `buildPayload`, `HTTP.call` and many others never spend time on the CPU.

[Click here](https://kadira.io/academy/analyze-meteor-cpu-profile/) to learn more about this.

Watch this video to see how I analyze taken CPU profile.

<iframe width="640" height="480" src="//www.youtube.com/embed/vvrYX5dEARY" frameborder="0" allowfullscreen="1">
</iframe>

## Conclusion

Most notably Meteor spends a lot of CPU power when sending data. Additionally Meteor also spends some CPU time processing oplog data as well.

Yes. Meteor adds some additional overhead but what you get from Meteor is more than this cost. But I hope Meteor will work on performance improvements after 1.0 and make it better.

---

> If you are running a production app, I highly recommend that you [take a CPU profile](https://kadira.io/academy/meteor-cpu-profiling/) to see what's really happening under the hood. And you can do this in under a minute.

[![Meteor CPU Profiling with Kadira](https://cldup.com/9e2Zti7psL.png)](https://kadira.io/academy/meteor-cpu-profiling/)