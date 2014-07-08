---
layout: pro-meteor-post
title: Fibers, Event Loop and Meteor
category: prometeor
summery: "Understanding Fibers is really important for you to understand Meteor Well. This article shows, everything you need know about Fibers."
section: pro-meteor
---

Meteor's use of [Fibers](https://github.com/laverdet/node-Fibers) allows it to do many great things. In fact, Meteor's popularity may be a direct result of its use of Fibers, though you wouldn't know it without a deep understanding of Meteor's internals.

It's a bit hard to understand how Fibers works, and how it relates to Meteor. But once you do, you'll have a better understanding of how Meteor works internally.

>Fibers was not listed in the original Pro Meteor topic list. But since some of you have asked about it, I've decided to write this article. So, here we go.

## Event Loop and Node.js

Meteor is built on top of Node.js, so we can’t forget the Event Loop. Node.js runs on a single thread, and thanks to the Event Loop and event-driven programming, program execution isn’t blocked by I/O activities (network and disk, mainly). Instead, we provide a callback function that is run after the I/O completes, and the rest of the program continues to run.

Here's a psuedo-code example showing two different tasks.

    // Call functions.
    fetchTwitterFollowers('arunoda');
    createThumbnail('/tmp/files/arunoda.png', '/opt/data/arunoda.thumb.png');

    // Define functions.
    function fetchTwitterFollowers(username) {
      TwitterAPI.getProfile(username, function(){
        Model.setFollowers(profile.username, profile.followers, function() {
          console.log('profile saved!');
        });
      });
    }

    function createThumbnail(imageLocation, newLocation) {
      File.getFile(imageLocation, function(err, fileData) {
        var newImage = ImageModule.resize(fileData);
        File.saveFile(newLocation, function() {
          console.log('image saved');
        });
      });
    }

Now let's see how the above two functions get executed over time.

![Understanding Event Loop](https://i.cloudup.com/VmluSV7rBp.png)

>Tasks in `fetchTwitterFollowers` are marked in green, and tasks in `createThumbnail` are marked in orange.
>Dark colors show CPU time, and light colors show I/O time.
>
>The **Blue Bar** shows waitTime in the queue and the **Red Bar** shows idleTime.

### Observations

The diagram above shows us a few interesting things. First, there is no particular program execution order. I/O activities can take any amount of time to complete, and they won't block the program from executing other tasks. For example, `ImageModule.resize` does not need to wait for `Twitter.getProfile` to be completed before it can be run.

Second, CPU-bound activities _do_ block program execution. In the middle of the diagram you can see a blue bar where `Model.setFollowers` cannot get started even though `TwitterAPI.getProfile` has completed. `ImageModule.resize` is the reason for that. It is a CPU-bound task, so it blocks the Event Loop. As mentioned earlier, Node.js runs in a single thread. That's why Node.js is not the best choice for CPU-bound activities like image processing and video conversion.

You can also see there are three red bars indicating idleTime. If our app had more functionality, it could use this time to execute it.

## Fibers

Now you know how the Event Loop works, and how efficient it is. But there is a problem: Callbacks. Callbacks make Node.js code difficult to reason about (some describe it as _**callback soup**_). Error handling and nested callbacks are uncomfortable to write, and their existence makes code difficult to maintain and scale. That's why some say Node.js is hard to learn (and use).

Luckily, several techniques exist to overcome this issue. [Fibers](https://github.com/laverdet/node-Fibers), [Promises](http://promisesaplus.com/), and [Generator-based coroutines](https://medium.com/code-adventures/174f1fe66127) are some of them.

Meteor uses Fibers, and implements APIs on top of it. But before going into it any further, let's see how Fibers works. See the diagram below.

![Understanding Fibers](https://i.cloudup.com/cO895VekjA.png)

Fibers provides an abstraction layer for the Event Loop that allows us to execute functions (tasks) in sequence. It allows us to write asynchronous code without callbacks. We get the best of both worlds--asynchronous efficiency with synchronous-style coding. Behind the scenes, Fibers takes care of dealing with the Event Loop.

Fibers is really good if you use it correctly (Meteor does it well). Also, the overhead caused by Fibers is negligible.

## How Meteor Uses Fibers

Meteor abstracts Fibers with its APIs, allowing you to write your app without callbacks. The best part is that you can write your code this way and be completely oblivious to Fibers. It _just works_.

Meteor creates a new Fiber for each and every request ([DDP](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md) Request) made from the client. By default, Meteor executes one request at a time for each client, meaning one Fiber for each client at a time. But you can change that.

Fibers is the one of the best reasons Meteor is so popular. Since it allows us to write Node.js apps without callbacks, it has attracted many developers who hated Node.js for that reason.

## How To Use Async Functions With Meteor

We can't satisfy 100% of our needs with Meteor's API--sometimes we need to use [NPM modules](http://meteorhacks.com/complete-npm-integration-for-meteor.html) to get things done. But how can we do this if we don't know how to use callbacks with Meteor?

For example, say you need to use the [Github](https://npmjs.org/package/github) NPM module to get your user's public profile. It needs to be done inside a Meteor method, and we need to return the profile from the method. Okay, let's try to implement this.

    var GithubAPI = Meteor.require('github');
    var ghapi = new GithubAPI({version: "3.0.0"});

    Meteor.methods({
      getProfile: function(username) {
        ghapi.user.getFrom({user: username}, function(err, profile) {
          // How to return?
        });

        // We need to return the profile from here.
      }
    });

We can't use callbacks like above. We can't return the profile to the client from the callback, because the Meteor method won't wait for the callback before returning. Now we need to learn how to deal with Fibers. Or do we?

Meteor foresaw this problem and provided us with a very simple API to get around it. It's not documented yet, but here's how you can use it.

> [meteor-npm](https://github.com/arunoda/meteor-npm) also comes with a set of [async-utilities](http://meteorhacks.com/improved-async-utilities-in-meteor-npm.html) to work with npm modules.

    function getUserProfile(req, callback) {
      ghapi.user.getFrom(req, callback);
    }
    var wrappedGetProfile = Meteor._wrapAsync(getUserProfile);

    Meteor.methods({
      getProfile: function(username) {
        return wrappedGetProfile({user: username});
      }
    });

The code above is simple to understand. We wrapped the `ghapi.user.get` method in a function, and called that function with `Meteor._wrapAsync` to make it Fibers aware. Now we can use it inside Meteor methods and other Meteor APIs.

If you know how [`bind`](http://goo.gl/Josco) works, you can do the wrapping in a single line as shown below.

    var wrappedGetProfile = Meteor._wrapAsync(ghapi.user.getFrom.bind(ghapi.user));

## Finally

Now you have a better knowledge of the Event Loop, Fibers, and how Meteor uses Fibers. And you know how to use asynchronous functions with Meteor using `Meteor._wrapAsync`. It's time to supercharge your app with this knowledge.

## Additional Notes

If you are looking to learn more about Fibers and related technology, please refer to the following great screencasts by [EventedMind](https://www.eventedmind.com/).

* [Introducing Fibers](https://www.eventedmind.com/feed/nodejs-introducing-fibers)
* [Using Futures](https://www.eventedmind.com/feed/nodejs-using-futures)
* [Meteor._wrapAsync](https://www.eventedmind.com/feed/meteor-meteor-wrapasync)
* [Understanding Event Loop Async and Fibers](https://www.youtube.com/watch?v=AWJ8LIzQMHY)

---------------

> Edited by [Jon James](https://twitter.com/jonjamz) (Head of Technology at [Writebot](http://writebot.com/))
