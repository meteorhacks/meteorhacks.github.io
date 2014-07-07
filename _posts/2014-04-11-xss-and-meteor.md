---
layout: blog
title: "Cross Site Scripting(XSS) and Meteor"
category: blog
summery: "Recently, I had reason to do a bit of research on Cross Site Scripting (XSS) and how it affects Meteor. This is what I found out -- I hope this information will help you, too."
---

Recently, I had reason to do a bit of research on Cross Site Scripting (XSS) and how it affects Meteor. This is what I found out -- I hope this information will help you, too. First, let's understand what XSS is.

## What is Cross Site Scripting (XSS)?

XSS is a mechanism where malicious users find a way to execute JavaScript on your app without your knowledge or authorization. This is one of the most common attacks and very hard to prevent if you haven't attended to it in advance.

XSS can be caused by the response generated either by the Server or in the Client with the dynamic content generation. Since Meteor does not do Server Side Rendering yet, we will focus on Client Side XSS.

As an example, let's say I'm working on a community forum site with Meteor that allows users to post links. One of the typical templates looks like this:

<script src="https://gist.github.com/arunoda/728241f800a238d46fa0.js">
</script>

This seems perfectly fine. But, let's say someone adds a post with URL `javascript:alert('hacked')`. Then the rendered DOM will be something like this:

    <a href='javascript:alert("hacked")'>
        Google has direct connections with NSA. They were lying to us.
    </a>

When you click that link, you'll see the alert box as shown below.

![XSS and Meteor](https://i.cloudup.com/nkemRMf91z.png)

The older version of the Telescope Meteor app is also vulnerable to this hack and has avoided it with something like this:

    <a href='/out?url={{url}}'>{{title}}</a>

This is just one type of XSS attack. To learn more, consult the [OWASP XSS guide](https://www.owasp.org/index.php/Types_of_Cross-Site_Scripting).

## How Does XSS Harm Meteor?

This is the most important question. Of course, simply posting an alert message, as in the example above, would not do any harm.

1. With XSS, malicious users have access to the logged in user's DDP connection and can do whatever they need, including altering mongodb and the server state, where the logged in user allows it. 
2. Since Meteor uses localStorage for the session persistent, malicious user can steal a logged in user's identity. I've demonstrated this in a [previous article](http://meteorhacks.com/introducing-portable-meteor-user.html).

## Should I Be Worried?

XSS mostly occurs when your app accepts and displays user generated content. But XSS can still happen even if you are not accepting any user generated content.

For example, maybe you allow users to search your app or display something on the screen based on a URL parameter. Or maybe some of your smart packages or third party JavaScript libraries are vulnerable to XSS. These are just two situations where malicious users applying XSS can cause a lot of trouble for you and your users.

So, it's better to take any measures you can to prevent XSS and related attacks.

## XSS Prevention

### Be Cautious When Adding User Content in Untrusted Areas

The OWASP XSS guide shows some [untrusted areas](http://bit.ly/R92c8z) in the HTML where you might need to focus when adding user content. If your app uses one of those areas, use some defense mechanism to deal with XSS.

### Use Content Security Policy (CSP)

Even if you have made sure to cover all the untrusted code shown above, there is still a chance that you might miss some places.

Sometimes a package you install or a third party library can cause vulnerability to XSS or might do something unintended.

That's where the W3C standard, [Content Security Policy](https://developer.mozilla.org/en-US/docs/Security/CSP/Introducing_Content_Security_Policy), comes in handy. With CSP, a web server can ask the browser to limit some of the actions that cause XSS.

These actions include different methods of JavaScript execution and loading of resources like images, script, and even WebSockets.

Click [here](https://developer.mozilla.org/en-US/docs/Security/CSP/CSP_policy_directives) learn more about CSP directives.

#### Meteor and CSP

Meteor has a package called [`browser-policy`](http://docs.meteor.com/#browserpolicy), which helps you to create CSP rules very easily.

Once you add the package, you will get the following CSP policies by default.

    default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src * 'self'; img-src data: 'self'; style-src 'self' 'unsafe-inline';

This is how we can interpret the above rules, in plain text:

1. You will only be able to load resources from the current origin of your app
2. You won't be able to execute eval or similar functionalities
3. You will be able to use inline scripts and so your app is vulnerable to potential XSS attacks, as I showed in the beginning of the article.
4. You will be able connect to any external service via AJAX, WebSockets, and similar techniques, which also makes your app vulnerable to potential XSS attacks.

These restrictions add some level of protection, but the third and fourth points make your app still vulnerable to XSS.

#### Block Everything, then Allow As Necessary

Add the following code in the server side of your app to remove potential vulnerabilities:

    BrowserPolicy.content.disallowInlineScripts();
    BrowserPolicy.content.disallowConnect();

Adding this code will prevent you from using Meteor's DDP connection, so you should also add the following rules:

    var rootUrl = __meteor_runtime_config__.ROOT_URL;
    BrowserPolicy.content.allowConnectOrigin(rootUrl);
    BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

If you are hosting on meteor.com, you need to add rules like the ones shown below. This is not an ideal solution, since your app is allowed to connect to any app hosted on meteor.com.

    BrowserPolicy.content.allowConnectOrigin("https://*.meteor.com");
    BrowserPolicy.content.allowConnectOrigin("wss://*.meteor.com");

#### Allow Trusted Origins & Resources

Since we blocked all the origins, you will need to allow resources as shown below. Adding something like Google Analytics is tricky, since you need to expand its asynchronous code and allow it to run without inline scripts and eval.

To do this, first add the following code inside the HTML head:

    <script type="text/javascript" src="//www.google-analytics.com/analytics.js"></script>
    <script type="text/javascript" src="/ga.js"></script>

Now create a file called `ga.js` into your public folder and add following content:

    ga("create", "YOUR_GA_ID", "YOUR_WEBSITE");
    ga("send", "pageview");

Finally, add the following CSP permissions:

    //for the script
    BrowserPolicy.content.allowScriptOrigin("*.google-analytics.com");
    //for the tracking pixel
    BrowserPolicy.content.allowImageOrigin("*.google-analytics.com");

Use the [Browser Policy API](docs.meteor.com/#browserpolicy) and [CSP Docs](https://developer.mozilla.org/en-US/docs/Security/CSP/CSP_policy_directives) to allow origins for all the external resources you load. I know this seems hard, but it's well worth the trouble to prevent XSS.

### Fast Render and CSP

Since we blocked inline scripts, Fast Render won't work. I've already decided on a fix and I plan to release it in the next week.

### Beware of Browser Extensions

Although CSP saves us from XSS, browser extensions can defeat CSP.  Refer to [this](https://www.planbox.com/blog/development/coding/bypassing-githubs-content-security-policy-chrome-extension.html) article for more information about this. Although it's not something we should worry much about, it is possible to completely turn off CSP from a browser extension.

Unfortunately, Chrome does not show these modified headers in its developer console. Instead it shows the original headers. Because of this, detecting these kinds of issues is very hard. Since these extensions are installed by the user, we can't do much about it.

In this post I've covered XSS basics and how XSS can be prevented with Meteor. I've also talked about Content Security Policy and how you can implement CSP with Meteor, along with some other facts. I hope this information is useful for you as you work on improving your app's security. I'll post more security related topics in upcoming weeks.
