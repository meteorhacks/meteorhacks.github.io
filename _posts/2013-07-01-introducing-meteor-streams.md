---
layout: blog
title: Introducing Meteor Streams
category: blog
summery: "With Meteor Stream you can build realtime apps without using MongoDb as the realtime component. It has a good security model inherited from the existing meteor accounts system and it can be scaled very easily."
---

When we are talking about meteor and realtime, mongodb comes to the scene by default. It is really good model and works really well. But do we really need mongodb for all our realtime communications? Obviously, answer should be NO.

But with meteor, we tend to design our app with mongodb since it is the only way. Mongodb is good, and we need it, but what we really need is a hybrid approach. For some of our realtime communications we can use mongo, for some we'll do it without mongo. But how?

I was asking that question myself. There was no good and easy solution. So I started working on meteor-streams and here it is :)

## Introducing Meteor Streams

<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-streams&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="125px" height="30px">
</iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=arunoda&amp;repo=meteor-streams&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="30px">
</iframe>

Meteor Stream is a distributed [EventEmitter](http://www.sitepoint.com/nodejs-events-and-eventemitter/) across meteor. It can be managed with [filters](http://arunoda.github.io/meteor-streams/filters.html) and has a good [security](http://arunoda.github.io/meteor-streams/security.html) model. (Inherited from existing meteor security model). You can create as many as streams you want, and it is independent from mongo.

## Lets give it a try

Let's create a simple browser console based chat app.

 * Create a simple meteor application with `meteor hello-streams`
 * Install meteor streams from atmosphere `mrt add streams`

Add following content to `chat.js`

    chatStream = new Meteor.Stream('chat');

    if(Meteor.isClient) {
      sendChat = function(message) {
        chatStream.emit('message', message);
        console.log('me: ' + message);
      };

      chatStream.on('message', function(message) {
        console.log('user: ' + message);
      });
    }

Now you can use `sendChat(messageText)` method to chat in the browser console. Isn't it simple and awesome :)

This is just the beginning; are lot more. Check out [Meteor Streams Docs](http://arunoda.github.io/meteor-streams/).

## How Meteor Streams Works

![How Meteor Streams Works](http://i.imgur.com/MX0yZVG.png)

* Once a client `emit` an event first it will reach the checkpoint no 1.
* It will make sure this event and the client can proceed
* After event pass through the checkpoint it will go through a set of filters
* Filters can add/modify and delete the content of the event
* Then it goes through the next checkpoint to see which clients can receive this event 
* After it passed through the checkpoint 2, event will be delivered to the respective clients

> You might wonder, although I have talked here about checkpoints, but I never used any checkpoints in the example. It is because of the `insecure` package. If `insecure` package exists, all the checkpoints are open by default or otherwise closed.

## Checkout Documentation

I can't show you full power of the meteor-streams with a single post. [Checkout the documentation](http://arunoda.github.io/meteor-streams/) and try to read these topics carefully.

* [Communication Patterns](http://arunoda.github.io/meteor-streams/communication-patterns.html)
* [Security](http://arunoda.github.io/meteor-streams/security.html)
* [Filters](http://arunoda.github.io/meteor-streams/filters.html)
* [Scaling with Meteor Cluster](http://arunoda.github.io/meteor-streams/scaling-support.html)
* [Reactivity](http://arunoda.github.io/meteor-streams/reactivity.html)

## Checkout some examples

I've created few examples and here are they

* Realtime Blackboard [Live App](http://blackboard.meteorhacks.com/xzjkf7ZHvw3APbfxY) - [Source](https://github.com/arunoda/streams-blackboard)
* Chat [Live App](http://streams-chat.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/chat)
* Chat with Filters [Live App](http://streams-chat-with-filters.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/chat-with-filters)
* Streaming Home Page [Live App](http://streams-streaming-homepage.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/streaming-homepage)
* Streaming Home Page with Reactive UI bindings [Live App](http://streams-streaming-homepage-reactive.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/streaming-homepage-reactive)

Try Meteor Streams with your app and let me know your comments.