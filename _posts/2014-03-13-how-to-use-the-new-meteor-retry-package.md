---
layout: blog
title: "How to Use The New Meteor Retry Package"
category: blog
summery: "Since Meteor version 0.7.0, it comes with a new package called `retry`, which allows us to build a retry logic very easily. See how you can use it!"
--- 

If you are building a somewhat large Meteor application, you might be using at least a single HTTP/REST API or a third-party service. Sometimes these services fail due to several reasons, so we need to implement retry logic to complete our task.

Meteor 0.7.x comes with a nice package which helps us to build retry logic very quickly. It doesn't do much else other than help us timeout and try again correctly. It implements [exponential backoff](http://en.wikipedia.org/wiki/Exponential_backoff) into the algorithm and allow many other [options](http://goo.gl/wMfxjg). It is a general purpose package and can be used with both client and server.

## Simple Demo
First add the retry package to your app. 

    meteor add retry

Let's how we can use `retry` package to get some data from an HTTP endpoint. This is implemented inside the _**client**_.

    var retry = new Retry({
      baseTimeout: 100, //starting from 100ms and starting
      maxTimeout: 1000, //max timeout will be 1 sec 
    });
    var retries = 0;

    function getMeteorHacks() {
      HTTP.get('http://meteorhacks.com',function(err, res) {
        if(err) {
          if(retries < 5) {
            console.log('retring due to: ', err.message);
            retry.retryLater(++retries, getMeteorHacks);
          } else {
            console.log('failed after maximum retries: ', err.message);
          }
        } else {
          console.log(res.content);
        }
      });
    }

    getMeteorHacks();


##  Retrying Within a Meteor Method

The current version of the `retry` package (which comes with 0.7.1.2) is not Fiber aware, but there is already a fix in the `devel` branch. In the meantime, we can use a simple workaround to enable Fiber support. See, how we can use the retry package inside a Meteor method.

    Meteor.methods({
      "getSiteCopy": function() {
        var Future = Npm.require('fibers/future');
        var retry = new Retry({
          baseTimeout: 100, //starting from 100ms and starting
          maxTimeout: 1000, //max timeout will be 1 sec 
        });
        var retries = 0;
        var f = new Future();

        var getMeteorHacks = function () {
          try {
            var res = HTTP.get('http://meteorhacks2.com');
            f.return(res.content);
          } catch(ex) {
            if(retries < 5) {
              console.log('retring due to: ', ex.message);
              retry.retryLater(++retries, getMeteorHacks);
            } else {
              console.log('failed after maximum retries: ', ex.message);
              f.throw(ex);
            } 
          }
        }

        //you don't need to use this in the future Meteor versions  
        //Fiber supported version is already in the devel branch
        getMeteorHacks = Meteor.bindEnvironment(getMeteorHacks, function(err) {
          throw err;
        });

        getMeteorHacks();
        return f.wait();
      }
    }); 

I wish, we can come up with a much simpler API to use this inside Meteor methods. But this is something we can use at this stage too, especially for package authors.