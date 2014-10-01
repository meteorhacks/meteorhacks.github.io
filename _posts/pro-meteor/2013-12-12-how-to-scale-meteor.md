---
layout: pro-meteor-post
title: How to Scale Meteor?
category: prometeor
summery: "Now you know Meteor's scaling issues and how to fix them. This article shows you how scale a meteor app in practice, using what you've learn previously."
section: pro-meteor
---

> I assume, you are using the lastest version of Meteor

In the [previous article](http://meteorhacks.com/does-meteor-scale.html), we looked at the problems and possible solutions for scaling Meteor applications. But I did not show you how to scale an app in practice. So, this article covers that. 

## Scaling Set-up

Our component diagram is:

![Meteor Scaling Setup - Components](https://i.cloudup.com/lfFVzGvSWg.png)

There are three Meteor servers, one MongoDB server and a [HaProxy](http://haproxy.1wt.eu/) server as the load balancer. For SSL support, we will use [Stud](https://github.com/bumptech/stud) in front of HaProxy. 

Let's discuss these components and configurations. 

## Configuring MongoDB

I'm using a single-server [replicaSet](http://docs.mongodb.org/manual/replication/) for MongoDB, which supports the oplog. It is better to use a multiserver replica set, but I will be using a single server to keep things simple. 

#### Configuring a Single-Server Replica 

First, we need to start our MongoDB server with replicaSet aware. Use the following command to start MongoDB with replicaSet `meteor`:

    mongod --replSet meteor

Then, open a Mongo shell and add the following to configure the single-server replicaSet:

    var config = {_id: "meteor", members: [{_id: 0, host: "127.0.0.1:27017"}]}
    rs.initiate(config)

> It is wise to run a 3 node MongoDB ReplicaSet for your app. I highly recommend using [MongoHQ Dedicated Servers](http://www.mongohq.com/pricing/dedicated), if you don't have the expertise.

#### Access Control
Since we are using a separate MongoDB server, we need to prevent unauthorized access of it. We can configure a firewall or use MongoDB’s role-based access control. To make the set-up simple, I assume we've configured the firewall properly. If it is not possible to configure a firewall, try using MongoDB’s [role-based access control](http://docs.mongodb.org/manual/reference/user-privileges/).

We'll be using `app` as the database for our Meteor app. For the oplog integration, we will be using the `local` database that contains the oplog.

## Configuring Meteor 

We need to keep an eye on a few things when we are planning a scalable Meteor deployment. I'll show these in this section.

### Oplog Support

I already mentioned in the [previous article](http://meteorhacks.com/does-meteor-scale.html#meteor_with_mongodb_oplog) how oplog can help Meteor to scale horizontally. 

All you've to do is, simply expose the MongoDB URL of your local database as `MONGO_OPLOG_URL`.

    MONGO_OPLOG_URL=mongodb://localhost/local

(Of course, you need to set `MONGO_URL` as usual)

### IE 8 and 9 Sticky Session Support

IE 8 and 9 [do not send cookies](http://stackoverflow.com/questions/483445/ie8-doesnt-pass-session-cookie-for-ajax-request) with Ajax requests; so this breaks our load balancer, which we'll be exploring in the next section. Fortunately, SockJS has a solution for that, but it is turned off by default with Meteor. To turn it on, you need to export the following environmental variable:

    export USE_JSESSIONID=1

### Selecting Servers

It is very important that you choose identical servers for Meteor. They should be in the same data center and the performance, operating systems and architecture should also all be the same; otherwise we'll have an unbalanced load across our Meteor servers.

In this setup, I am using only a single process on the server. So a server with multiple cores will not be much help. So try to pick single core server instances. I'll cover this further in an upcoming article.

### Deploying

It is very important to deploy your Meteor app correctly and configure the servers carefully. If possible, try consulting someone who knows how. Otherwise you can use [Meteor Up](https://github.com/arunoda/meteor-up), which I built to deploy production-quality Meteor apps.

## Configuring the Load Balancer (HaProxy)

I'm using HaProxy as the load balancer for our Meteor app. It is something very stable and used in production by many companies. Also, HaProxy has built-in support for sticky sessions and some of the other configurations that we will be using.

### Sticky Session Support

There are a couple of ways we can implement sticky sessions. We can implement sticky sessions with cookies, hashing source IP information or customized URLs. There are some other ways, but these are the common ones.

Hashing source IP is the easiest to implement, but it does not balance the load properly. We can't trust the IP information and transparent proxy servers (very commonly used by ISPs) hide the original IP information, which means one server will get many requests and the others won't.

A customized URL path is a very good option and it is very well supported by SockJS. But for this, we'll need some custom logic in the load balancer and further configuration on Meteor.

The cookie-based solution is ideal for us, since it can balance the load properly and it is easy to set up. 

### Load-Balancing Algorithm

It is very important to choose a good load-balancing algorithm. HaProxy comes with a bunch of algorithms. The `roundrobin` algorithm is recommended in the docs. `roundrobin` is very good for stateless webapps built with Ruby on Rails or PHP. 

However, Meteor is stateful and it has long-lasting connections, so it is better to use the `leastconn` algorithm. It sends new connections to the server that has the lowest number of connections. This balances the load equally, even if a server goes down and comes back. If we use `roundrobin`, we'll have an unbalanced load.

### Configuration

See how you can configure HaProxy using the following configuration file:

    defaults
      mode  http
      timeout connect 60s
      timeout server 60s
      timeout client 60s
      timeout check 5s

    frontend public
      #binding port 80
      bind *:80
      default_backend apps

    backend apps
      #load balancing algorithm
      balance leastconn

      #using JSESSIONID as the cookie
      cookie JSESSIONID insert nocache

      #adding server
      server host1 host1.example.com cookie host1
      server host2 host2.example.com  cookie host2
      server host3 host3.example.com  cookie host3

I've removed some parts of the config file to keep it simple. You can get the full config file from [here](https://gist.github.com/arunoda/a35f69f8b7a385d06a8d).

## SSL with Stud

Running your app with SSL is a must in production. Unfortunately the stable version of HaProxy does not support SSL. But we can use Stud in front of HaProxy to terminate SSL. It is better to deploy Stud on the same server as HaProxy.

> Make sure to install Stud from the [source](https://github.com/bumptech/stud). The version you would get with apt-get is outdated. 

You can use the following configuration file:

    #bind to defualt SSL port
    frontend = "[*]:443"

    #haproxy host and port
    backend = "[localhost]:80"

    #location of the .pem file
    pem-file = "/path/to/ssl.pem"

Click [here](https://gist.github.com/arunoda/4c6f5715b826d4bd5317) to get the complete configuration file.

Stud needs your SSL certificate and the private key in a single .pem file. See [these instructions](http://blog.alexnj.com/configuring-a-positivessl-certificate-with-stud.html) for how to create a .pem file.

## Enjoy

I hope this article will help you to scale your Meteor app horizontally. If you have any issues, need clarification or would like to suggest a fix, don't hesitate to [contact me](https://twitter.com/arunoda) or add a comment below.
