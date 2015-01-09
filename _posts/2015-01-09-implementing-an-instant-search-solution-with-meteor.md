---
layout: blog
title: "Implementing an Instant Search Solution with Meteor"
category: blog
summery: "In this blog post, I'll show you how to build an instant search solution for your Meteor app very easily."
---

I think that I don't need to say much about instant searching. I am sure not sure who came up with the idea first, but Google made it so popular. 

So, today I will show you how to build such an instant search solution with Meteor. To demo it, I'll build a super fast search app to search Meteor packages. You can try it live from [here](http://instant-search-demo.meteor.com/) or watch the following video: 

<iframe width="640" height="480" src="//www.youtube.com/embed/dXm2pf-9UZk" frameborder="0" allowfullscreen="1">
</iframe>

When we are building a solution like this, we could use a project like [typeahead.js](https://twitter.github.io/typeahead.js/). But, then it would be extremely hard to customize it as we want. Therefore, we are using a different approach to build the instant search functionality for this application. 

## Introducing Search Source

[Search Source](https://github.com/meteorhacks/search-source) is a reactive data store specially built for searching. Let me show you some features:

* server client data synchronization
* supports any search backend (MongoDB, Elasticsearch, etc.)
* client-side search support
* client-side data caching 
* text highlight and data transformation
* metadata support (time elapsed, search count)

Let's give it a try. 

First add Search Source to your app: 

~~~js
meteor add meteorhacks:search-source
~~~

Then create a source in the client:

~~~js
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['packageName', 'description'];

PackageSearch = new SearchSource('packages', fields, options);
~~~

Then define the data source in the server. In this case, we are doing a regular expression search, fetching data and sending them to the client: 

~~~js
SearchSource.defineSource('packages', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {packageName: regExp},
      {description: regExp}
    ]};
    
    return Packages.find(selector, options).fetch();
  } else {
    return Packages.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
~~~

After that, we can get a reactive data source for this source, which can be used to render templates:

~~~js
Template.searchResult.helpers({
  getPackages: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return PackageSearch.getStatus().loading;
  }
});
~~~

In the above, we have used a transform function to highlight terms we are searching. You can use it in different ways to alter selected text according to the search.

And then since we have transformed the search result and put some HTML into the text, we need to render the fields inside braces tripple braces like below:

<script src="https://gist.github.com/arunoda/c5a269e53e0382fc2db3.js">
</script>

Now everything is ready. But we haven’t implemented the search functionality yet. It's very simple to do so. We can create a key-up event like below and invoke the search method of the data source: 

~~~js
Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200)
});
~~~

in the above code, we have used `_.throttle` to avoid sending every keystroke to the server. 

Now we've a pretty decent search app. See: <http://instant-search-demo.meteor.com/>

Complete source code for this app is [available](https://github.com/meteorhacks-samples/meteor-instant-search-demo) on GitHub.

There are some other cool features in "Search Source" like metadata handling. Go check out the [documentation](https://github.com/meteorhacks/search-source) of Search Source.

## Learn more about searching 

Searching is a huge topic and the search backend needs to be robust if we want to build a fast and accurate search solution. 

In this example, we have used MongoDB regular expression queries for the search. But it's not an ideal solution. For better results, we can use a MongoDB full text search or Elasticsearch instead. 

We cover these topics in depth on BulletProof Meteor:

* [Searching with MongoDB](https://bulletproofmeteor.com/database-modeling/searching-with-mongodb)
* [Searching with Elastic Search](https://bulletproofmeteor.com/database-modeling/searching-with-elastic-search)
* [Building a Real-World Search App – Meteor Package Search](https://bulletproofmeteor.com/database-modeling/building-a-real-world-search-app-meteor-package-search)

----

What do you think about Search Source? Give it a try and let me know how it works for you. 