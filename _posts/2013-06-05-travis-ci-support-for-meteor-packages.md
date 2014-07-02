---
layout: blog
title: Travis CI support for Meteor Packages
category: blog
summery: 'I have started hacking more into Meteor and I was able to add Travis CI support for Meteor Packages. Checkout how you can add Travis CI support for your meteor package.'
---

Before talking anything, have you ever seen following red and green images? (may be on github)

![Build Passing](http://i.imgur.com/sFaJmub.png)
![Build Failing](http://i.imgur.com/Xgw4oal.png)

They show the project's build status in [Travis CI](https://travis-ci.org/). Travis CI is a free cloud service for OpenSource projects(on github) to build their tests on each and every commit. It is [full featured](http://about.travis-ci.org/docs/user/ci-environment/) and you can test nearly anything. It has support for popular databases, message queues, compilers, browsers and so many other tools.

Travis CI has also available for most of the languages and frameworks out there. But unfortunately there is no official support for Meteor yet!.

## Why we need Travis CI for meteor?

Good question! It is not very important to have travis support for Meteor Apps, since most of the apps won't be release as Open Source.

But we really need travis support for Meteor Packages. Specially [`atmosphere`](https://atmosphere.meteor.com/) smart packages installed using [`meteorite`](https://github.com/oortcloud/meteorite).

With travis, it encourages developers to write more tests(using [tinytest](http://goo.gl/W203h)) and users to use third party packages with confidence.

So I began hacking into Travis CI and more deeply into Meteor. I was able to extend travis to support for Meteor Packages. And the best part is, all you(package developers) have to do is simply add a single file to your package!

## Adding travis support

Add following file to your meteor package as `.travis.yml`

    language: node_js
    node_js:
      - "0.10"
    before_install:
      - "curl -L http://git.io/ejPSng | /bin/sh"

Login to [https://travis-ci.org](https://travis-ci.org) with Github and navigate to [https://travis-ci.org/profile](https://travis-ci.org/profile)

Enable travis support for your project listed there.

![Meteor Cluster - Travis Support](http://i.imgur.com/JY9o3xm.png)

## What next

Currently travis builds your package against the latest meteor release (0.6.3.1 at the moment of writing the article). There are plans to configure meteor versions manually and support multiple meteor version. Patches are welcome :)

<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=travis-ci-meteor-packages&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="125px" height="30px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=travis-ci-meteor-packages&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="30px">
</iframe>

* See more options to configure travis: [http://goo.gl/UYUo7](http://goo.gl/UYUo7)
* Look at my meteor cluster package as a sample: [http://goo.gl/8gjGi](http://goo.gl/8gjGi)
* Submit your issues and suggestions: [http://goo.gl/2CcnV](http://goo.gl/2CcnV)
