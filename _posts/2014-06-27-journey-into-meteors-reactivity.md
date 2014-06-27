---
layout: blog
title: "Journey into Meteor's Reactivity"
category: blog
summery: "For some developers, Meteor is a superb framework, which they use to build awesome apps. But for some, it's like magic. This is how I explained Meteor in plain english."
---

For some developers, Meteor is a superb framework, which they use to build awesome apps like [LookBack](https://lookback.io/), [Respondly](https://respond.ly/) and [Streem](https://www.streem.com/). But for some, it's like magic. Especially how Meteor makes MongoDB reactive in real time.

Watch this video:

<iframe width="640" height="480" src="https://www.youtube.com/embed/1h8hvQgt2wA" frameborder="0" allowfullscreen="1">
</iframe>

It's a simple real-time to-do application built with Meteor. As you saw on the video, all the changes are reflected reactively on all connected browsers. This is the JavaScript code for the above application. It's just a few lines of code:

~~~js
Todos = new Meteor.Collection('todos');
Todos.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

Meteor.methods({
  addTodo: function(title) {
    return Todos.insert({'title': title});
  }
});

if(Meteor.isServer) {
  Meteor.publish('todos', function() {
    return Todos.find();
  });
}

if(Meteor.isClient) {
  Meteor.subscribe('todos');

  Template.main.events({
    'click #add-todo': function () {
      var todoText = $('#input-todo').val();
      if(todoText.trim() != ""){
        Meteor.call('addTodo', todoText);
        $('#input-todo').val('');
      }
    },

    'click .delete-todo': function () {
      Todos.remove(this._id);
    },

    'change .todo-done ': function(e){
      var isDone = $(e.target).is(':checked');
      Todos.update({_id: this._id}, {$set: {isDone: isDone}})
    }
  });

  Template.main.checkedState = function() {
    return this.isDone? "checked": "";
  }

  Template.main.todosList = function(){
    return Todos.find();
  }
}
~~~

I'm not going to explain the code because I hope you are quite familiar with Meteor. If not, I highly recommend reading [DiscoverMeteor](https://www.discovermeteor.com/) or watch this [Introduction to Meteor](https://www.youtube.com/watch?v=q9pA2xApdY0) talk by Sacha.

## Basics

### Client and Server Architecture

Meteor is a full-stack JavaScript framework. It runs on both the [client and the server](http://meteorhacks.com/understanding-meteor-internals.html). The client communicates with the server using a protocol called DDP.

### DDP

[DDP](http://meteorhacks.com/introduction-to-ddp.html) is a tiny protocol, which is optimized for real-time communication. It can be implemented over any duplex transport. The current implementation is built on top of SockJS, which is a WebSocket emulation transport.

DDP can basically do two things:

1. Remote procedure calls (methods)
2. Stream real-time data changes (pub/sub)

## The Magic

As I said before, some people think Meteor generates codes on the fly or does some magic behind the scenes. But it does not. It's a combination of carefully crafted technologies built into a single framework. It's extensible and very easy to use.

I'll help you to understand what's really inside Meteor and what it's made of.

To start our journey, let's think about the following scenario for the above to-do application:

1. The user types a new to-do item.
2. The user clicks the "Add" button.
3. The new to-do item is rendered immediately on all connected browsers.

Behind the scenes, a lot of things are happening. Let me show you.

## Behind A Meteor App

I'll show you all these things step by step with the help from some graphics.

At first, all Meteor clients are subscribed to the todos publication, which sends database changes to the client from the MongoDB. It creates an observer for the Todos collection and looks for changes in the DB. We call it an "oplog observer driver". The oplog is a real-time stream of database changes, which is used for MongoDB replication.

So, if anything changes in the DB, it’s detected by the observer. And it's smart enough to identify whether it needs to worry about the change or not. If so, it will tell Meteor to send the changes to connected clients over DDP:

![Subscriptions and Observe](https://i.cloudup.com/Vb9y-SJRij.png)

Our template looks for changes with the `Posts.find()` cursor. So, if there are any changes, Blaze will render the UI accordingly:

![Blaze Observing Local Collection](https://i.cloudup.com/vNGXhagI1V.png)

Clicking on the "Add" button invokes a method call to add the to-do item. First, the method body on the client will get executed. It writes the DB changes to the local copy of the Posts collection. To make that happen, we have written our method body so that it is accessible from both the client and server.

So, once the new document has been added to the local collection, Blaze will detect it and render it on the screen. This is what we call a method simulation and it does something fancy called **latency compensation.
**

>**Latency Compensation**
>
>This means that you don't need to wait until a method completes processing on the server, to render DB changes on the screen. It also handles errors and reverts to the previous version if there is an error or the server rejects the database changes.

Then, client-1 sends the method call to the server via DDP. Meteor executes the method body on the server and it will actually insert the to-do document into MongoDB.

When the method body completes execution, Meteor simply sends a DDP message to the client with the result of the method:

![Method Call Flow](https://i.cloudup.com/yiuX2rB-DZ.png)

After that, the oplog observer driver will get the new document. It forwards the document to both clients. Two of our clients work differently from each other once they get the data.

When client-2 gets the new document, it simply adds it into the local collection. So, Blaze will detect it and render the new to-do item on the screen.

Client-1 also gets the document. But it keeps that document in memory and waits for another special message from DDP:

![Observers Sending Changes](https://i.cloudup.com/0gz8eJbr-c.png)

Next, Meteor sends a special DDP message to client-1 saying updated. This indicates that all the database changes for the method have been applied. Now Meteor will compare the document received via DDP to the document added by the simulation. If there are any differences, it will submit those changes to the local collection. Blaze will get notified and re-render the UI accordingly:

![Client Receives Updated Message](https://i.cloudup.com/mO4J8rnJdP.png)

Now all the clients have received the new to-do item. So, Meteor will trigger a callback for the method with the result of the method.

## That's a lot of stuff

Yeah! That's a lot of stuff and I only gave you an overview of what's actually happening. What's going on in each of these components and how they work together is pretty amazing. It took me more than a year to understand most of these complex tasks that were happening behind the scenes.

I will show you exactly what is happening in all those components very clearly with graphics and demos, so you will be able to understand them very easily. With that understanding, you'll be able to understand Meteor and it won't be a magical framework anymore. Then you’ll be able to build high-quality Meteor applications.

> You don't need to have any prior knowledge to understand any of this content. A basic knowledge of Meteor is more than enough.

I invite you to join me on a journey into meteor's reactivity with **Meteor Explained**.

[![Meteor Explained Book Cover](https://i.cloudup.com/XebhBZYIMN.png)](https://gum.co/meteor-explained)

[You can pre-order **Meteor Explained** for $29](https://gum.co/meteor-explained).

>First chapter is available from today.
>
>I am adding a new chapter every week, and you'll be able to download them in PDF, ePub or mobi format.

<script type="text/javascript" src="https://gumroad.com/js/gumroad.js">
</script>
<a href="https://gum.co/meteor-explained" class="gumroad-button">Pre Order Now</a>

It comes with a 100% money-back guarantee and I'll refund without asking any questions. Here are the chapters Meteor Explained contains.

### Chapters in Meteor Explained

#### 1. Basics

* 1.1 Client–Server Architecture
* 1.2 DDP
* 1.3 Fiber
* 1.4 Introduction to Meteor's Reactivity

#### 2. Client-Side Reactivity

* 2.1 Local Collections
* 2.2 How Deps works
* 2.3 How Blaze Works Reactively
* 2.4 DDP Connection

#### 3. DDP Server

* 3.1 How DDP Messages Are Processed
* 3.2 SockJS
* 3.3 Scaling and Challenges

#### 4. Methods

* 4.1 Latency Compensation
* 4.2 Crossbar and the Logic Behind It
* 4.3 DB Operations

#### 5. Publish/Subscribe

* 5.1 How Publish/Subscribe Works
* 5.2 Cursors and Observers
* 5.3 Oplog Observer Driver
* 5.4 Polling Observer Driver
* 5.5 Merge Box
* 5.6 Deps and Subscriptions

#### 6. Bonus: Distributed Apps with Meteor

* My experience of building distributed apps based on Meteor
* How we designed the architecture for Kadira (based on DDP and Oplog)

<a href="https://gum.co/meteor-explained" class="gumroad-button">Pre Order Now</a>
