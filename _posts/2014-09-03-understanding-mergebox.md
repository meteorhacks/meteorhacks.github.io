---
layout: blog
title: "Understanding MergeBox"
category: blog
summery: "You may have heard this term somewhere before. If you haven't, don't worry. In this topic, we will be looking at what MergeBox is and how it works."
---

You may have heard this term somewhere before. If you haven't, don't worry. In this topic, we will be looking at what **MergeBox** is and how it works. It is one of the major building blocks of Meteor.

## What is MergeBox?

MergeBox is a process that tries to identify the exact changes that need to be sent to the client, based on the data it receives from publications.

To understand this properly, let's take a look at an example. Suppose we have two publications, as shown below:

~~~js
Meteor.publish("app", function(appId) {
    var filter = {name: 1};
    return Apps.find({_id: appId}, {fields: filter});
});

Meteor.publish("appWithOwner", function(appId) {
    var filter = {name: 1, owner: 1};
    return Apps.find({_id: appId}, {fields: filter})
});
~~~

First, let's try to subscribe to the first publication:

~~~js
Meteor.subscribe('app', 'app-one');
~~~

As we expect, we get the following DDP message:

~~~json
{
    "msg": "added",
    "collection": "apps",
    "id": "app-one",
    "fields": {"name": "kadira"}
}
~~~

Next let's try to subscribe to the second subscription for the same `appId`:

~~~js
Meteor.subscribe('appWithOwner', 'app-one');
~~~

Interestingly, we get a changed DDP message with only the `owner` field:

~~~json
{
    "msg": "changed",
    "collection": "apps",
    "id": "app-one",
    "fields": {"owner": "arunoda"}
}
~~~

This is a result of a particular behavior of MergeBox. It has a copy of all the data available in each client. When a new subscription tries to send data to a client, MergeBox compares the subscription data with the particular client's copy of the data. Then it will send only the differences to the client.

## Why MergeBox?

Now, you may be wondering: why MergeBox? Why is it in the server? Isn't it going to consume more server resources?

Yes, you are correct. It will consume some additional CPU resources. But it'll send the minimum amount of data down the wire, saving bandwidth and making the application faster. MergeBox comes in handy when Meteor applications are used on Mobile devices.

---

I hope you now have a clear understanding of MergeBox. But how it works **internally** is pretty awesome. You can learn more about MergeBox in my book [Meteor Explained](https://gumroad.com/l/meteor-explained).

I've recently completed the "Publish Subscribe" Chapter and it has all the details for how publish subscribe works inside Meteor. There is a **separate topic** on MergeBox where I explain how it works clearly using some pretty illustrations.

{% include meteor_explained_book.html %}