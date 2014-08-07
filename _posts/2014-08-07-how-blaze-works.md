---
layout: blog
title: "How Blaze Works - Meteor's Reactive Templating UI"
category: blog
summery: "We all know that Blaze is a Handlebars-compatible templating engine written specially for Meteor. But how does Blaze actually work? That's what I am going to show you"
---

We all know that Blaze is a Handlebars-compatible templating engine written specially for Meteor. But how does Blaze actually work? That's what I am going to show you.

I'll try to explain with an example. It's a simple Meteor application with a single template. Here's the code for our app:

<script src="https://gist.github.com/arunoda/4cbf29357ff6547a1608.js">
</script>

~~~js
// app.js
Posts = new Meteor.Collection('posts');

if(Meteor.isClient) {
  Template.postList.posts = function () {
    return Posts.find();
  };
}
~~~

Blaze is a combination of several packages. Some parts of it run when you are bundling your app and some on the client.

First, let me show you an overview of how Blaze renders templates. After that, I'll explain each of these steps in detail:

![](https://i.cloudup.com/cV8L5OWJvn.png)

* Blaze parses `.html` files in your app and identifies the templates and body content (bundle-time).
* It converts both the templates and body content with Spacebars and generates a client-side JavaScript file (bundle-time).
* The client initializes the templates and registers the body content (client).
* It renders the body and inserts it into the DOM (client).
* It renders templates (client).
* It renders all the individual views inside each template (e.g., “each”, “if” and nested templates) (client).

Let's dig in.

## Parsing HTML (When Bundling)

On the bundle-time, Blaze parses all your html files and generates a JavaScript file, which will get loaded into the client.

This task is mainly handled by the [templating](https://github.com/meteor/meteor/tree/devel/packages/templating) package. This is what it does. It parses our html file (app.html) and groups the content into head, body and templates.

Then it takes the body along with all templates and converts them into JavaScript. This task is done by the [spacebars-compiler](https://github.com/meteor/meteor/tree/devel/packages/spacebars-compiler) package. The Spacebars compiler converts html into something called [htmljs](https://github.com/meteor/meteor/tree/devel/packages/htmljs) and controllers (I'll talk about controllers in a moment). You can inspect the generated file in your local Meteor bundle.

The JavaScript file generated for our `app.html` is located in `<app>/.meteor/local/build/programs/client/app/` in a file called `template.app.js`.

> I've formatted the generated file a little bit for readability:

~~~js
(function(){
  // body content
  var bodyContent = Template.__body__.__contentParts;
  bodyContent.push(Blaze.View('body_content_'+ bodyContent.length, (function() {
    var view = this;
    return [
      Spacebars.include(view.lookupTemplate("postList"))
    ];
  })));

  // loading body when page loaded
  Meteor.startup(Template.__body__.__instantiate);

  // postList template
  Template.__define__("postList", (function() {
    var view = this;
    return [
      HTML.Raw("<h1>Post List</h1>\n  "),
      HTML.UL("\n    ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("posts"));
      },
      function() {
        return [ "\n      ", HTML.LI(Blaze.View(function() {
          return Spacebars.mustache(view.lookup("title"));
        })), "\n    " ];
      }), "\n  ")
    ];
  }));
})();

~~~

That's a little complex. I'll explain each part of it very clearly. Now, Blaze's bundle-time responsibility is over; it's time to let the client take control and render the page.

## Client-Side Blaze

Our JavaScript template file loads like a usual JavaScript file but it will be loaded after all the packages have been loaded. Then the Blaze-related packages in the client will take care of the rendering templates in the UI.

In this article, I'm not going to go deep into Blaze and show you everything. Instead, I'll show you the stuff that matters the most to help you to understand what's really happening inside. For that, we need to understand a few important terms and APIs first.

### Spacebars

[Spacebars](https://github.com/meteor/meteor/tree/devel/packages/spacebars) is Meteor's implementation of Handlebars. It has all the features of Handlebars plus it is reactive and plays nicely with Meteor.

### Blaze.View

Blaze.View is the main building block of the reactive DOM. Handlebars helpers like `#each`, `#if` and `#with` can be considered as builtin views. All of our templates will be converted into views, before they will be rendered to the UI. [Click here](http://goo.gl/qTzEfo) to learn more about Blaze.View.

### HtmlJS

HtmlJS is a DSL for representing DOM like structure in JavaScript. Meteor use HtmlJS(along with Spacebars) to convert HTML in your into JavaScript and send them to client. (see `template.app.js`)

### DOM Range

DOM Range is a way to track dynamically changing set of dom nodes. Each view has it's own DOM Range and views will alter them reactively. We can insert a DOM Range into the actual DOM whenever we want.

### Template.__body__

This is the main template in our app. It’s where all the body parts will be merged into. Did you notice I said "all the body parts"? That's because with Meteor we can have multiple html files with a `body` tag in each of them.

### Blaze.render(view)

This is one of the core APIs of Blaze. It transform a view into a reactive view. This API will generate a DOM Range for the view. DomRange will be returned from the API call and it can be also accessed from `view.domrange`.

### DomRange.attach(parentDom)

Every DomRange has a method called `attach` which attach the domRange into parentDom element.

---

With this information, we can now understand how it generates a JavaScript file and learn more about Blaze. First let's look at the following code from the `template.app.js`:

~~~js
var bodyContent = Template.__body__.__contentParts;
bodyContent.push(Blaze.View('body_content_'+ bodyContent.length, (function() {
  var view = this;
  return [
    Spacebars.include(view.lookupTemplate("postList"))
  ];
})));
~~~

This will create a Blaze view with our body content and push it into `Template.__body__.__contentParts`. When the `Template.__body__` is rendering, it will look for a template called "postList" and render it to the UI also:

~~~js
  // postList template
  Template.__define__("postList", (function() {
    var view = this;
    return [
      HTML.Raw("<h1>Post List</h1>\n  "),
      HTML.UL("\n    ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("posts"));
      },
      function() {
        return [ "\n      ", HTML.LI(Blaze.View(function() {
          return Spacebars.mustache(view.lookup("title"));
        })), "\n    " ];
      }), "\n  ")
    ];
  }));
~~~

This is our actual handlebars template with htmljs and views. The function `Template.__define__` converts it into a template, which can be accessed from `Template.postList`:

~~~js
  Meteor.startup(Template.__body__.__instantiate);
~~~

In order to get a clear picture, let's have a look at the content of `Template.__body__.__instantiate` function.

~~~js
Template.__body__.__instantiate = function () {
  if (Template.__body__.__isInstantiated)
    return;
  Template.__body__.__isInstantiated = true;

  // render body template into a DomRange
  var range = Blaze.render(Template.__body__);
  Template.__body__.__view = range.view;

  // attach DomRange into the document.body
  range.attach(document.body);
};
~~~

Now here is the final part. It will render the UI.body and insert it into the actual DOM(document.body) after Meteor has initialized on the client. That's when you can see the page being displayed on the browser.

I hope now you are pretty clear about Blaze and how it really works. I've not shown you everything, but this information is more than enough to understand Blaze. Most importantly, now you know Blaze is not magic but a well-designed piece of technology :)

## What's Next

Another important thing about Blaze is how it reactively renders data on the screen. That's very interesting and you can explore more about it in my book [Meteor Explained](https://gum.co/meteor-explained). It's in the "Client-Side Reactivity" chapter and you can access it from today.

{% include meteor_explained_book.html %}
