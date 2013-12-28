---
layout: blog
title: "Improved Async Utilities in Meteor-NPM"
category: blog
summery: "Meteor-NPM supercharged with a set of new Async Utilities. Now it's even more simpler to use async style apis with Meteor."
---

Since its release a few months ago, [meteor-npm](https://github.com/arunoda/meteor-npm) has brought better integration of NPM packages into Meteor apps. The package shipped with a helper called `Meteor.sync` which allowed developers to use callback-style async APIs with Meteor. This is demonstrated below:


    Meteor.methods({
      'wait': function getGists(user) {
        var message = Meteor.sync(function(done) {
          setTimeout(function() {
            done(null, 'Hello after 1000 milliseconds');
          }, 1000);
        });

        return message.result;
      }
    });

`Meteor.sync` worked well, and was easy to understand.

## Introducing New Async Utilities

Meteor-npm now comes with an improved set of helpers for async-style programming in Meteor. They're called _Async Utilities_, and they are grouped into a dedicated namespace `Async`:

* `Async.runSync` - same as `Meteor.sync`
* `Async.wrap(function)` - wraps a single function which can be used inside Meteor, similar to `Meteor._wrapAsync`
* `Async.wrap(object, methodName)` - same as the above, but for an instance method of an object
* `Async.wrap(object, methodNameList)` - same as the above, but supports multiple instance methods

> For more information, check out the [Async Utilities](https://github.com/arunoda/meteor-npm#async-utilities) docs on GitHub.

With this set of utilities, it's now even easier to use NPM modules with Meteor.

## Let's Try a Demo

Witness the power of _**Async Utilities**_ in the example below:

    var GithubApi = Meteor.require('github');
    var github = new GithubApi({
        version: "3.0.0"
    });

    // Wrap `github.user.getFrom` and `github.user.getEmails`.
    var wrappedGithubUser = Async.wrap(github.user, ['getFrom', 'getEmails']);

    // Use inside Meteor.
    Meteor.methods({
      getProfile: function(username) {
        return wrappedGithubUser.getFrom({user: username});
      },

      getEmails: function(username) {
        // This causes an error, since we haven't authenticated the API.
        // See how this wrapped function handles errors.
        return wrappedGithubUser.getEmails({user: username});
      }
    });


## Async.wrap Handles Errors Better

One of the problems with `Meteor._wrapAsync` is that it improperly handles errors. In the above example, if `Meteor._wrapAsync` had been used to wrap the `getEmails` method, the error would have been:

![Error Report by `Meteor._wrapAsync`](https://i.cloudup.com/GTaUeDBHPp.png)

`Async.wrap` produces better error messages:

![Error Report by `Async.wrap`](https://i.cloudup.com/03GbMmC1mp.png)

## Updating Meteor-NPM

#### Using npm on Atmosphere

*  Run `mrt update` to get the new _Async Utilities_ API.

#### Using meteor-npm on NPM

* Run `sudo npm update -g meteor-npm`.
* Run inside your project: `meteor-npm`

That's all for now; go try out the new `Async.wrap` and share your experience!

---------------

> Edited by [Jon James](https://twitter.com/jonjamz) (Head of Technology at [Writebot](http://writebot.com/))

