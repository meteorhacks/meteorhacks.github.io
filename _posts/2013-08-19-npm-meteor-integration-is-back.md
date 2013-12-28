---
layout: blog
title: NPM Meteor Integration is Back for Meteor 0.6.5
category: blog
summery: "A few months ago, I introduced a small hack which allows you to use any NPM module with your Meteor app. Unfortunately it doesn't play nice with Meteor version 0.6.5. Here comes the fix."
---

A few months ago, I introduced a [small hack](http://meteorhacks.com/complete-npm-integration-for-meteor.html) which allows you to use any NPM module with your Meteor app. It's distributed as a [smart-package](https://atmosphere.meteor.com/package/npm) via Atmosphere.

Unfortunately, if you've upgraded your app to meteor 0.6.5, you might have noticed that `npm` smart-package does not work anymore. Let me explain why it doesn't work, in a few minutes.

Fortunately, I tricked Meteor again and here comes the `meteor-npm` version [0.2.0](https://github.com/arunoda/meteor-npm)

> Just update your project with `mrt update` and things should work, as it was earlier.

## Now, things have gotten even better!

If you are working with multiple Meteor apps and use this NPM integration, you might have seen that when switching projects, Meteor will re-install all the NPM modules. That's a bit of a headache.

If you are not a fan of `meteorite`(I really don't know why!) you couldn't have used this hack too.

Because of these reasons, I've worked on a new distribution channel via `NPM`, which fixes the above issues. 

Let's see how to use it.

* First you need to remove `npm` smart-package if you've used it
* `mrt remove npm`
* Install this tool via npm (you've to do this once) 
* `sudo npm install -g meteor-npm`
* Then run `meteor-npm` tool inside your project

That's it :)

Now you can declare NPM modules in `packages.json` as you did previously. This works with `meteor run`, `meteor deploy` and `meteor bundle` too. Should work with `demeteorizer` as well.

Server side API is also the same.

> You need to add `packages/npm` to the version control, otherwise you've do the above process again after a checkout and re-declare modules in `packages.json`

## Why NPM failed with 0.6.5

This is how older `npm` smart-package worked.

* When the package loads, it looks for `packages.json` in your project root and load all the NPM modules declared.
* So, if you've made any changes to `packages.json`(or any other file), all the packages get reloaded(including `npm`).
* Then your, newly re-declared NPM modules will get loaded

But in 0.6.5, Meteor got lot better. It only reloads a package if any file (tracked with `api.add_files`) in the package gets changed. 

Since `./packages.json` is not a part of the `npm` package, it doesn't get reloaded. Hence, newly declared NPM modules will not be loaded.

## The Fix

This [single line](https://github.com/arunoda/meteor-npm/blob/master/package.js#L25) fixes the issue. :)

    api.add_files(['index.js', '../../packages.json'], 'server');

I had to do few other changes to get this works perfectly across all the meteor versions. [See how I did them](https://github.com/arunoda/meteor-npm/blob/master/package.js).

Hope you guys love this fix. And you can upgrade to 0.6.5 today :)

> Thank You, [Aloka Gunasekara](https://twitter.com/alokag) for editing the article.