---
layout: blog
title: "The Meteor Packaging System – Understanding Versioning"
category: blog
summery: "Meteor released version 0.9 this week and everyone is busy migrating their apps and packages. So, I am not going to talk about things we already know. But this is an story, which no one has told before :)"
---

Meteor released version 0.9 this week and everyone is busy migrating their apps and packages. So, I am not going to talk about things [we already know](https://www.discovermeteor.com/blog/updating-to-090/). But this is a story, which no one has told before :)

![](https://i.cloudup.com/2WvCX6UE6d.png)

## Intro
Before we begin, we need to understand why Meteor released a packaging system and how it differs from Meteorite.

Meteorite is tightly coupled to Git, it's not baked into the Meteor core and it does not support weak dependencies. These are some of the few things the new packaging system solves. But, versioning support is the heart of the new packaging system and a lot of decisions have been taken around that.

### Strict Semver Focus

Meteor uses [semver](http://semver.org) as the backbone of its versioning support. But unlike npm (which also uses semver), the Meteor packaging system only allows a single version of a package to live inside an app. No matter what your app's dependency tree is, Meteor will resolve all packages into a single version or it throws an error.

### What is Semver?

[Semver](http://semver.org) is short for “semantic versioning”. It's a guideline for how to version your packages. It's pretty simple. Let's see.

Basically, there are three numbers for a version:

    major.minor.patch

For example:

* 1.2.8
* 3.5.2

This is what they mean:

* patch - mostly bug fixes
* minor - minor feature release with a backward compatibility api
* major - major releases. It's does not need to be backward compatible between major versions.

Semver has some other features, but now you know more than enough semver to continue with our story.

## How Meteor Uses Semver

Say there are a couple of packages, like below, in the Meteor packaging repository (not inside your app):

* arunoda:foo@1.0.0
* gadi:bar@1.0.0 - depends on arunoda:foo@1.0.0

Now, let's say you have added `gadi:bar` into your app with:

    meteor add gadi:bar

If you look at the `.meteor/versions` file, you can see the following versions from the above two packages:

* arunoda:foo@1.0.0
* gadi:bar@1.0.0

### But now I need to use arunoda:foo@1.4.0 directly inside my app

Some time later, you want to use `arunoda:foo` directly in you app. But you want to use version 1.4.0. You type:

    meteor add arunoda:foo@1.4.0

Now if you look at the `.meteor/version` file, you will have the following versions:

* arunoda:foo@1.4.0
* gadi:bar@1.0.0

Wait, but `gadi:bar` asked for `arunoda:foo` at version 1.0.0, right?

Actually, `gadi:bar` mentioned that 1.0.0 is the  **minimum version** that it depends on for `arunoda:foo`. According to semver, minor releases must be backward compatible. Since 1.4.0 is a minor release compared with 1.0.0, `gadi:bar` should work with `arunoda:foo@1.4.0`.

### Awesome! Now I want to use arunoda:foo at version 2.0.0

`arunoda:foo` is a really cool project and there is a lot of development going on. `arunoda:foo@2.0.0` is the latest release and you want to use it in your app.

    meteor add arunoda:foo@2.0.0

But your apps will fail with a message like this:

    conflict: arunoda:foo@1.4.0 vs arunoda:foo2.0.0

That's because `arunoda:foo@2.0.0` is a major release compared with `arunoda:foo@1.4.0`, which already exists in our app. So, `gadi:bar` can't work with `arunoda:foo@2.0.0` according to semver. That's why Meteor throws an error.

Now, you can either remove `gadi:bar` or ask Gadi to update the package for `arunoda:foo@2.0.0`.

## Note to Package Authors

**You must stick to semver.**

Because of the tight integration with semver, package authors must follow semver strictly. If not, they could break the packaging system. Let's see some cases.

### Introducing Version Playground
[Version Playground](http://version-playground.meteor.com/) is a little tool where you can experiment with new packaging systems and learn how versioning works.

It's backed by the same packages Meteor uses to resolve dependencies. So it's very similar to how the actual packaging system works. Visit the version playground: <http://version-playground.meteor.com/>

See how we can use it:

<iframe width="640" height="480" src="//www.youtube.com/embed/dUBBnBOW7uc" frameborder="0" allowfullscreen="1">
</iframe>

Now, here's the fun part. We are going to break the packaging system and you will learn how it happened. Then you can take action to prevent such scenarios.

Okay, let's begin.

### 1. Not Following the Semver Specification

Semver is new to some package developers. Previously, I also didn't follow it. If you don't follow semver, you might be the person who breaks the packaging system. See how:

<iframe width="640" height="480" src="//www.youtube.com/embed/usCR1s3B40k" frameborder="0" allowfullscreen="1">
</iframe>

### 2. Using Exact Dependencies

By mentioning `arunoda:foo@1.0.0`, you are specifying 1.0.0 as the minimum version. But you can ask for exactly version 1.0.0:

    arunoda:foo@=1.0.0

This seems like a nice feature! But this is another way to break the packaging system:

<iframe width="640" height="480" src="//www.youtube.com/embed/8niFlwNmlw8" frameborder="0" allowfullscreen="1">
</iframe>

### 3. Releasing Major Versions too Often

Your package development is going super fast. So, you might start releasing new major versions too often. But they are still backward compatible.

In a situation like this, all the packages depending on your package also need to be updated for your major releases. Which is very hard to do in practice, unless you send Pull Requests to all those packages.

If this doesn’t happen, your newest releases won't be used with these apps.

## Simple Guidelines for Versioning

I try to follow these guidelines for my packages:

* Use 1.0.0 for your existing packages (since they’re used in production).
* For new packages, start with 0.1.0.
* Be strict with the semver guidelines for major, minor and patch releases.
* Do pre-releases with labels like 1.1.0-alpha, 1.1.0-beta, 1.1.0-rc
* (this is how the semver specification talks about pre-releases).

> When major, minor, and patch are equal, a pre-release version has lower precedence than a normal version. Example: 1.0.0-alpha < 1.0.0. Precedence for two pre-release versions with the same major, minor, and patch version MUST be determined by comparing each dot separated identifier from left to right until a difference is found as follows: identifiers consisting of only digits are compared numerically and identifiers with letters or hyphens are compared lexically in ASCII sort order. Numeric identifiers always have lower precedence than non-numeric identifiers. A larger set of pre-release fields has a higher precedence than a smaller set, if all of the preceding identifiers are equal. Example: 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0.

* and don't forget to follow the guides on <http://semver.org> too.
* never publish a package with exact dependencies in it

---

That's the story for today :)

I hope you've enjoyed it. Now it's time to take some action. Start building packages and apps for the Meteor packaging system without breaking it :)

Note: All of our packages are available under the [meteorhacks](http://atmospherejs.com/meteorhacks/?q=meteorhacks) namespace.

---

<div style="text-align:center">
  <a href="https://kadira.io/?utm_source=meteorhacks&utm_medium=banner&utm_term=kadira&utm_content=footer&utm_campaign=packagin-system-article">
    <img 
      alt="Kadira - Performance Monitoring for Meteor" 
      src="https://i.cloudup.com/t_cMrp-aq0.png"
    />
  </a>
</div>


