---
layout: blog
title: "Introducing Sikka: A Firewall for Meteor Apps"
category: blog
summery: "Sikka is an application-layer firewall for Meteor. It can do rate limiting and protect your app from DOS attacks. This is just the first release. We've plans to detect and prevent more Meteor relates security issues with Sikka."
---

Just like any other web app, Meteor is also vulnerable to most of the security issues on the web. Since Meteor does not use cookies and because it uses WebSockets for everything, you don't need to worry about [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks. Meteor also comes with easy ways to fight XSS with its [browser policy](https://meteorhacks.com/xss-and-meteor.html) package.

But, it's not immune to [DOS](http://en.wikipedia.org/wiki/Denial-of-service_attack) and DOS-like attacks. Due to Meteor's WebSocket usage, it's super easy for someone to invoke a DOS attack against a Meteor app. For this, the attacker doesn’t need to use sophisticated tools or techniques. 

Let me show you how to invoke such a DOS attack just using a web browser.

> I am not going to include any code for these attacks. Please don't try these attacks on other people's apps. It's illegal. 

<iframe width="640" height="480" src="https://www.youtube.com/embed/S0SExEI57oI" frameborder="0" allowfullscreen="1">
</iframe>

**Ooops! This is super bad.**

Yes, it is. This is not only a common issue for Meteor, but for any app built with WebSockets. 
So, how can we fix this?

## Introducing Sikka

[Sikka](https://github.com/meteorhacks/sikka) is an application-layer firewall for Meteor. We are releasing the first version of Sikka with support for rate limiting and human  (captcha) verification.

You can block DOS attacks by simply adding Sikka into your app. Once someone invokes a DOS attack, their IP is banned and Sikka will challenge them with a captcha as shown below: <br>
(which allows legitimate users from that IP to browse your app as normal):

![Sikka - A Firewall for Meteor Apps](https://cldup.com/7LLtciFLqg.png)

Check out this demo:

<iframe width="640" height="480" src="https://www.youtube.com/embed/VITk4iuvpx0" frameborder="0" allowfullscreen="1">
</iframe>

We've tested Sikka with plenty of Meteor deployment options and it works pretty well. Add Sikka to your app and protect it from potential attacks.

It doesn’t take 5 minutes to add and configure Sikka. Check out our [docs](https://github.com/meteorhacks/sikka).

## The Future

This is just our first release. We have a list of features for detecting various kinds of Meteor-related threats and anomalies. We'll add them as we go.

We are also looking to integrate both [Kadira](https://kadira.io/) and [Cloudflare](https://www.cloudflare.com) with Sikka. Then you will be able to see a list of potential threats in Kadira and click a button to ban that IP directly from Cloudflare. You'll be able to add rules to ban IPs automatically.

We expect to release the Kadira/Cloudflare integration before the end of this year or sooner. Stay tuned!