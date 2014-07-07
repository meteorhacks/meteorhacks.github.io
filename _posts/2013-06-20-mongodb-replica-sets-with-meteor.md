---
layout: blog
title: MongoDB Replica Sets with Meteor
category: blog
summery: 'For a production application, it is quite common to use mongodb as a <a href="http://docs.mongodb.org/manual/replication/">replica set</a>.With this tutorial, I will go through the replica sets basics and how to configure it for Meteor.'
---

For a production application, it is quite common to use mongodb as a [replica set](http://docs.mongodb.org/manual/replication/). Unfortunately, mongodb replica sets support for Meteor was no so good in versions prior to 0.6.4. But with the version 0.6.4, now Meteor support for replica sets is really good.

With this tutorial, I will go through the replica sets basics and how to configure it for Meteor.

## Why we need Replica Set

Replica Sets is the way how mongodb handles replication. Replication is really important for a production application since we cannot guarantee about the 100% availability. If something goes wrong, we should need some backup. Replica Sets is an option for that. Replica sets can also be used to scale mongodb (on read operations), but it's commonly used for High Availability and Fault Tolerance.

With replica sets, you can run few mongodb instances (normally 3) in sync. Mostly all of your data is synced between these nodes.

There is a `primary` node, which accepts all the write and read operations. Other nodes are called `secondaries` and they are subscribed to primary for receiving write operations.

If the primary goes down, one of the secondaries will become the new primary. All of these electing processes are handled by the replica set itself, and we don't need to do any manual intervention.

>Please note that there are some other ways we can configure the behavior of replica sets.

## Creating the replica set

For this tutorial, we are creating a 3 node mongodb replica set. And we run all of these replica sets in our local machine. (just for the demonstration purpose). You can go through [my replica set short notes](http://goo.gl/izMZj) for setting it up.

I assume you've gone through that process and now you've got a 3 nodes replica set as shown below

* localhost:27001 (primary)
* localhost:27002
* localhost:27003

Our replica set name is **meteor**

## Configuring meteor to use it

Now we need to create our [replica set aware](http://goo.gl/KK5Ie) MONGO_URL as shown below.

<script src="https://gist.github.com/arunoda/a8337781393842a3f32e.js">
</script>

Now lets start our meteor app with this MONGO_URL

<script src="https://gist.github.com/arunoda/0d80b30554da07db4686.js">
</script>

Now our app runs with a MongoDB Replica Set.

## Important notes

Still there are couple of options you need to be aware, when configuring your app. Here they are.

### Read Preference

With [read preference](http://goo.gl/v55vR) you can configure, where you need to read from. You can configure to read only from the primary, secondary or mixed of these. See here for the [complete list](http://goo.gl/HvBKw) of options.

It is really important to set read preference value to `primaryPreferred` as it avoids crashing meteor while there is a new primary election.

### Write Concern

With [write concern](http://goo.gl/7Q5Vi), you can control the consistency level in the replica set. That means you can wait for mongodb to respond back to you for a write operation, after it completed write operation on all nodes, none or in between those two.

It is recommended to to use write concern value `majority` for replica sets. But it is not a bad idea to use it as `1` since we are not always reading from the secondaries.

Now with all these options, our final MONGO_URL will be something like below.

<script src="https://gist.github.com/arunoda/bcab9e83eeb0495c0c7f.js">
</script>

Give it a try and share your experiences.
