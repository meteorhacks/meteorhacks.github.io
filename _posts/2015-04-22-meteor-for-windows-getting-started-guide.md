---
layout: blog
title: "Meteor for Windows: Getting Started Guide"
category: blog
summery: "This is a guide help Windows developers to get started on Meteor."
---

Meteor now officially works on Windows and you can feel the taste of Meteor right on your PC. This is a guide made for Windows developers to get started with Meteor.

## Installing Meteor

Installing Meteor is pretty simple. [Download](https://www.meteor.com/install) it from the Meteor website and install it on your PC. 

Meteor does not need any kind of server like Apache to run these apps. Meteor app itself is the server. So, you don't need any other dependency.

After you've installed Meteor, you can start playing with Meteor. But, before we start that, I need to make sure we are on the same page.

## Windows Command Prompt Basics

Meteor run as a command prompt app. So, we need to have some basic knowledge on using the command prompt. But don't worry, you don't need master it. You just need to know few simple commands. 

> If you are quite familiar with the Windows command prompt, feel free to skip this section.

Command prompt is an alternative way to interact with your Operating System. It's a text based interface, sometimes it's very powerful. First of all we need to open a Windows command prompt. Here's how to do that:

* Click on the start menu and search for "cmd". You'll get a single result. Run that application. Now you've a command prompt

![Windows Terminal](https://cldup.com/BNv2LgXT9l.png)

With that we can browser through our file system and invoke commands. In this lesson, we'll only look at the basic file system navigations. That's only you need to know about to get started with Meteor.

### File System Navigation

Here are the essential file system navigation commands:

* `dir` - List all the files and directories in the current location.
* `cd <my-folder-name>` - Enter into the `my-folder-name`. This can be a relative path like "my-folder" or a full path like "C:\Users\Administrator\myapps\abc"
* `cd ..` - Go backwards
* `cd ..\..` - Go backwards two times. You can go bank as many steps as you need with this pattern.
* `E:` - Simply change into a different hard drive or a partition. (Change 'E' with your actual drive letter)
* `mkdir <my-new-folder>` - Create a new folder.

Watch the following video to watch how to use above commands:

<iframe width="640" height="420" src="https://www.youtube.com/embed/bZyAsrnJGrc" frameborder="0" allowfullscreen="1">
</iframe>

<br/>

> There are better terminals (and terminal emulators) than the Command Prompt. So, let me list few of them:
> 
>* [Windows Powershell](http://en.wikipedia.org/wiki/Windows_PowerShell)
>* [cmder](http://gooseberrycreative.com/cmder/)
>* [ConEmu](https://code.google.com/p/conemu-maximus5/)

## Text Editor vs IDEs

You'll be writing Meteor apps in JavaScript. So, you don't need do to any compilation and complex tasks to run a Meteor app. So, you only need a text editor to write a Meteor app. You don't need an IDE at all.

These days, we've quite powerful text editors with lot of cool features. You can use any of them. Here are few of such:

* [Sublime Text 3](http://www.sublimetext.com/3)
* [Atom](https://atom.io)
* [Brackets](http://brackets.io/)

## Start Learning Meteor

Now, we can start learning Meteor!

There are many resources available online to learn Meteor. So, let me show you some of them.

* [Official Getting Started Guide](https://www.meteor.com/learn)
* [Meteor Tutorial](http://meteortips.com/book/)
* [Discover Meteor](https://www.discovermeteor.com/)
* [BulletProof Meteor](https://bulletproofmeteor.com/) (to improve performance and for best practices)

You can also check [this guide](https://www.yauh.de/best-learning-resources-for-meteorjs/) to see most of the other resources.

## Deploying Meteor Apps

Let's say now you've a pretty good Meteor app. Now you need to deploy it. Here are some solutions to do that.

### Meteor Deploy

This is the easiest way to deploy your Meteor app. Simply type `meteor deploy <sub-domain-name>` to deploy your app into the Meteor's public cloud. Meteor Deploy is just for testing purpose and you should not run any production apps with it.

### Meteor Up

Meteor Up is a way to deploy a meteor app into Ubuntu servers. Once you configure it, it's just like Meteor Deploy.

To use Meteor Up, first you need to install NodeJS into your PC. And then, type following command in the command prompt to install Meteor Up.

~~~
npm install -g mup
~~~

Then you'll have a command called `mup` inside the command prompt and you can use that to deploy your app. Follow the [Meteor Up](https://github.com/arunoda/meteor-up) documentation to how to setup it.

![Meteor Up on Windows](https://cldup.com/qYE-lRxD5t.png)

Trust me. Meteor Up is pretty easy to use and trusted by thousands of developers. It's one of the best ways to deploy a production meteor app.

### Modulus

If you are looking for a cloud hosting service, Modulus is a service which has built in Meteor support. To learn more about Modulus, visit their [website](http://modulus.io/).

### Galaxy

[Galaxy](https://trello.com/c/FMdB7GAu/78-galaxy-managed-meteor-deploy-to-your-own-servers) is the Meteor's production ready hosting solution. Meteor team is working very hard for that and it'll be available for us soon.

## What Next?

Try to use [Kadira](https://kadira.io/), it's a performance monitoring service for Meteor. You can track down a lot of issues in your app before they make a trouble. Also, it's a good idea to see what's happening inside the app. Kadira make it super easy and fun.

[![Kadira UI](https://cldup.com/opvVPV6KEk.png)](https://kadira.io/)

Let me you show you some resources to ask help. You can use [StackOverflow](http://stackoverflow.com/questions/tagged/meteor) to ask programming related question. You can also use [Meteor Forums](https://forums.meteor.com/) to ask other kinds of questions.

Finally, don't forget to check [crater.io](https://crater.io/) for latest Meteor news.