---
layout: blog
title: "Docker, The Container War and Meteor"
category: blog
summery: "In this article I will try to summarize what's happening in the Docker community right now and what’s coming. After that, I will show you how Meteor fits with Docker."
---

I hope you have heard about [Docker](https://www.docker.com/) or you are already using it in production. In this article I will try to summarize what's happening in the Docker community right now and what’s coming. After that, I will show you how Meteor fits with Docker. (I'll talk a bit about Galaxy too.)

## What is Docker?

![Docker Logo](https://cldup.com/4P9pfv_Txb.png)

Before we begin, let me tell you a bit about Docker. You can think of Docker as a very lightweight virtual machine runtime. With Docker, you can run a set of different apps and services completely isolated from each other. That means each of these apps is running inside a clean operating system with its own file system. It's very efficient and does not add any considerable overhead.

Actually this is not a new thing and it has been around for years. It was previously known as the container technology and only system admins knew how to manage them. Linux's [LXC](https://linuxcontainers.org/) and Solaris's [zones](http://en.wikipedia.org/wiki/Solaris_Containers) are two examples. Docker makes it extremely simple to run and manage containers. That's why a lot of people started using containers to build amazing stuff with them.

> There is a lot of cool stuff you can do with Docker. If you’d like to jump start into Docker and [practice using Docker](https://bulletproofmeteor.com/architecture/docker-and-meteor) in production, look at the [Docker lesson](https://bulletproofmeteor.com/architecture/docker-and-meteor) on BulletProof Meteor. You can get a solid foundation for Docker in under 3 hours. 

## The Container War

Docker is just the core technology behind the Docker movement. But there are a lot other tools for managing docker runtime and simplifying things like clustering and service discovery.

Almost every major player in the technology world is trying to build tools around Docker. They are trying to make things simple while taking some ownership in the community. Sometimes, they seem to work together, but sometimes they seem like they are competing with each other. That's why I call this the Container War. Competition is always a good thing, so this is good for the community in general. 

There are three major camps in this war. Let me tell you a bit about each. 

### 1. Docker Inc.

Docker Inc is the company who originally created Docker and is currently maintaining it. They have a bunch of tools and services to make Docker deployments simple and manageable. 

Here are they:

#### Docker Hub
This is the central Docker [registry](https://registry.hub.docker.com/) where all the core Docker images exist. There are plenty of docker images in this repository, including official images from operating systems to databases to software frameworks. 

You can push your own images and you can even have private images only you and your team can access. 

#### Docker Machine
With [Docker Machine](https://github.com/docker/machine), you can configure a server or your desktop as a production Docker runtime. Take a look at the following command:

~~~
docker-machine create -d digitalocean --digitalocean-access-token=secret staging
~~~

It will create a new server on DigitalOcean and configure it as a production-quality Docker runtime. In the above command `digitalocean` is the driver used to create a Docker Machine. There are plenty of drivers including other cloud server providers and virtualization tools.

#### Docker Swarm
[Docker Swarm](https://github.com/docker/swarm/) can group a set of Docker runtimes together and control them as a single Docker runtime. This is how Docker Inc manages a set of Docker runtimes as a cluster. It plays nicely with Docker Machine.

#### Docker Compose
With [Docker Compose](https://github.com/docker/compose), you can define your application architecture. Then, with a single command, you can deploy Docker containers into Docker.

All of the above tools and services are built so that they talk to each other. For example, you can:

* Configure a set of EC2 servers with Docker Machine.
* Then you can make a cluster of those EC2 servers using Docker Swarm.
* Finally, you can deploy your apps into the cluster using Docker Compose.

Even though, this seems like an awesome set of technologies, there is one more service Docker Inc will create next. It's a service to connect and manage all of the above pieces together. 

Let's say you want to deploy a new version of your app. Okay, just push it to GitHub and then the Docker service will take care of deploying it to your cluster. When your app needs more resources, it'll create new servers with Docker Machine and add them to the cluster.

### 2. CoreOS

![CoreOS Logo](https://cldup.com/s5Dje9Q3RK.png)

[CoreOS](https://coreos.com/) also plays a huge role in the Docker community. Their service discovery solution Etcd is very famous in the community.

Basically, CoreOS is a minimal Linux distribution, which treats containers as first-class citizens. If you want to run a piece of software inside CoreOS, then you need to run it via a Docker container. It also does security updates and other updates automatically and you don't need to worry about updating them manually. For that, It uses the same technology that Chrome uses to update the browser in the background. CoreOS calls this feature as [Core Update](https://coreos.com/products/coreupdate/).

CoreOS tries to fix the clustering problem with [Fleet](https://coreos.com/using-coreos/clustering/) and [Etcd](https://github.com/coreos/etcd). You can think of Fleet as a cluster-wide init system. You can define how many instances of your app need to run in the cluster. Then Fleet will take care of deploying them and try to re-deploy them if any of them go down. It uses Ectd as a communication hub for all its activities.

There is also a cloud service to manage CoreOS updates. CoreOS also has a their own Docker Registry. Recently they started to develop a kind of minimal version of Docker called [Rocket](https://coreos.com/blog/rocket/), which focusing on simplicity and security. Anyway, CoreOS seems to support both Docker and Rocket.

You can also use Core Update to update your apps in the background. Currently, configuring it is not that simple. But CoreOs will make it simpler and possibly it will build a service to make this very straightforward.

### 3. Google's Kubernetes

![Kubernetes Logo](https://cldup.com/XQoM4kTpdm.png)

I think Google has a long history with containers, since most of the internal Google services run as containers. [Kubernetes](http://kubernetes.io/) is the Google's solution for managing a Docker cluster. It has some similarities with Fleet from CoreOS but it provides a high-level API for defining the deployment architecture. It also uses Etcd.

Kubernetes can manage a cluster of servers on most the cloud platforms. We can even deploy and test it locally. 

Interestingly but not surprisingly, Google's Compute Engine has the [built-in support](https://cloud.google.com/container-engine/) for Kubernetes. So, you don’t have to worry about managing it yourself. That might be the main reason why Google started building Kubernetes in the first place.

## What about Docker and Meteor?

Since everyone is moving to Docker, we should try to go with that too. Moving to Docker is not as simple as making a Docker image for your app or running it inside a container. We need to get the design concepts from the Docker community and apply them to our apps. Let me introduce a few of them:

### First, Let's Dockerize Our App
First we need to convert our app into a Docker image. Alternatively, we could use a Docker container to run our bundled Meteor app. Both of these can be done with our [MeteorD](https://registry.hub.docker.com/u/meteorhacks/meteord/) Docker image. Give it a try.

### Multiple Versions of Your App
Since we are starting and stopping apps in a snap, it's possible to have two different versions of our app running at the same time. So, we need to design our application and database to support that. We even need to configure load balancers for that. 

Anyway, that doesn't mean we need to expect both version 0.0.1 and version 9.8.0 of our app to be running at the same time, but it's possible to run both 9.7.0 and 9.8.0 at the same time.

### No More Graceful Shutdowns
Sometimes, we can watch for kill signals and gracefully shutdown our app after completing some cleanup tasks. But in the container world, it's possible for an app to get killed without there being any time to do anything. So, you need to design your app to take this into account. Try to use the [crash only software](http://en.wikipedia.org/wiki/Crash-only_software) pattern. At first this will seem to be hard, but later you'll like it very much.

### Think Twice about Online Migrations 
Some of us use online migrations to change the database schema and invoke other tasks. Now in the container world we might be running different versions of the app and they could get killed and rebooted at any time. So, you need to think twice when doing online migrations or migrations in general.

You may want to avoid migrations by using a flexible database schema. MongoDB provides a good foundation for that since we don't need to have a pre-defined schema.

### Don’t Persist Data Locally

Now we are running our app as a Docker container. We’ve a persistable file system inside a container. But when the container is removed, it is removed too. 

We may also be running a lot of copies of the same app. We might kill one of them and move it to another place but we’ll lose the persisted data. 

So, we should avoid persisting locally. We can instead use a database like CouchDB to store files or try to store it to a cloud service like AWS S3. Even MongoDB has support for storing files via GridFs.

### Use Microservices

Since we can run a lot of containers very easily with Docker, we don't need to build a big monolithic app anymore. Instead, we can divide our app up into tiny isolated services and maintain them separately. Then we can get them to interact with each other via DDP. This the reason why we've created [`meteorhacks:cluster`](https://github.com/meteorhacks/cluster). I'll talk more about Cluster and why we built it in another article.

For now, you can follow these resources to learn more about microservices in Meteor.

* [Cluster documentation on Microservices](https://github.com/meteorhacks/cluster#microservices)
* [Microservices lesson on BulletProof Meteor](https://bulletproofmeteor.com/architecture/microservices-with-meteor-and-ddp)

## Where Does Galaxy Fit in?

> This is not an official announcement or update about Galaxy. It's just my personal comments based on what I've heard so far.

Even though Docker simplifies a lot things, it does not make things super simple. For example, Heroku is still the easiest way to deploy apps in the cloud.

Galaxy will be built on top of Kubernetes and you'll be able to deploy your app into a Kubernetes cluster with a single command, just like you did with `meteor deploy`. Basically it's a kind of managed Heroku build on top of a cluster of servers provided by you. It'll definitely have Meteor-specific features and related services.

I hope Galaxy will allow us to customize how it works via some kind of Docker-related API or similar. With that we could customize a lot of things inside it. Maybe we could provide native support for `meteorhacks:cluster` inside Galaxy and monitor it with [Kadira](https://kadira.io) :D

---

So, this is what I personally think about Docker and how we can integrate it with Meteor. This is purely based on the resources available on the internet and based on some of my predictions. 

In the next article, I'll talk more about microservices and how our Meteor Cluster works with Docker. I'll also try to elaborate on why we made some crucial decisions like choosing MongoDB as a discovery backend instead of something like Etcd.

---


> If you’d like to jump start into Docker and [learn how to use Docker](https://bulletproofmeteor.com/architecture/docker-and-meteor) in production, look at the [Docker lesson](https://bulletproofmeteor.com/architecture/docker-and-meteor) on BulletProof Meteor. You can get a solid foundation for Docker in under 3 hours. 