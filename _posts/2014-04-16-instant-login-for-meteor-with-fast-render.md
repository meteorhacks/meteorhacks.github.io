---
layout: blog
title: "Instant Login For Meteor With Fast Render"
category: blog
summery: "We normally use Fast-Render for rendering the initial page quickly in meteor apps that have public-facing interfaces. But also, Fast-Render can be pretty useful for applications that have both private and public views based on the login state."
---

We normally use [Fast-Render](http://meteorhacks.com/fast-render/) for rendering the initial page quickly in meteor apps that have public-facing interfaces. But also, Fast-Render can be pretty useful for applications that have both private and public views based on the login state.

For an example, look at the following template.

![Meteor Template with Login Status Check](https://i.cloudup.com/ZUqPjhYyLh.png)

If there is no user logged in, it renders a template called `guest`, as shown below;

![Without Logged In](https://i.cloudup.com/SfWnvaAaTN.png)

If there is a logged in user, it renders the `dashboard` template:

![With Logged In](https://i.cloudup.com/3dhG5-rJ2Z.png)

Even when there is a logged in user, the Guest template is always rendered when the browser is loading the application. This is because Meteor gets logged in information only when it's connected to the DDP server. See the following video to observe this behavior:

<iframe width="640" height="480" src="https://www.youtube.com/embed/IcmIPoKhuD0" frameborder="0" allowfullscreen="1">
</iframe>

This situation applies, too, if you are routing based on the user status or displaying certain content by checking the user status with a template helper.

## Fast-Render Is The Cure

It's simple—all you have to do is add Fast-Render or, if you already have it, update to the newest version. If there is a logged in user, Meteor will render the template for the logged in user directly—it will never render the Guest template on the screen.

Watch the following video to see how this works:

<iframe width="640" height="480" src="https://www.youtube.com/embed/szWRc2ag1Xc" frameborder="0" allowfullscreen="1">
</iframe>

That's what I call _**Instant Login**_.

## How Is This Possible?

Meteor's [accounts-base](https://github.com/meteor/meteor/tree/devel/packages/accounts-base) package has a very special [publication](http://goo.gl/CSjTJ4) which is implemented as a [null publication](http://docs.meteor.com/#meteor_publish) -- that sends logged in user information to the client. 

> If the publication's name is null, it is automatically subscribed when the DDP connection is established.

Fast-Render looks for all the null publications and sends all their documents to the client with the initial HTML. So, Fast-Render really can fix the above mentioned issue.
To experience Instant Login, add Fast-Render to your project with `mrt add fast-render` -- it just works.