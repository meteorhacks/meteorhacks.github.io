---
layout: docs
title: FastRender - Introduction
section: fast-render
permalink: /fast-render/
---

> Hello Boss

Meteor Core teams' current focus is to make meteor more developer friendly, which is really good. They have some plans to support multi-node meteor apps in the future, but we are not sure about the exact timeline yet. So if we want to build/scale meteor apps with multiple nodes, we need to find a way ourself. 

When we are trying to scale meteor horizontally and run multi-node meteor app, we need to solve 2 major issues.

1. We need to load balance, WebSockets/SockJS connections to our meteor nodes correctly
2. We need to sync mongodb write operations across all the meteor nodes

Here we are only focusing on syncing mongodb write operations and load balancing can be done later or simply we can just rely on someone else for it. (we'll discuss more about this later)

## Introducing Meteor Cluster

Meteor Cluster is a [smart package](https://atmosphere.meteor.com/package/cluster) which sync mongodb write operations across all the meteor nodes. It uses [Redis Pub/Sub](http://redis.io/topics/pubsub) to communicate between meteor nodes. Let's try Meteor Cluster.

1. Download and install [Redis](http://redis.io)
2. Run `redis-server` in your local machine
3. Install `cluster` [smart package](https://atmosphere.meteor.com/package/cluster) - `mrt add cluster`
5. Install and Run [mongodb](http://www.mongodb.org/) instance
4. Add following code to your app

`Posts, Notifications, Comments` are Meteor Collections which needs to be synced with the cluster. Replace them accordingly.

    Meteor.startup(function() {
        Meteor.Cluster.init(); //assumes you are running a redis-server locally
        Meteor.Cluster.sync(Posts, Notifications, Comments); //replace with your collections
    });

Now run 2 meteor nodes with following command.

1. `MONGO_URL=mongodb://localhost/meteor mrt --port 8090`
2. `MONGO_URL=mongodb://localhost/meteor mrt --port 8091`

Now you've a Meteor Cluster of 2 nodes. Visit [http://localhost:8091](http://localhost:8091) and [http://localhost:8092](http://localhost:8091) in separate browsers and see how it works.

### [See this demo video on YouTube](http://www.youtube.com/watch?v=12NkUJEdFCw&amp;feature=youtu.be)

## How does Meteor Cluster work?

Although Meteor Cluster solves a huge problem, it's code base is very small. You check it out on [Github](https://github.com/arunoda/meteor-cluster) and it is releases under MIT License.

<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-cluster&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="125px" height="30px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-cluster&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="30px">
</iframe>

Let's discuss how meteor cluster works. Imagine our demo meteor app is a Group Chat.

* We have 2 meteor nodes - (A and B)
* They are connecte