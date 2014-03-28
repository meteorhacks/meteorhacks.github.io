---
layout: blog
title: "Understanding Meteor Wait Time & this.unblock"
category: blog
summery: "You've probably experienced a situation where some of your methods are processing very slowly, even if there is no issue with the methods themselves. Here's the reason & how you can fix it."
---

You've probably experienced a situation where some of your methods are processing very slowly, even if there is no issue with the methods themselves. This is quite common if you are interacting with third party services or doing some heavy DB operations. 

> With [Meteor APM](https://meteorapm.com/), you can check this very easily. Meteor APM detects the waitTime and shows you what caused it.
>
> ![Meteor APM can detect waitTime](https://i.cloudup.com/QpP86FJXaI.png)
> ![Meteor APM can detect waitTime](https://i.cloudup.com/36w9qEBk8I.png)

Wait time is not good—we all hate waiting. If you have looked for a solution, the common answer is to use `this.unblock`. 

Now you might ask, if that's the answer, then why doesn't Meteor do it by default?
Well, it's not as simple as that. 

## DDP messages are processed in a sequence

Meteor processes DDP messages for a client in a sequence. All other messages are queued before the current one is completed. This applies not only to methods, but to all DDP messages, including subscriptions.

By taking this approach, Meteor can ensure that all the subscriptions and methods you call are executed in order, so you can delete a document and insert it back into the queue without causing any errors. This is how things work naturally in many places, not just within Meteor.

## Why use "this.unblock"

Still, some methods will take more time to complete than others, particularly methods with third party API requests. So `this.unblock` will allow the next available DDP message to process without waiting for the current method. This is all on a per client basis: there no blocking involved globally. 

## Why "this.unblock" does not always work

You can’t always use `this.unblock` because sometimes it leads to unpredictable results. See the following example:

    Meteor.methods({
      //pick a given username from the twitter and update the DB
      pickProfile: function(username) {
        var profile = TwitterAPI.getProfile(username);
        ProfileCollection.upsert(username, {$set: {
          profile: profile
        }});
      },

      //notify all the users about a given email
      notifyUsers: function(username) {
        var profile = ProfileCollection.findOne(username);
        sendEmails(profile);
      }
    });

The above two methods are designed to be used independently, and are used in many places in the app. For example, in the following scenario both of them are used at once:

    Meteor.call('pickProfile', 'arunoda');
    Meteor.call('notifyUsers', 'arunoda');

In this example, the app will update the DB first and send the emails after that. If I put `this.unblock` in the `pickProfile` method, the emails would be sent; but with the old profile. And that's not what we wanted.

So, think twice when you are applying `this.unblock`.

Here’s the rule of thumb to use when you're deciding whether to apply `this.unblock` or not.

> If a method will cause side effects and subsequent methods will depend on those side effects, do not invoke `this.unblock`.

## Waiting for subscriptions

If your methods are waiting for a subscription, there is no way you can use `this.unblock`. The only solution is to improve the responseTime of the subscription. 

To do that, you can add proper indexes for slow queries and try to minimize the DB interaction, if that's possible. It is very rare to use an HTTP or Async task inside a publication, but in that case you'll see show waitTime on your app frequently.

> It is good idea to avoid using HTTP and Async tasks inside publications, since they can cause security issues with FastRender. If Meteor implemented Server Side Rendering, that would also be affected. You can learn more about this issue in the FastRender [documentation](http://meteorhacks.com/fast-render/security-measures/).

Now you have a better understanding of the reason for a wait time. Most importantly, now you know how to handle it properly.