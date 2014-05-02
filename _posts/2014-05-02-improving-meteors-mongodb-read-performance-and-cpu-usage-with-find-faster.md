---
layout: blog
title: "Improving Meteor’s MongoDB Read Performance and CPU Usage with Find-Faster"
category: blog
summery: "If you are reading a lot data from MongoDB, find-faster can help you reduce the response time as well as reduce the CPU usage."
---

Over the last few weeks, I have been working on improving the performance of a few Meteor apps. I started to load-test those applications and I figured out something very interesting: response time significantly increase with throughput. See the following method trace I extracted from [Meteor APM](https://meteorapm.com/) during a load test:

![Higher Response Time](https://i.cloudup.com/x_nSs7vEE8.png)

It was pretty scary to see such response times for `_id` lookups on a collection. This may be due to some delay with the network or with the concurrent handling of the node MongoDB driver. So, I began thinking about a solution.

## Hacking Time

After a few hours of hacking into the Meteor core, I came up with a solution that fixes the above problem. So I [tweeted](https://twitter.com/arunoda/status/459866024397918210) a simple (but not realistic) benchmark. A few people became interested in the project and David Glasser from the MDG helped me to iron out some potential issues. It was a good learning time.

## Meet Find-Faster

Now the solution is ready. It’s called [find-faster](https://github.com/arunoda/meteor-find-faster) and is available from [Atmosphere](https://atmospherejs.com/package/find-faster). As the name implies, it finds documents from MongoDB faster than the default Meteor implementation. It simply starts a short-lived observer for each identical query and caches the results (actually the observer does the caching).

So, multiple find() calls with the same query won't hit the MongoDB server again and again; it simply utilizes the cache. Changes to the query will be updated by the observer via oplog. This reduces the response times, CPU usage and network usage without much memory impact for your app.

Usage is pretty simple. All you have to do is use findFaster instead of find. Browse the [documentation](https://github.com/arunoda/meteor-find-faster) for more information on usage.

## Benchmarks

The benchmark test I mentioned in the tweet is far from a realistic scenario. So, I wanted to create a benchmark test with a real app. So here it is.

Our app is a simple group chat application. We'll load-test two scenarios:

1. Just two `_id` lookups in a single method call
2. 1000 documents fetched from the DB in a single method call

Both these queries have been optimized with the right indexes. The chat app connects to [Meteor APM](https://meteorapm.com/) while the load-testing is running, so we can understand what's happening inside the app.

The chat app I used and the load-testing tool are [available on GitHub](https://github.com/meteorhacks/find-faster-chat-demo).

### Scenario 1: Just two `_id` lookups

This is the method we run the load test against. The `useFindFaster` parameter will be used by the load-testing tool to notify whether to use `find-faster` or not.


~~~js
Meteor.methods({
  chat: function(group, message, useFindFaster) {
    this.unblock();
    var methodName = (useFindFaster)? "findOneFaster": "findOne";
    var user = Meteor.users[methodName](this.userId);
    if(!user) throw new Meteor.Error(401, "Unauthorized!");

    var userInGroup = Groups[methodName]({_id: group, users: user._id}, {
      fields: {users: 0}
    });

    if(userInGroup) {
      Chats.insert({
        from: user._id,
        group: group,
        message: message,
        timestamp: Date.now(),
        username: user.username
      });
    } else {
      throw new Meteor.Error(401, "Not Authorized To Post!");
    }
  }
});
~~~

These are the results we got:

![Results - Find Faster with `_id` lookups](https://i.cloudup.com/cb_r-W_vAB.png)

It is clear that find-faster reduces the overall response time comparatively. As we increase throughput, the response time remains steady in both cases. fast-finder does a good job at reducing the response time for reads but inserting the chat takes some time. See the method trace below:

![Response Time Reduction with Find Faster](https://i.cloudup.com/JWL4Llaxf1.png)

This is the CPU utilization of the Meteor process during the load-testing:

![CPU Utilization improvements of Find Faster for `_id` lookups](https://i.cloudup.com/0wzXYbbByr.png)

Find Faster does not improve the CPU usage significantly, but the difference is something notable.

### Scenario 2: With 1000 Docs

I wanted to load-test `find-faster` with an extreme case. This is the code for that:

~~~js
Meteor.methods({
  getReport: function(group, useFindFaster) {
    this.unblock();
    var methodName = (useFindFaster)? "findFaster": "find";
    var groupData = Chats[methodName]({group: group}, {
      sort: {timestamp: -1},
      fields: {message: 1},
      limit: 1000
    }).fetch();

    //do some calculation
    return 10;
  }
});
~~~

Let's look at the response time comparison.

![Find Faster Response Time Improvements for Big Queries](https://i.cloudup.com/y7114S9efd.png)

That's a huge win. With the default `find()`, the response time increases with an increase in throughput until the throughput gets capped.

But with `find-faster`, even though the throughput keeps increasing, there is no corresponding increase in the response time.

This is the CPU utilization while the load-testing is happening:

![Huge CPU gain for Meteor with find-faster](https://i.cloudup.com/kXGFStfvPj.png)

Wow! I don't need to explain this graph.

## When you should use Find-Faster

I think that I don't need to convince you anymore to use find-faster in your apps. But you can't replace all find() queries with findFaster() for the following reasons:

* find-faster needs an active oplog connection
* find-faster reads are [eventually consistent](https://github.com/arunoda/meteor-find-faster#find-faster-reads-are-eventually-consistent)

These are the places where you can use find-faster without any issues and where it shines:

* If you are fetching a lot of data from MongoDB.
* If your collection has more reads than writes.
* If your query has a considerable amount of throughput (5+ requests per second).

These are the places where you should think twice before using find-faster:

* If you really need the exact state of the DB (check the docs for more information).
* If your query's cardinality is pretty high. Then there will be more cache misses than hits.

For more information on the usage and to know when to use find-faster, please refer to the [documentation](https://github.com/arunoda/meteor-find-faster).

## Conclusion

If your Meteor application reads a lot of data, you should consider using `find-faster`. Give it a try and let me know how it works with your apps.