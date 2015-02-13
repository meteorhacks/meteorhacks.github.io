---
layout: blog
title: "Meteor Cluster Performance Test: Impressive Results"
category: blog
summery: "We ran a performance test for Cluster, our load balancer for Meteor. The results are impressive."
---

In the previous blog [post](https://meteorhacks.com/cluster-a-different-kind-of-load-balancer-for-meteor.html), we introduced [Cluster](https://github.com/meteorhacks/cluster). It is a load balancer sits in the application layer, so, it doesn't need additional hardware or software. With Cluster, you can load-balance a Meteor app by just installing a package. 

Some people are worried about the performance of Cluster and we expected that. So, we ran a load test recently and here are the results. 

### Load Testing Method

Since this is a different kind of load balancer, it's hard to compare with other load balancers. We decided to benchmark it against itself by monitoring the number of requests processed by each server. This is how we did it.

* We used a Meteor app serving only one publication.
* First we ran our load test on the app without Cluster; this was our control test.
* Then we used Cluster in different ways and compared the results with those of the control test.

While running the load test, we tracked and recorded metrics via [Kadira](https://kadira.io/).

### The App and the Load Testing Suite

Our app is a pretty simple Meteor app. It serves a single publication. When a client subscribes to the app, it sends a set of documents, which is around 200 kB in size.

The load testing suite is also pretty simple. The client connects to the server and takes out a subscription. Once the app receives data back, it disconnects and tries to connect again. The load testing suite is written in [MeteorDown](https://github.com/meteorhacks/meteor-down), which  manages invoking multiple concurrent clients.

We used Heroku to scale up our load testing suite. We can scale up to as much as load we need. 

The test app and the load testing suite are available on [this](https://github.com/meteorhacks/cluster-performance) GitHub repository.

### App Servers 

For app servers, we used single-core 512 MB servers from [Digital Ocean](https://www.digitalocean.com/pricing/). We chose Ubuntu 14.04 as the operating system. The deployment was done through [Meteor Up](https://github.com/arunoda/meteor-up) and we didn’t do any kind of OS level tweaks other than the basic setup done by Meteor Up. 

## Load Testing Result

So, we ran the load test for the following scenarios:

* Control test: Just using a single server without Cluster
* With 3 servers: Only one server acts as a proxy for all the traffic (one balancer)
* With 3 servers: All servers accept and process the traffic (all are balancers)
* With 5 servers: All servers accept and process the traffic (all are balancers)
* With 10 servers: All servers accept and process the traffic (all are balancers)

We captured the following metrics using Kadira:

* Sub Rate - Number of subscriptions processed per minute
* Response Time - Time taken to process a single subscription request
* CPU time used by the entry point - The entry point is the server that accepts the initial connection. It forwards that request to another server (before making the WebSocket connection).
* CPU time used by other servers

Here are the results:

![Cluster Performance Test Results](https://cldup.com/Hr5qDoWSmT.png)

> For all the above scenarios, server response time is less than 8ms.

If we look at these  as a graph here's what they look like:

![Cluster Performance Per Server with Kadira](https://cldup.com/N6vX-X-EGe.png)

Here's the CPU usage:

![Cluster CPU Usage](https://cldup.com/nPFQBq12ny.png)

RAM usage is always the same (including RAM usage by the application as well):

![Cluster RAM Usage](https://cldup.com/N6HodQV--7.png)


## Conclusion

Cluster has some issues when using one balancer. Currently, Cluster uses a round robin algorithm to distribute the traffic. Thus, each server processes the same amount of traffic. 

When Cluster runs in single-balancer mode, it's single balancer needs to do more proxying rather than processing requests itself. If it could proxy more requests, we could get even more throughput from this scenario.

When using multiple balancers, there was no such issue. Each server processed more than 2500 subscriptions per minute and that's very close to the control test, which was 2700 subscriptions per minute.

There are a lot more things we can optimize. Even at this stage, we get really impressive performance and we are really proud of it.

## Next

Currently, we are working on [multi-core](https://github.com/meteorhacks/cluster/issues/8) support for Cluster. After that, we'll work on a new routing algorithm based on resource utilization (CPU, RAM, Eventloop). Then, Cluster will balance traffic in a predictable manner and we will get the maximum throughput.

---

> We've released a set of new lessons on [BulletProof Meteor](https://bulletproofmeteor.com/) targeting [microservices](https://bulletproofmeteor.com/architecture/microservices-with-meteor-and-ddp) and production Meteor deployments. Give them a try.
>
> [![BulletProof Meteor](https://cldup.com/oX1_f9-WXE.png)](https://bulletproofmeteor.com/)