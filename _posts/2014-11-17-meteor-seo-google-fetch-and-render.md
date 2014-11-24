---
layout: blog
title: "Meteor SEO - Google Fetch & Render"
category: blog
summery: "Earlier this year, Google announced that Googlebot had started to render web pages using a modern browser instead of just looking at HTML. I did an experiment on this with a Meteor app, here are the results."
---

Earlier this year, Google announced that Googlebot had started to [render](http://googlewebmastercentral.blogspot.com/2014/05/rendering-pages-with-fetch-as-google.html) web pages using a modern browser instead of just looking at HTML. This was great news for anyone using Meteor, as we'd had some difficulties with SEO.

> If you need to learn about basics of Meteor and SEO, refer this [article](http://www.manuel-schoebel.com/blog/meteor-and-seo).

So, alongside the launch of our course, [BulletProof Meteor](https://bulletproofmeteor.com/), I decided to do an experiment to see whether Googlebot's new feature worked with Meteor apps. Here are the results.

## Without Spiderable

First, I removed the spiderable package from the Bulletproof Meteor app and deployed it. Then I visited Google Webmaster Tools and under "Crawl", selected "Fetch as Google", then clicked "Fetch and Render".

Here's what I got back:

![BulletProof Meteor inside Google WebMaster Tools](https://cldup.com/IFuZfWGrW1.png)

Awesome! Google had correctly rendered my app. However, if you look the bottom of the above image, you'll notice that the SockJS connections failed. So then how did Googlebot get the data to render the page?

Answer: because [Fast Render](https://github.com/meteorhacks/fast-render) sent the data along with the initial page load. This is an another reason you want to use Fast Render with your app :)

> **Note:**<br>
> Even though Googlebot has the ability to render using JavaScript, it still can't handle WebSockets or AJAX requests.

### Search Results

So technically, Google was now aware of some of the content of Bulletproof Meteor without any help from spiderable. Because of that, I expected Google to index BulletProof Meteor properly. But this is what the results looked like after a few days:

![BulletProof Meteor without Spiderable](https://cldup.com/sfe3Dc1D7e.png)

Hmm. What was going on here? There was no phrase like "BulletProof Meteor is Here!" inside the app. But I did remember posting links on crater.io and some other sites using that title.

It seemed like even though Googlebot was indexing my app, it still couldn't read my app. But wait, the app had been rendered just fine by Googlebot! I'll come back to this again in a second.

## Hello again, Spiderable

So I decided to re-add spiderable to the app and see if that made a difference. After about 24 hours, I checked Google again and this is what I saw:

![BulletProof Meteor with Spiderable](https://cldup.com/Jc_a3WqRZi.png)

After re-adding spiderable, it looked like Googlebot could finally index the app and see what was inside it.

## Conclusion

I put BulletProof Meteor through the whole process a second time and the results were the same. So it seems like even though Googlebot can now render pages, it won't do it for all websites. Maybe Google is trying to prevent fraud. That would be quite understandable as it takes a massive amount of resources to render the entire internet.

So at this moment, we still need to depend on spiderable. But it's still a good idea to add Fast Render to your app and allow Googlebot to see what's inside. It might increase your app's ranking.

> Edited and proofread by [Mitchell Wulfman](https://www.linkedin.com/profile/view?id=135477114&authType=name&authToken=xFLU&trk=api*a109924*s118458*) ([@wulfmeister](https://twitter.com/wulfmeister)).
