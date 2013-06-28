---
layout: blog
title: Logging Support for Meteor with Winston
category: blog
summery: "With this article, I will show you how use nodejs winston logging module with meteor. And I'll show you how to export logs to some external service without any hassle."
hide: false
---

Logging is a one of the best practices to follow if you are trying to build any kind of production quality application. When it's come to Meteor, there is no official logging framework exists yet. And it is quite okay since it has a good package handling system, so we can always use some third party packages for requirements like this.

When I search about logging for meteor, the most popular one seems to be [observatory](https://github.com/jhoxray/observatory). It is something specially build for meteor, and it has a nice GUI.

But I didn't like its approach and I prefer of having a traditional logging framework. And I wouldn't like to build something my own either. Finally I decided to go with [winston](https://github.com/flatiron/winston); a popular nodejs logging module.

## Why I choose winston

These are my requirements.

* I simply need to track some events on the server side
* I don't want to process or view logs inside the app
* I prefer integrating with a cloud service like [papertrail](https://github.com/flatiron/winston) or [loggly](http://loggly.com/) for analyzing logs

And winston was the perfect match for this

* It has all the requirements I need
* It has [transports](https://github.com/flatiron/winston/blob/master/docs/transports.md) for several log processing services and tools
* It is widely used and mature

## How I used winston with Meteor

It is quite simple. All I had to do is to install [`npm`](https://atmosphere.meteor.com/package/npm)  smart package from the atmosphere and just define the dependencies.

So after I've added `npm` package, I created `packages.json` file and specify dependencies as below

    {
      "winston": "0.7.2"
    }

I wanted to log users when get connected and disconnected from the meteor app. Here is how I achieve that with winston.
> This is not the actual requirement(s), but used only for demonstration purpose


    if(Meteor.isServer) {
      //creating a global server logger
      logger = Meteor.require('winston');

      Meteor.publish('user', function() {
        var userId = this.userId;
        logger.info('user connected', {userId: userId});

        this.ready();
        this.onStop(function() {
          logger.info('user disconnected', {userId: userId});
        });
      });
    }

    if(Meteor.isClient) {
      Meteor.subscribe('user');
    }

So, when a user get connected or disconnected, it simply does a nice console output like below.

![Logging Support for Meteor](http://i.imgur.com/9FUSoHY.png)

## Extending Winston

Simply printing messages to the console is not actually what I wanted. I wanted send these logs to some log processing service(winston treat these as a transport) and analyze my logs there.

Fortunately winston has [a ton of different transport methods](https://atmosphere.meteor.com/package/npm), including mongo, riak and hosted solutions like papertrail and loggly.

Using them also so simple with meteor. Just simply define transport module using `packages.json` and use it.

#### let me show you how I used papertrail transport for winston.

Define `winston-papertrail` in `packages.json` as shown below

    {
      "winston": "0.7.2",
      "winston-papertrail": "0.1.4"
    }

Add papertrail transport for winston

    var Papertrail = Meteor.require('winston-papertrail').Papertrail;
    logger.add(Papertrail, {
      host: "logs.papertrailapp.com",
      port: 20670, //this will be change from the papertrail account to account
      logFormat: function(level, message) {
          return '[' + level + '] ' + message;
      },
      inlineMeta: true
    });

That's it. Now I can see my logs in papertrail(in realtime) without any hassle :)

![Meteor Logs showing in Papertrail](http://i.imgur.com/E3yx327.png)

So give it a try for your app. I'm sure you are gonna like it.

> I've no any affiliation with papertrail except for using them for several apps. It is the easiest and the coolest log processing service I could have found. But it is also quite expensive compared with others.