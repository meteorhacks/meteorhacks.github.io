---
layout: pro-meteor-post
title: Cloudflare Meets Meteor
category: prometeor
summery: "Cloudflare is a valuable service that helps web apps to improve performance and security. This article demonstrates how to use Cloudflare with Meteor correctly."
---

If you have not yet heard about [Cloudflare](https://www.cloudflare.com/), it's a must-have item for your web toolbox. It offers many services for web apps—primarily for increased performance and security. Here is a list of services Cloudflare offers (in ordered of my personal preference).

* Simple DNS Management
* SSL Support
* Caching Proxy (with CDN) for your static files
* Optimize HTML and static files for faster loading
* Web Application Firewall
* DDOS Protection

In addition to these features, Cloudflare's pricing model is extremely attractive. Cloudflare does not charge for the usage: instead, it offers an affordable per-application flat fee.  Of course, a free tier is offered as well.

Using Meteor with Cloudflare is a bit tricky, as Meteor's DDP connection uses WebSockets, which is not supported by Cloudflare yet. But with few simple tweaks, you will be able to use Meteor with Cloudflare.

> This is not a guide on how to use Cloudflare's features, but on how to use Cloudflare with Meteor

## DDP and Cloudflare

Cloudflare runs on top of a customized nginx server but it does not yet support WebSockets. If you've just added Cloudflare support to your Meteor app, you'll find issues connecting to the DDP server. You have two options here.

### Option 1: Disable WebSockets

![Using Cloudflare with Disabling WebSockets](https://i.cloudup.com/P5oTDD9Yxe.png)

This is the simplest and the best option. All you have to do is export the following environment variable before starting your Meteor app.

    export DISABLE_WEBSOCKETS=1

### Option 2: Use a separate subdomain for the DDP connection

![Using Cloudflare with WebSockets](https://i.cloudup.com/cQcVFWZYCp.png)

With this option, you can continue to use WebSockets with your Meteor app, but you will not be able to use some of the Cloudflare's features. All you need to do is add a separate DDP connection to your Meteor app, which will bypass Cloudflare. Follow the steps below:

* Add a CNAME or A record called “ddp” pointing to the your Meteor App
* Bypass Cloudflare by not clicking the cloud icon on the DNS manager. (It needs to be grey.)
* Add the above subdomain as your default DDP connection by exporting the following environmental variable before starting your Meteor app.

~~~
export DDP_DEFAULT_CONNECTION_URL=http://ddp.yourdomain.com
~~~

Now your DDP connection is bypassing Cloudflare and your Meteor can use WebSockets.

## What are the benefits for using Cloudflare with Meteor?
Now it's time to explore how Cloudflare helps Meteor with Cloudflare's features. However, not all of the features help Meteor; some of them need to be turned off or to be used with care.

### As a Caching Proxy with CDN

As I've [mentioned before](/does-meteor-scale.html#smart_caching), it is not wise to use Meteor to serve static content. Cloudflare proxies all of the static content, such as CSS, JavaScript. and Images by default. As such, your Meteor app is not directly serving any static content, which is exactly what we need. Also, Cloudflare acts as a CDN, so you gain that benefit, too. 

However, Cloudflare does not cache any HTML content. That helps us to load balance our Meteor app correctly with sticky sessions.

### As your SSL terminator + SSL provider

As I've also [previously mentioned](how-to-scale-meteor.html#ssl_with_stud), NodeJS is not good at serving SSL, and Meteor has no option to configure SSL. Therefore, we need to use a separate SSL terminator such as stud or nginx. 

Cloudflare has a very interesting SSL service that acts as both an SSL certificate provider and as an SSL terminator. Simply put, you don't need to buy an SSL certificate and make any configurations; you just need to click a button.

Unfortunately, if you've used Option 2 to allow DDP support, you can't enjoy this feature, as now your DDP connection is bypassing Cloudflare.

> To use SSL support, you need to use the Cloudflare Pro subscription plan

### Turn off Minification and the Rocket Loader

Meteor does already minify all your JS and CSS files.  There is therefore no reason to do so inside Cloudflare. However, minifying multiple times does not break anything.

Cloudflare also has a feature called RocketLoader, which loads JavaScript asynchronously. But Meteor's JavaScript (just a single file) needs to be loaded synchronously, so you will need to turn this off.

Cloudflare has some security options, which asks users to enter a CAPTCHA before entering the site. This is used to block malicious users. Sometimes, your users may be using a shared Internet connection, or the ISP is using a transparent proxy or something similar. This might cause Cloudflare to trigger the CAPTCHA, which might confuse the users of your app.

I really can't say whether it is a good option to turn this off or not. But keep in mind that there is a situation like this also.

### DDOS Protection

First of all, if you are considering this, your app is popular :)

Cloudflare does a good job at handling DDOS, and it has prevented some major attacks. This is how you can gain its benefit

To obtain the DDOS protection, you need to hide the IP address (or direct access) to your Meteor app from the public. This relates to both your main website and the DDP connection. 

If you are using Option 1 with disabling WebSockets, you are already behind Cloudflare, and direct access to your Meteor app is hidden from the public. So whenever you need DDOS protection, you can simply turn it on.

But if you are using **Option 2** with a separate DDP connection, your DDP connection is exposing direct access to your site. This allows the attacker to bypass Cloudflare and directly attack your app. If you are keep using this option, and if you decided to use DDOS protection at a later point, migrate your app (or load balancer) into a new server. Then apply **Option 1** and turn on the DDOS protection.

Hope this article helps you to use Cloudflare with Meteor correctly and handover some responsibilities to it and keep focus on building your app.


