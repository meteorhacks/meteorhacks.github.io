---
layout: blog
title: Continuous Integration for Meteor Apps
category: blog
summery: "I've seen [few people asking](https://groups.google.com/forum/#!topic/meteor-talk/I9FwGAtzJs0) on how do Continous Integration with Meteor. So here is how you can do Continous Integration for your meteor apps with `laika`."
---

I've been working on [`laika`](http://arunoda.github.io/laika/) for last 2 months with support from the community, and we have [fixed lots of bugs](http://goo.gl/JD62U) and added some [crucial features](http://goo.gl/JD62U). Still laika is not perfect, but it is moving towards that. I've seen [few people asking](https://groups.google.com/forum/#!topic/meteor-talk/I9FwGAtzJs0) on how do Continous Integration(CI) with Meteor. So here is how you can do CI for your meteor apps with `laika`.

For this article, I'll show you how to enable laika based CI for meteor with two popular continuous integration services.([travis-ci](https://travis-ci.org/) and [codeship](https://www.codeship.io/)) If you are using some other service or a self hosted solution, look at the end of the article.

## Meteor CI on Travis-CI

Travis-CI is well known for their free Continuous Integration service for OpenSource projects. And they've recently launched their paid service for private repositories with <https://travis-ci.com>. Let's have a look at how to configure travis-ci for laika.

* First login to <https://travis-ci.org> and navigate to <https://travis-ci.org/profile> 
* For private repositories use <https://travis-ci.com> Instead 
* enable travis support for your project

![travis-ci support for meteor apps](https://github-camo.global.ssl.fastly.net/852c1132dc2af04ff1557d7df31f04a5aec1eec6/687474703a2f2f692e696d6775722e636f6d2f34304c32436e552e706e67)

* then create `.travis.yml` file in your project root as shown below

Add following content to `.travis.yml`

    language: node_js
    node_js:
      - "0.10"
    before_install:
      - "curl -L http://git.io/3l-rRA | /bin/sh"
    services:
      - mongodb
    env: 
      - LAIKA_OPTIONS="-t 5000"

I've added travis-support for [hello-laika](https://github.com/arunoda/hello-laika) project as an example.

* [Source Code for hello-laika](https://github.com/arunoda/hello-laika)
* [Travis CI page for hello-laika](https://travis-ci.org/arunoda/hello-laika)

![Continuous Integration for Meteor with laika](http://i.imgur.com/iNwk7wE.png)

## Meteor CI on CodeShip

CodeShip is another popular Continuous Integration service for private projects. It has more features over travis-ci. Also it is so valuable and cheap if you only have one or two projects to manage. Here is how you can add laika support on codeship.

* Login to <https://www.codeship.io> and add your project 
* When its comes to configure your tests follow the process below 
* Select your technology as `nodejs`

Replace setup commands with following
  
    git clone https://github.com/meteor/meteor.git ~/meteor
    export PATH=~/meteor/:$PATH
    npm install -g meteorite laika

Replace test commands with following

    METEOR_PATH=~/meteor laika -t 5000

I've added codeship support for [hello-laika](https://github.com/arunoda/hello-laika) as well.

![Continuous Integration for Meteor with laika](http://i.imgur.com/7uh672K.png)

## For other CI tools and services

There are lots of other Continuous Integration services and downloaded servers out there. It is not feasible to provide how-to guides for all. Let's discuss in general how we can add laika support for them.

All of these tools and services provide a way to customize their runtime and the test. Most of the time we can configure them using shell scripts. We can categorize them into two.

* Who gives ROOT access for configuration scripts
* Who don't give us ROOT access for configuration scripts

Laika can be configure for both very easily. Let's look at how.

> * Assume you've configured or installed `nodejs`
> * Assume there is a local mongodb server is running
> * Assume phantomjs is installed and available on the path

### With ROOT access

    #install meteor normally
    curl https://install.meteor.com | /bin/sh

    #installing meteorite and laika
    npm install -g meteorite laika

    #run tests
    laika #<options>

### Without ROOT access

    #install meteor from git
    git clone https://github.com/meteor/meteor.git ~/meteor
    export PATH=~/meteor/:$PATH

    #install meteorite and laika
    npm install -g meteorite laika

    #run tests
    METEOR_PATH=~/meteor laika -t 5000

I hope with this information, you could setup your meteor app for Continuous Integration  very easily. Let me know how you think about this, share your experiences.