+++
title = "Microservices: the fine print"
slug = "microservices-the-fine-print"

date = "2020-08-09"
tags = []
categories = ["blog"]
+++

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/n6fgw3pk9pv5uxijiwv1.png)

Unless you've been living under a rock for the past few years, you'll have no doubt heard about the wonders of microservices. It's an approach to building and delivering software that has been adopted by the likes of tech giants such as Netflix and Uber, and now it's found its way into enterprise software.

Microservice architectures have a lot of benefits, and decoupling your applications into smaller components is generally a great idea. However, for every advantage that adopting microservices has, there are conditions that must be met before reaping the rewards.

In this post, I will line out the fine print behind some of the advantages offered by a microservices architecture, and why a great number of organisations are not seeing the benefits promised to them by conference speakers and expensive consultants.

### Greater fault tolerance
**Microservices aren't inherently fault tolerant.**

One of the most commonly flaunted arguments for microservices is that your application will be more fault tolerant than the monolithic alternative. The idea behind this is that a single component of the application failing will not bring down the entire application because they are running as separate processes, which is indeed true.

However, unless you have specifically built your applications with fault tolerance in mind, you're simply increasing your points of failure from one to *exp(n)*, where *n* is the number of microservices you have. When you adopt microservices, you also adopt the challenges associated with distributed computing, and ignorance of these challenges is a sure fire way of making your application more brittle than ever.

### Lower cognitive load
**This goes out of the window if you're responsible for multiple services.**

Being able to focus on a single part of the application domain means new team members can become productive much quicker than they would on a monolithic application. It's very important to note, however, that microservices are just as much an organisational pattern as they are architectural.

If your team is responsible for every service in the application, onboarding a new team member is far slower than on a monolith. Having a new member of staff try to get 10 microservices and backing services set up on their machine is just plain cruel, even with Docker. And don't get me started on if the microservices are all written in different languages.

### Deploy more often
**Continuous delivery requires a lot more than microservices in order to succeed.**

We've all heard the stories about hundreds of production deployments per day at the big tech companies. It must be a *best practice™* if Uber and Netflix are doing it. Being able to deploy to production multiple times per day stops us developers having to be in the office by 6AM for the classic 'big bang' deployments, so I am naturally a huge fan of this.

However, you can only deliver software as fast as your organisation allows you to. In order to achieve the holy grail of continuous delivery, you need organisational buy-in from the top down, and a lot of ops managers out there are very reluctant to let go of their change management processes. There are a number of rather large books out there dedicated to this topic, so it's never going to be as simple as *"we'll just do microservices"*.

### Safer deployments
**Buggy code will break production regardless of how many parts it's split into.**

I mentioned 'big bang' deployments, where the entire application is taken offline for a period of time while the application is updated, and potentially the database migrations are run. There is a lot than can (and frequently, does) go wrong in these situations, so only deploying a single service would mean you are reducing the number of things than can go wrong.

If you are not deploying quality code, you are not going to have safer deployments regardless of your architecture. I understand that *quality* is a very loaded term, but I mean quality in the simplest of forms in that it does what it's supposed to do. You check that the code is doing what it's supposed to do by testing the code. In order to do this in a manner that would prevent a bad deployment, you need to invest in automated testing and ideally integrate this into your pipelines.

### Conclusion

Reading this may give you the impression that I don't like microservices, but this is simply not true. I think microservices are a fantastic way to build software, and many teams have had incredible success by adopting them.

It is important to note, however, that they are not a silver bullet for all of our problems. Implementing microservices requires far more than simply splitting your application into APIs: it requires an organisational shift, and solutions for problems not required in a monolithic application.