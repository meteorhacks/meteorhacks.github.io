---
layout: blog
title: "Meteor UI Pattern: Keeping App State on the URL"
category: blog
summery: "In this article, we talk about the importance of keeping app state in the URL. Then, we show few ways to do that for your Meteor app."
---

Traditionally in the web, the URL is the key component and everything is built around it. Everyone understands the concept of the URL and how it behaves.

If you’ve forgotten what the URL does, here it is :)

> A URL identifies a unique page or some content on the web. Even on a private app like Gmail, the URL plays the same role. 

## URL and Single Page Apps (SPAs)

After the success of single page apps, it was a bit complex to handle and maintain the URL as content changed. With SPAs, we route and display different views inside the browser. That means that we change the state of the app without reloading the page. 

Because of that, some developers have forgotten to maintain the state in the URL and have created a unique URL for every view. That's where client side routers and standards like "[push state](http://diveintohtml5.info/history.html)" help us to maintain the state of the app inside the URL easily.

## Meteor and URLs

In this article, I will show you few ways to use URLs to manage the state of Meteor apps. If you think carefully, a URL is a global state manager that just works. I will show you some examples as we go that are based on the [flow router](https://github.com/meteorhacks/flow-router).

Let's discover a few patterns:

### 1. Pages

This is a basic use of the router and the classic use case. It's a set of pages with a unique URL. See the following demo:

<iframe width="640" height="480" src="https://www.youtube.com/embed/pAfiHah2e7E" frameborder="0" allowfullscreen="1">
</iframe>

Here's the code of our router:

~~~js
FlowRouter.route('/:section/:lesson', {
    action: function() {
        FlowLayout.render("myapp");
    }
});
~~~

This is the code for templates. 
(Here we directly render templates using flow layout. In a real app, you would have a complex UI arrangement.)

**Blaze Template**
<script src="https://gist.github.com/arunoda/74a9641220d5020bf566.js"></script>

**Template Helpers**

~~~js
Template.myapp.helpers({
    pageContent: function() {
        var section = FlowRouter.getParam("section");
        var lesson = FlowRouter.getParam("lesson");
       
        return Posts.findOne({section: section, lesson: lesson});
    }
});
~~~

### 2. Single View, Dynamic Content

Here we don't change the path of the app, but the content is changing dynamically. One good example is [Kadira](https://kadira.io/)'s date-time navigation. 

See:

<iframe width="640" height="480" src="https://www.youtube.com/embed/wGcLYrU1Vg0" frameborder="0" allowfullscreen="1">
</iframe>

In the above example, you are looking at the same set of charts, but the data is changing as you navigate. At any time, you can copy the URL and use it as a permalink to the charts you see on the screen. Here we use a query param to keep the date in the URL. 

This is what happens when the user clicks the prev button: 

~~~js
Template.dateNavigation.event({
    "click #prev": function() {
        var currentDate = FlowRouter.getQueryParam('date');
        var prevDate = TimeUtils.getPrevDate(currentDate);
        FlowRouter.setQueryParams({date: prevDate});
    }
});
~~~

This will change the query string `date` to the new one. Here's our template for one of the charts in the screen:

~~~js
Template.cpuChart.onCreated(function() {
    var instance =  Template.instance();
    instance.chartData = new ReactiveVar();
    instance.autorun(function() {
        var currentDate = FlowRouter.getQueryParam('date');
        Meteor.call('getCPUChartData', function(err, data) {
            instance.chartData.set(data);
        });
    });
});

Template.cpuChart.helpers({
    chartData: function() {
        return Template.instance().chartData.get();
    }
});
~~~

It's watching the query params and getting the data according to the current query param. Here, the flow router's API plays a huge role in efficiently notifying the change of the query param. 

### 3. Opening Modals

This is also very similar to the previous pattern, but we are using it for a different purpose. Watch the following video:

<iframe width="640" height="480" src="https://www.youtube.com/embed/PDqvvGqo3CY" frameborder="0" allowfullscreen="1">
</iframe>

When we click on the alerts button, it will open up a new modal window. Rather than opening the modal when the event fires, we set a new query param in the URL, as shown below:

~~~js
Template.dateNavigation.event({
    "click #alertsButton": function() {
        FlowRouter.setQueryParams({action: "alerts"});
    }
});
~~~

Then we reactively watch that query param inside an autorun. If that query param exists, we'll show the popup; once it’s closed, we'll remove the query param.

~~~js
Template.appView.onRendered(function() {
    var instance =  Template.instance();
    instance.autorun(function() {
        var action = FlowRouter.getQueryParam("action");
        if(action == "alerts") {
            var alertsModal = $('#alertsModal');
            alertsModal.modal("show");
            alertsModal.one("hidden.bs.modal", function() {
                 // to remove the action query param
                 FlowRouter.setQueryParams({action: null});
            });
        }
    });
});
~~~

By using this method, we can reload the page and still be able to  see the modal window.

## I Think You Get the Idea

Using URLs, we can easily decouple the actions and states of our app. Most importantly, you can persist states inside the URL. As a result of that, states of your app now become portable. This means that users can copy the URL and share it with others or bookmark it for later use.

### Exceptions

Even though keeping the app state in the URL is very important, it's not a must. One good example is [Google Inbox](https://inbox.google.com). Watch the following video:

<iframe width="640" height="480" src="https://www.youtube.com/embed/qo1tdCxy13Q" frameborder="0" allowfullscreen="1">
</iframe>

Google Inbox does not change the URL when we click on an email. This is not a bug: they did it on purpose.

In Google Inbox, you can mark emails as done or snooze them. Then, they will be removed from the UI. So, providing a unique URL for each individual email is confusing, because emails could disappear from the app at any time.

Facebook's timeline is another example of this scenario. 

### React Flux vs. the URL

[React Flux](https://facebook.github.io/flux/docs/overview.html) introduces us a global state manager. I believe they just re-implemented the concept behind the URL.

You could easily achieve flux's features by keeping the state in the router. Flow Router helps to achieve this with its fast and carefully designed reactive API. 

## Try Flow Router

I have mentioned flow router in a couple of places in this article. [Flow Router](https://github.com/meteorhacks/flow-router) was just an experiment at MeteorHacks, but it turned into a huge success. Now we are working hard on version 2.0. Version 2.0 basically introduces new APIs and shows more patterns to solve common problems like changing routes based on the user login status. 

The current version is also very stable; it is used on [BulletProof Meteor](https://bulletproofmeteor.com) and is used in the next version of [Kadira](https://kadira.io).

If you haven't tried it yet, [try it](https://github.com/meteorhacks/flow-router) today. It's very simple and easy to use. 