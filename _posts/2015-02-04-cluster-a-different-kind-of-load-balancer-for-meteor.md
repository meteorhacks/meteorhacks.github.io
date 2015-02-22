---
layout: blog
title: "Meteor Cluster - A Different Kind of Load Balancer for Meteor"
category: blog
summery: "With Cluster, you don't need to use HaProxy or Nginx to load-balance your Meteor app. You just need to install a Meteor package. Additionally, it'll discover new instances automatically."
---

Normally, if we need to scale a Meteor app, we need to put it behind a load balancer like Nginx or HaProxy. We need to configure it properly for Meteor and manage it separately. If we need to add or remove instances, then we need to change the configuration again and restart the load balancer. 

![Scaling Meteor with Nginx](https://cldup.com/ZWilGjwrgP.png)

_**" What if we could load-balance Meteor apps by just installing a Meteor package? And if it could detect new or removed instances and route traffic accordingly, that'd be great. "**_

We are proud to say, we now have a solution that can do things mentioned above. It’s [Cluster](https://github.com/meteorhacks/cluster). Let's see how we can use it.

## Getting Started

Using cluster is pretty easy. First, install the following package into your Meteor app:

~~~shell
meteor add meteorhacks:cluster
~~~

Then, when you are running your app, export the following environment variables:

~~~shell
export CLUSTER_DISCOVERY_URL=mongodb://mongo-url
export CLUSTER_SERVICE=web # define this as a web service 
export CLUSTER_ENDPOINT_URL=http://ipaddresss:port
~~~

Cluster uses MongoDB to communicate between all the Meteor instances of your app. To do this, you can use your app's current `MONGO_URL`. But if possible, use a separate replica set.

`CLUSTER_ENDPOINT_URL` is the direct URL for the Meteor app running on your server. It could be a private URL, but all the instances of your app should be able to access it.

Now, deploy as many as instances of your app as possible and send the traffic to an instance of your cluster. That's all you've to do. 

When you need to scale up, simply add more instances. There is no need to configure anything. Cluster will detect new instances and route the traffic to new servers. You can also remove running instances without affecting other instances or your app.

![Load Balancing with Cluster](https://cldup.com/T1X0NYFCJK.png)

If you need more info on this, watch this [live demo](https://www.youtube.com/watch?v=oudsAQZkvzQ&feature=youtu.be&t=15m27s).

> If you are using [Meteor Up](https://github.com/arunoda/meteor-up) to deploy your app, you can use a configuration like [this](https://gist.github.com/arunoda/65ceb06952957e976e76). <br>
> With this, you don't need to configure `CLUSTER_ENDPOINT_URL`. Meteor up set it automatically.
> (Make sure to update Meteor Up to the latest version.)

## Multiple Load Balancers 

This looks great. But with this setup, traffic is proxied through a single instance. If we've a high-traffic Meteor app, this will be an issue. Normally to solve such an issue, we would add multiple load balancers with DNS load-balancing.

Let's think in a different way.

_**" What if every instance of your app were a load balancer? Then we wouldn’t need to worry about this issue anymore. "**_

With cluster, every Meteor instance becomes a load balancer. So, if we can find a way to send traffic to these instances, we've the answer for our question. We can do this in two ways.

### 1. Via DNS

This is the simplest solution. Configure your domain's DNS to resolve the DNS into multiple instances of your app. That's all.

![Multiple Load Balancers via DNS](https://cldup.com/SbNCZH8b_N.png)

With this solution, if one balancer goes down, you need to remove that DNS record. For that you can use a DNS solution like [Route53](http://aws.amazon.com/route53), which has health-checking support.

### 2. Via Balancers

We've another way to do this. We can configure multiple instances in our cluster as **balancers**. A balancer is a special type of instance that can accept DDP traffic directly from the browser. 

Once you mark some of your instances as balancers, the browser will send DDP traffic directly to these individual instances. 

> DDP is the Meteor's real-time protocol. Currently, Meteor implements it using [SockJS](https://github.com/sockjs). So, DDP traffic is SockJS traffic. Which is normally WebSockets or long polling.

![Multiple Load Balancers via Balancers](https://cldup.com/OupdR1UwH7.png)

It's very easy to configure an instance as a balancer. Just expose the following environment variable when starting your app:

~~~shell
export CLUSTER_BALANCER_URL=http://url-for-the-balancer.com
~~~

This balancer URL needs to be a public URL, so you may need to create a DNS entry.

With this approach, we can add and remove balancers as we need and cluster will take care of the routing accordingly. 

## Production Use

For production, we prefer to use both of the above approaches for load-balancing. The DNS-based approach makes our app highly available and the balancer-based approach allows us to add and remove instances very quickly. 

![Production Deployment using via both DNS and Balancers](https://cldup.com/hnYVWGz_DS.png)

It's also very important to use a MongoDB Replica Set for the `CLUSTER_DISCOVERY_URL` for high availability.

We are currently using cluster in production for both [Kadira](https://kadira.io/) and [BulletProof Meteor](https://bulletproofmeteor.com/). We are satisfied with its performance and now we don't need to monitor and manage a Nginx layer. We are planning a performance test and we'll publish the results soon.

> EDIT: We did a performance test. Here are the [results](https://meteorhacks.com/cluster-performance-test-its-impressive.html).

## Next

Cluster is not just a load balancer, it's a service discovery solution for Meteor. It is well suited for microservices. We'll write a blog post about that soon. In the meantime, try to follow these resources.

* [Cluster Documentation](https://github.com/meteorhacks/cluster)
* [Microservices with Meteor and DDP on BulletProof Meteor](https://bulletproofmeteor.com/architecture/microservices-with-meteor-and-ddp)
* [Microservices - Beyond Basics on BulletProof Meteor](https://bulletproofmeteor.com/architecture/microservices-beyond-basics)
* [Deploying a Highly Available Meteor Cluster on BulletProof Meteor](https://bulletproofmeteor.com/architecture/deploying-a-highly-available-meteor-cluster)
* [Microservices Show Feb 2015](http://youtu.be/oudsAQZkvzQ)