---
layout: blog
title: Introducing Meteor Streams
category: blog
summery: ''
hide: true
---

When we are talking about meteor and realtime, mongodb comes to the scene by default. It is really good model and works really well. But do we really need mongodb for all our realtime communications? Obviously, answer should be NO.

But with meteor, we tend to design our app with mongodb since it is the only way. Mongodb is good, and we need it, but what we really need is a hybrid approach. For some of our realtime communications we can use mongo, for some we'll do it without mongo. But how?

I was asking that question myself. There was no good and easy solution. So I started working on meteor-streams and here it is :)

## Introducing Meteor Streams

Meteor Stream is a distributed EventEmitter across meteor. It can be managed with filters and has a good security model (Inherited from existing meteor security model). You can create as many as streams you want, and it is independent from mongo.

With Meteor Streams, you can communicate between

 * client to clients
 * server to clients
 * client to server
 * server to servers

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

## Checkout some examples

I've created few examples and here are they

* Chat [Live App](http://streams-chat.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/chat)
* Chat with Filters [Live App](http://streams-chat-with-filters.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/chat-with-filters)
* Streaming Home Page [Live App](http://streams-streaming-homepage.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/streaming-homepage)
* Streaming Home Page with Reactive UI bindings [Live App](http://streams-streaming-homepage-reactive.meteor.com) - [Source](https://github.com/arunoda/meteor-streams/tree/master/examples/streaming-homepage-reactive)

## First MeteorHacks Challenge

Meteor Streams is still away from the public. This is an exclusive post to all of the awesome MeteorHacks subscribers, including you. So what is this MeteorHacks Challenge?

I want to know, what are the possible ways meteor-streams can be used. But I'm limited myself with the thinking cap and I need help from you guys. Here is what I need.

* Think a way how meteor-streams can be used?
* Write a post, write a tip, code a sample app
* Send it to me @ arunoda.susiripala@gmail.com
* Don't forget to send it before 1st July 

## And there is a small gift for you

For anyone sending me a post/tip or a sample app, I will send you a printed version of the upcoming **Testing Meteor Handbook**. I know your time worth more than this, but think it as a way how I can say Thank You! :)