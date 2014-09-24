---
layout: pro-meteor-post
title: MongoDB Oplog and Meteor
category: prometeor
summery: "Meteor is one of the few frameworks to use MongoDB oplog even though oplog is not an official MongoDB API. So this article is for Meteor developers. I'd like to show what oplog is and explain the ways to add oplog support to a Meteor app."
---

Meteor is one of the few frameworks to use MongoDB oplog even though oplog is not an official MongoDB API. So this article is for Meteor developers. I'd like to show what oplog is and explain the ways to add oplog support to a Meteor app.

So, let's begin.

## MongoDB Replica Set

Before we learn about oplog, we need to have a word about [Replica Set](http://docs.mongodb.org/manual/replication/). Replica Set is MongoDB's replication strategy to address high availability. It's a good idea to deploy a Replica Set for any production MongoDB deployment. (I'll talk more about setting up a Replica Set at the end of this article.)

Replica Set comprises  one or many MongoDB servers (nodes) replicating the same set of data. It is recommend to run a Replica Set of at least 3 nodes. But a Replica Set should not contain more than [12 nodes](http://docs.mongodb.org/manual/reference/limits/#Number-of-Members-of-a-Replica-Set).

One node acts as the Primary and others are known as Secondaries. Primary election is fully automatic and if the current Primary goes down, a new "Primary" will be elected from the Secondaries. But there are many more options to customize the default behavior.

Write operations can be directed to Primary only, but you can read from any node. If you read from a Secondary, you may get data that is inconsistent with the Primary data.

As I mentioned earlier, Replica Sets are used mainly for high availability. But some people use Replica Sets for backups and doing background analytic jobs using Secondaries.

## What is Oplog

Oplog is the heart of a MongoDB Replica Set. It's a stream of all the write operations happening inside the Primary. Actually, oplog is a [capped collection](http://docs.mongodb.org/manual/core/capped-collections/) named `oplog.rs`, located on the `local` database. It's created for you automatically when initializing the Replica Set.

Capped collections can be tailed (with queries) and monitored for new additions. So, it can be used as a stream. That's what exactly Secondaries do. They are tailing oplog on the "Primary" and make a copy of that while applying write operations(entries in the oplog) into the data that Secondary maintains. That's how Secondaries keep updated with the Primary.

Here are some sample oplog entries.

~~~js
// oplog entry for an insert into `migration` collection of `meteor` db
{
  "ts" : Timestamp(1410449923, 3),
  "h" : NumberLong("-4512221085505246164"),
  "v" : 2,
  "op" : "i",
  "ns" : "meteor.migrations",
  "o" : {
    "name" : "updatePostStatus",
    "startedAt" : ISODate("2014-09-11T15:38:43.339Z"),
    "completed" : false,
    "_id" : "ANbayNsv5kndqmFu2"
  }
}
~~~

~~~js
// oplog entry for an update operation
{
    "ts" : Timestamp(1411545181, 1),
    "h" : NumberLong("369441830544009581"),
    "v" : 2,
    "op" : "u",
    "ns" : "meteor.migrations",
    "o2" : {
        "_id" : "ANbayNsv5kndqmFu2"
    },
    "o" : {
        "$set" : {
            "completed" : true
        }
    }
}
~~~

~~~js
// oplog entry for a delete operation
{
    "ts" : Timestamp(1411545191, 1),
    "h" : NumberLong("3472940282940006216"),
    "v" : 2,
    "op" : "d",
    "ns" : "meteor.migrations",
    "b" : true,
    "o" : {
        "_id" : "ANbayNsv5kndqmFu2"
    }
}
~~~

~~~js
// oplog entry for a dropCollection command
{
    "ts" : Timestamp(1411545320, 1),
    "h" : NumberLong("-2565024453394063511"),
    "v" : 2,
    "op" : "c",
    "ns" : "meteor.$cmd",
    "o" : {
        "drop" : "migrations"
    }
}
~~~

By default, oplog takes 5% of the disk size available for the MongoDB. But you can change that via the [--oplogSize](http://docs.mongodb.org/manual/core/replica-set-oplog/#replica-set-oplog-sizing) option.

## How Meteor uses Oplog

![How Meteor uses Oplog](https://cldup.com/pxqhOiXKm9.png)

Meteor's default observe driver is based on polling and that makes Meteor super-slow and causes it to consume a lot of server resources. As a solution for that, Meteor uses oplog to detect data changes and trigger observers. Using oplog to trigger observers is very efficient compared to the polling approach.

Meteor acts like a Secondary in the sense that it is tailing the oplog of the Primary. Meteor keeps a cache of data inside the memory and applies changes while triggering observers.

Don't worry. Meteor won't cache all the data comes through the oplog, just the data relevant to observers.

Actually, most of the work is done on the Meteor framework itself and you simply need to ask Meteor to enable oplog support.

For that, you need to set the following `MONGO_OPLOG_URL` environmental variable, pointing to the Mongo url of your Replica Set's `local` db. Here is an example:

~~~
MONGO_OPLOG_URL=mongodb://user:pass@host1:port,host2:port,host3:port/local
~~~

Keep in mind that oplog contains changes for all the DBs available in your Replica Set. By contrast, Meteor only tails changes for the db you've specified via the `MONGO_URL`. So `MONGO_URL` and `MONGO_OPLOG_URL` should point to the same Replica Set.

### Keep in Mind

Even though oplog makes your Meteor app faster in general, it might make things [worst](https://groups.google.com/d/msg/meteor-talk/Y547Hh2z39Y/Sp3Z4hGlE-sJ). In its current version, Meteor is tailing all the data changes happening in your DB. So, Meteor will receive all the data changes for the db whether you really need them or not. Because of that, if you have a lot of writes in your DB that do not trigger any observers you might be in trouble. Some examples of this are offline pre-aggregations and writes from other apps.

Right now, the only available solution is to move those collections into a separate database until Meteor implements a [fix](https://groups.google.com/forum/#!topic/meteor-core/RpTxiGPUhMw).

### Optimize Your Queries for Oplog

Normally, most of your queries can work with oplog without additional steps. But you will need to do some tweaks for some of them. To learn which queries require additional steps —and how to implement them— you can refer this Kadira Academy article on [Optimize Your Meteor App for Oplog](https://kadira.io/academy/optimize-your-app-for-oplog/)

[![Meteor Oplog and Kadira](https://i.cloudup.com/FA2NrHshgj.png)](https://kadira.io/academy/optimize-your-app-for-oplog/)

## How to Deploy a Replica Set.

Now we know about MongoDB oplog and how it works with Meteor. But deploying a production- ready MongoDB Replica Set is not that simple. And if you’ve successfully deployed a Replica Set, managing it is not a trivial task.

That's why I recommend some cloud solutions like [compose.io](https://blog.compose.io/meteor-the-oplog-and-elastic-deployment/) or [mongolab](http://blog.mongolab.com/2014/07/tutorial-scaling-meteor-with-mongodb-oplog-tailing/) to deploy your Replica Set. They offer very affordable plans now.

If you are still looking to deploy on your own, I recommend following official MongoDB tutorials on [Replica Set deployment](http://docs.mongodb.org/manual/administration/replica-set-deployment/).


---

If you’d like to learn more about how Meteor uses oplog internally or how Meteor makes MongoDB real-time, read my book [Meteor Explained](https://gumroad.com/l/meteor-explained). I've just completed the chapter on "MongoDB and Meteor."

{% include meteor_explained_book.html %}