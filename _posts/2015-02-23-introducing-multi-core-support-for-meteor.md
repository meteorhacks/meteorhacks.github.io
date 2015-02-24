---
layout: blog
title: "Introducing Multi-Core Support for Meteor"
category: blog
summery: "Now you can use Multiple Cores on your server with your Meteor app. You only need to add a package."
---

These days, most cloud servers come with more than one core. But, there is no way to get the benefit of multiple cores with Meteor. Hence, we cannot use the maximum capacity of the server. 

Luckily from today onwards, Meteor apps can use multiple cores very easily. This is how.

First add the [Cluster](https://github.com/meteorhacks/cluster) package into your app:

~~~shell
meteor add meteorhacks:cluster
~~~

Then, expose the following environment variable:

~~~shell
export CLUSTER_WORKERS_COUNT=auto
~~~


That’s all you have to do. Now your Meteor app will use all the cores available on your server.

> If you are using the Meteor Up to deploy your app, update mup and do `mup setup` once.

![Using Meteor Cluster for Multi Core Support](https://cldup.com/cezEImOavr.png)

You can also specify the number of workers explicitly, like this:

~~~shell
export CLUSTER_WORKERS_COUNT=2
~~~

> Normally, Cluster needs a [MongoDB connection](https://github.com/meteorhacks/cluster#getting-started) to communicate between servers. But, since these workers were spawned inside a single server, we don't need a MongoDB connection for multi-core support.

## How Cluster's multi-core support works 

NodeJS supports multiple cores with the [cluster](http://nodejs.org/api/cluster.html) module. It works on the TCP layer. But, Meteor needs sticky session support. Because of that, we need to move our multi-core routing logic into the HTTP layer. So, we can't just use the NodeJS cluster module with Meteor.

Therefore, we had to come up with a different approach to adding multi-core support to Meteor. First, we spawn a set of clones of the running Meteor app (we call them workers). Then, we use a few different ways to distribute the traffic. Here they are:

#### For static resources and HTML
These will be served directly from the main Meteor app. There is no need to proxy them from workers.

#### For SockJS requests (long polling)
These requests will be proxied to workers we've spawned. Sticky session support is enabled when proxying.

#### For WebSocket requests 
For WebSocket requests, we simply send the socket to the worker and then it will directly handle the traffic. In this case, there is no proxying and it's very efficient. This is similar to how the NodeJS cluster module behaves.

## Performance

To benchmark the performance, we decided to run a test like this. These tests were done using an Ubuntu server form [DigitalOcean](https://www.digitalocean.com/pricing/) that has **four** cores. We load tested it for a few different cases:

* Control test - without using Cluster (uses only one core)
* With Phusion Passenger (uses four workers)
* With Cluster (uses four workers)

> [Phusion Passenger](https://www.phusionpassenger.com/) is a customized nginx server, which can be used for multi-core support. It supports Meteor apps too.

### Test app

Here's how this test app works:

* The app has a publication.
* App gets data from a MongoDB server hosted at [compose.io](https://www.compose.io/) (oplog support is enabled).
* [Meteor Down](https://github.com/meteorhacks/meteor-down) is used to create the DDP traffic. 
* Once a DDP connection has been made to the server, it subscribes to the above publication.  When it receives data, it will kill the connection and start another one. 

We’ve used three different payloads:

* 20 Kb size of subscription data - fetches data from mongodb for every request
* 200 Kb size of subscription data - fetches data from mongodb for every request
* 200 Kb size of subscription data - fetches data from mongodb once, then cache in memory

Here is a table of subrates (subscriptions per minute): 
(These metrics were captured using [Kadira](https://kadira.io/))

![Cluster's Multi Core Performance Results](https://cldup.com/xe51fHH-5c.png)

### Conclusion
It seems like in both 20KB and 200 Kb (without caching) tests, Passenger and Cluster performed equally. That’s because a lot CPU time was spent on fetching documents from MongoDB.

But, in the other case, data is cached in the Memory and only a fraction of CPU time was spent on fetching documents. Because of that, the app could handle more requests. This time, Cluster could handle a lot more requests than Passenger. That's because, Cluster does not proxy requests rather it sends the raw socket to the worker.

So clearly, Cluster uses cores in your server in a more efficient manner compared with Phusion Passenger. That’s a really good thing. 

---

Use cluster with your app and try to utilize all the cores available in your server. You can also use it to scale your Meteor app vertically by adding more cores.

Finally, don't forget to share your experiences with us.





