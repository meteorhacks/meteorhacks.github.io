---
layout: pro-meteor-post
title: Deploy a Meteor App into a Server or a VM
category: prometeor
summery: "In this section, I'll show you how to deploy your Meteor application into a server from AWS Ec2, Digital Ocean or from any other cloud provider."
hide: true
section: pro-meteor
---

In this section, I'll show you how to deploy your Meteor application into a server from [AWS EC2](http://aws.amazon.com/ec2/), [Digital Ocean](https://digitalocean.com/) or from any other cloud provider.

## The Easiest Way

There are few command line tools, which allows you to deploy to a server very easily. See following tools.

* [meteor.sh](https://github.com/netmute/meteor.sh)
* [meteor-deployer](https://github.com/xenolf/meteor-deploy)

Both these tools very easy to use and with few simple commands you can deploy and setup your Meteor app into your server.

## The Correct Way

Although above tools deploy Meteor very easily. They are not perfect. If you are looking for a production quality Meteor deployment setup, you should look for following requirements.

> I assume you are using a [hosted MongoDB](https://www.mongohq.com/home) database with your app

* [Properly Install Meteor, Node](http://julien-c.fr/2012/10/meteor-amazon-ec2/)
* Automatically restart if crashed (use [forever](https://github.com/nodejitsu/forever))
* [Step Down Prividelges](http://goo.gl/iKRAXK)
* [Daemonize the app and configure to start when server restarted](http://goo.gl/opBtmf)
* Monitor app freezes and restart if needed 
* Easy way to manage configuration with Environmental Variables and settings.json
* [Log Management](http://meteorhacks.com/logging-support-for-meteor.html)
* [CPU, Memory and other system metrics tracking](http://mmonit.com/monit/)
* Support for Binary NPM modules ([try git based deployments](http://meteorhacks.com/how-meteor-uses-node.html))
* Git Based Deployment 

This is a huge list of task and if you are trying to do it yourself, I've added links which helps you to get it setup.

> We can help you on this with our **Managed Meteor Deployment** service. Talk to us.