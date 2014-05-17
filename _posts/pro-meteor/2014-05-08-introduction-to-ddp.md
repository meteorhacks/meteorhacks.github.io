---
layout: pro-meteor-post
title: Introduction to DDP
category: prometeor
summery: "DDP is the protocol meteor uses to communicate between client and the server. If you know how to understand DDP, it is very easy to debug your app and fix hard to solve issues. This is an introduction to DDP."
---

DDP is the heart of MeteorJS and it's the protocol Meteor uses to communicate between the client and the server. DDP is an acronym for [Distributed Data Protocol](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md). Meteor has implemented both client and server implementations for DDP. There are a few client libraries for other frameworks and languages for connecting with Meteor via DDP.

## What Is DDP?

Although it sounds like a complex protocol, DDP is very simple and minimalistic. It is a protocol based on JSON. Technically, DDP can be implemented on top of any duplex transport. Meteor's current implementation is based on WebSockets and SockJS. SockJS is a WebSockets emulation transport, which can be used when WebSockets is not available.

## What does DDP do?

DDP mainly does two things:

1. It handles Remote Procedure Calls (RPC).
2. It manages data.

Let's learn more about these two functionalities in more detail.

## Handling Remote Procedure Calls

With RPC, you can invoke a method on the server and get something back in return. Besides that, DDP has a nice feature: it notifies the caller after all the write operations in the method have been reflected to all the other connected clients.

Let's look at an example.

In this example, the client calls a method on the server called `transferMoney`.

![](https://i.cloudup.com/2fLpc3NA3a.png)

See below for the actual DDP messages:

    1.{"msg":"method", "method": "transferMoney", "params": ["1000USD", "arunoda", "sacha"], id": "randomId-1"}
    2.{"msg": "result", id": "randomId-1": "result": "5000USD"}
    3.{"msg": "updated", "methods": ["randomId-1"]}

1. The DDP client (arunoda) invokes the method transferMoney with three parameters: 1000USD, arunoda and sacha.
2. Then after the transfer has been accepted, the DDP server (bank) sends a message with an updated balance to arunoda's account. The balance is in the result field. If there was an error, there will be an error field instead of the result.
3. Some time later, the DDP server sends another message called updated with the method id, notifying me that my transfer has been sent to sacha successfully and he has accepted it. Sometime, updated message comes before the result. (It's also possible to receive `updated` message even before the `result` message)

Check the protocol [documentation on RPC](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md#remote-procedure-calls) for more information.

## Managing Data

This is the core part of the DDP protocol. A client can use it to subscribe into a real-time data source and get notifications. The DDP protocol has three types of notification: `added`, `changed` and `removed`. Since the DDP protocol was inspired by MongoDB, each data notification (a JSON object) is assigned to a collection, which is the place where the data belongs.

Let's look at an example.

We've a data source called `account`, which holds all the transactions made by the users. In this example, sacha will connect to his account to get his transactions. After arunoda makes a transfer, sacha will receive the new transaction. Here's the data flow for this:

![](https://i.cloudup.com/36TF0RmTLM.png)

See below for the actual DDP messages:

    1.{"msg": "sub", id: "random-id-2", "name": "account", "params": ["sacha"]}
    2.{"msg": "added", "collection": "transactions", "id": "record-1", "fields": {"amount": "50USD", "from": "tom"}}
      {"msg": "added", "collection": "transactions", "id": "record-2", "fields": {"amount": "150USD", "from": "chris"}}
    3.{"msg": "ready": "subs": ["random-id-2"]}
    4.{"msg": "added", "collection": "transactions", "id": "record-3", "fields": {"amount": "1000USD", "from": "arunoda"}}

1. The DDP client (sacha) sends a subscription request for his account.
2. He will receive a couple of added notifications with the current transactions in his account.
3. After all the transactions have been sent by the DDP server (bank), DDP will send a special message called `ready`. The ready message indicates that all the initial data for the subscription has been sent and you are good to go.
4. Some time later, after arunoda has sent his transfer, sacha will receive the transaction as another added notification.

Likewise, the DDP server can send changed and removed notifications as well. See below for sample notifications.

    //changed
    {"msg": "changed", collection": "transactions", "id": "doc_id", "fields": {"amount": "300USD"}}
    
    //removed
    {"msg": "removed", "collection": "transactions", "id": "doc_id"}

Check the protocol documentation on [Managing Data](https://github.com/meteor/meteor/blob/devel/packages/livedata/DDP.md#managing-data) for more information.

## Understanding and Analyzing DDP

Understanding and analyzing DDP are very important for any Meteor developer since those help in fixing issues and give an understanding on how the Meteor application works internally. Since now you understand DDP pretty well, it's time to see how actual DDP messages are sent and received in your app.

For that, install [`ddp-analyzer`](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html) and configure your app for it. Now you can see what's happening behind the scenes.

[![](https://i.cloudup.com/IsUVXUOspa.png)](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html)

Check here to learn more about the [DDP Analyzer](http://meteorhacks.com/discover-meteor-ddp-in-realtime.html).

Learn how your application behaves and apply fixes accordingly. 

> To get more insight into your app and learn how to fix them, add [Meteor APM](https://meteorapm.com/) support to your app.
