---
layout: blog
title: Complete NPM integration for Meteor
category: blog
summery: 'Npm support for Meteor comes to the light from version 0.6.0. But it gives complete NPM access to packages only. If you need to use npm modules like redis, aws-sdk, colors, winstoon in your app, you are out of luck.<br>I could able to find a solution for it. Now with this, we have access to 30000+ npm modules'
---
Npm support for Meteor comes to the light from [version 0.6.0](http://www.meteor.com/blog/2013/04/04/meteor-060-brand-new-distribution-system-app-packages-npm-integration). But it gives complete NPM access to packages only. If you need to use npm modules like [redis](https://npmjs.org/package/redis), [aws-sdk](https://npmjs.org/package/aws-sdk), [colors](https://npmjs.org/package/colors), [winston](https://npmjs.org/package/winston) in your app, you are out of luck.

Of course,  you can wrap npm modules in a package or use if it is available on atmosphere, but that's kind a hard.

## Here comes the solution

<iframe src="http://ghbtns.com/github-btn.html?user=meteorhacks&amp;repo=npm&amp;type=watch&amp;count=true&amp;size=medium" allowtransparency="true" frameborder="0" scrolling="0" width="90px" height="30px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=meteorhacks&amp;repo=npm&amp;type=fork&amp;count=true&amp;size=medium" allowtransparency="true" frameborder="0" scrolling="0" width="90px" height="30px">
</iframe>

I could be able to trick meteor a bit, and now we can have complete access to npm modules from Meteor. Here's how you can do it. It's pretty simple.

## Adding NPM support to your app

### Via Official Meteor Packaging System

    meteor add meteorhacks:npm

### Via Meteorite

    mrt add npm

### Create packages.json file 

Then create `packages.json` file on your project root. 

> Note that it is `packages.json`, not `package.json` 

Now define npm packages you want, with the absolute package versions as shown below.

    {
      "redis": "0.8.2",
      "github": "0.1.8"
    }

### Let's use a npm module

Normally you are loading core npm modules using `Npm.require()`, But in order to load modules from your `packages.json` you need to use `Meteor.npmRequire()`

Let's get some `gists` using the `github` npm module.

    var Github = Meteor.npmRequire('github');
    var github = new Github();

    github.gists.getFromUser({user: 'arunoda'}, function(err, gists) {
      console.log(gists);
    });

> `Meteor.npmRequire()` does not comes with the `npm` package you've installed via `mrt`. If so, please use `Meteor.require()` instead.

## Using npm modules within Meteor APIs

Meteor server side API's are executed synchronously. But most of the npm modules work asynchronously. Although we can load NPM modules to meteor, it is so hard to use them inside Meteor APIs like methods, publications, permissions.

This is not a very big problem. I could be able to fix this by building a set of [Async Utilities](https://github.com/arunoda/meteor-npm#async-utilities).

See the following example where I used a npm module inside a Meteor Method

    if (Meteor.isClient) {
      getGists = function getGists(user, callback) {
        Meteor.call('getGists', user, callback);
      }
    }

    if (Meteor.isServer) {
      var GithubApi = Meteor.npmRequire('github');
      var github = new GithubApi({
          version: "3.0.0"
      });

      Meteor.methods({
        'getGists': function getGists(user) {
          var gists = Async.runSync(function(done) {
            github.gists.getFromUser({user: 'arunoda'}, function(err, data) {
              done(null, data);
            });
          });

          return gists.result;
        }
      });
    }

## Using meteor bundle and [demeteorizer](https://github.com/onmodulus/demeteorizer)

Modules you've added will be included in the bundled version(`meteor bundle`) automatically. 

> But if you've used a binary npm module, you need to re-install it manually. Just like you are doing it with `fibers`.<br>
>If you are using `demeteorizer`, then there is no problem.

## Meteor is now open for 30000+ npm modules

Today I bring 30000+ packages(modules) to Meteor. Use them and share your thoughts. I'm always open minded for new ideas.
