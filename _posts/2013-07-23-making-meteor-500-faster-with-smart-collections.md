---
layout: blog
title: Making Meteor 500% Faster with Smart Collections
category: blog
summery: "I've released [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) few days ago. And I was talking about its performance over the standard Collection implementation. But I've not showed it to you. Here it is."
---

> Smart Collection is now retired & Meteor's Collection implementation has fixes for most of the performance bottlenecks. It is also using the MongoDB oplog just like Smart Collections.

I've released [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html) few days ago. And I was talking about its performance over the standard Collection implementation. But I've not showed it to you. Here it is.

Smart Collection can give you,

* **~5X** improved performance to your app
* **~20X** improved performance to mongo

Let's dig into the test suite and more details.

## Test App

Our test app is a simple group chat application. Where people can join into groups as their wish and start sending messages. For this test, I used a setup as follows

* ~25 Groups
* 50 Users (for all groups)
* Every user sends a message per 2 seconds 

## Testing Method

* I used set of PhantomJS processes to emulate real users. I used a forked version of Nick's [stress testing script](http://goo.gl/R4wHn).
* CPU and Memory usage were captured using [node-usage](https://github.com/arunoda/node-usage)
* MongoDB CPU and Memory usage were also captured using node-usage
* Test ran for 15 min in both cases (With Smart Collections and Without)

I've added necessary mongodb indexes to avoid mongo getting heated unnecessarily. And DB has been profiled for slow queries and nothing was reported.

> If you want to learn more about the testing suite. [Check it out here](https://github.com/arunoda/stress-test-meteor). Try it on your box or a VM and share the results :)

## Testing Environment 

My intension is not to do a stress test on meteor, but to do a comparison between Smart Collection and Standard Collections. So I simply used my dev box as the testing environment. 

* MacBook Pro Late 2011
* 2,9 GHz Intel Core i7
* 8 GB RAM

## Results 

### For the app (CPU)

![Meteor App Performance - Smart Collections vs Collections ](http://i.imgur.com/T8ySQ44.png)

### For MongoDB (CPU)
![Mongo App Performance - Smart Collections vs Collections](http://i.imgur.com/eiDY7QT.png)

> These graphs were generated using Excel and all the source files and logs related to these can be [downloaded here](https://dl.dropboxusercontent.com/u/6826117/smart-collections-vs-collections.zip).

## What about the RAM?
RAM usage can be negligible for this test. In both cases they were the same.(~200 MB) Since our data set is small, it is hard to see a difference.

## Conclusion

Let's discuss why there is a big difference in CPU.

With Meteor Collections,

* In our app we have around 25 different queries
* When a insert happens (or any write operation) meteor re-run all 25 queries to get the result from db
* Then it needs to compare them for getting the changes

But with Smart Collections,

* Insert operations are pretty cheap, since it doesn't even look for the db for the document (and its safe)
* This test app does not have an update operation. But if exists, it needs to get the data from the DB
* But only the changed document will be taken with `_id`

So that's it; Do you want these benefits? Checkout [Smart Collections](http://meteorhacks.com/introducing-smart-collections.html).


