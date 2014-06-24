---
layout: pro-meteor-post
title: Deploy a Meteor App into a Server or a VM
category: prometeor
summery: "In this section, I'll show you how to deploy your Meteor application into a server from AWS Ec2, Digital Ocean, Joyent or from any other cloud provider."
hide: true
section: pro-meteor
---

In this article, I'll show you how to deploy your Meteor application into a server from [AWS EC2](http://aws.amazon.com/ec2/), [Digital Ocean](https://digitalocean.com/), [Joyent](http://www.joyent.com/) or from any other cloud provider.

## Create the Server/VM

You need to create a server or vm from your cloud provider. It needs to be either Ubuntu or SmartOS.

You can use password based authentication or private key based authentication.

## Meteor Up

We are using [Meteor UP](https://github.com/arunoda/meteor-up) to deploy and setup the server. First install Meteor Up with:

~~~
npm install -g mup
~~~

> If you are using password based authentication, you needs to install sshpass utility. Follow [these steps](https://gist.github.com/arunoda/7790979) for that.

Then go to your project and create a directory called `.deploy`. Go into that directory. apply following code:

~~~
mup init .
~~~

This will create configuration files for the deployment. `mup.json` is the main configuration file and follow the comments in it to modify it. Sample `mup.json` file is shown below.

~~~js
{
  // Server authentication info
  "servers": [
    {
      "host": "hostname",
      "username": "root",
      "password": "password"
      // or pem file (ssh based authentication)
      //"pem": "~/.ssh/id_rsa"
    }
  ],

  // Install MongoDB in the server, does not destroy local MongoDB on future setup
  "setupMongo": true,

  // WARNING: Node.js is required! Only skip if you already have Node.js installed on server.
  "setupNode": true,

  // WARNING: If nodeVersion omitted will setup 0.10.28 by default. Do not use v, only version number.
  "nodeVersion": "0.10.28",

  // Install PhantomJS in the server
  "setupPhantom": true,

  // Application name (No spaces)
  "appName": "meteor",

  // Location of app (local directory)
  "app": "/Users/arunoda/Meteor/my-app",

  // Configure environment
  "env": {
    "PORT": 80,
    "ROOT_URL": "http://myapp.com",
    "MONGO_URL": "mongodb://arunoda:fd8dsjsfh7@hanso.mongohq.com:10023/MyApp",
    "MAIL_URL": "smtp://postmaster%40myapp.mailgun.org:adj87sjhd7s@smtp.mailgun.org:587/"
  },

  // Meteor Up checks if the app comes online just after the deployment
  // before mup checks that, it will wait for no. of seconds configured below
  "deployCheckWaitTime": 15
}
~~~

> Make sure to set the path for `app` as `../`

Then you need to setup your server for the deployment. Apply `mup setup` and wait until it get completes.

![Setup a Server for Meteor Deployment with Meteor Up](https://i.cloudup.com/EUvJbAFS9J.png)

Then you can deploy your app. For that apply `mup deploy` and wait until it get completes.

![Deploying a Meteor app into a yourown server](https://i.cloudup.com/Pb-6Zr29fd.png)

After that, whenever you need to deploy again simply do `mup deploy`.

There are more goodies comes with [Meteor Up](https://github.com/arunoda/meteor-up). Please refer to the Meteor Up [documentation](https://github.com/arunoda/meteor-up) for more information.
