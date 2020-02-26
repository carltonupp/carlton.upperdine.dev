+++
title = "A New Stack: Setting the scene"
slug = "picking-a-tech-stack"

date = "2020-02-24"
tags = ["careers", "ecosystems", "code", "industry trends"]
categories = ["blog"]
+++

# Introduction

I want to start by saying that this is mostly a harmless evaluation of what lies outside of the .NET world. I'm perfectly happy where I am currently, and am not currently looking for another job. Now that I've got my disclaimer/damage control with my employer out of the way, it's time to get stuck in.

C# is a fantastic language: it is feature-rich, performant, and has very elegant syntax. It's closest relative language is arguably Java, but C# absolutely blows it out of the water. However, where Java lags behind in terms of language features, it is light years ahead in terms of it's ecosystem. Historically, .NET was always exclusive to the Windows platform, which meant developers wanting to develop for a Linux platform were forced to use an alternative. 

This exclusivity has created a divide between .NET developers and the rest of the industry, with .NET frequently being isolated into it's own bubble and not really given a seat at the table. I remember reading a blog post by the CEO of a company saying he doesn't hire developers with .NET on their CV, though he did eventually give in to peer pressure and backpedal on this. We are the red-headed stepchildren of the software development community.

The release of .NET Core heralded a new era of .NET development: it is now cross-platform and open source, and the tooling from Microsoft is getting better and better with every version. Developers should be flocking to the ecosystem, discovering how great a language C# is, but they aren't. While the technology has improved, the .NET community is just as dull and homogenous as it always has been, and is still for the most part building the same boring, line-of-business type applications. It is for this reason that I am unlikely to use .NET in my next job.

In this post, I will compare and contrast the tech stacks that are currently being used in the industry, and use this comparison to steer myself towards a new stack. As I mentioned at the beginning of this post, this is mostly harmless and being written for catharsis to ease my frustrations about the .NET ecosystem.

# What constitutes a stack?

In recent years, the rise of 'full-stack' development has seen the skillset of the average developer widen greatly. Previously, it was enough to know how to build an MVC web application with your language of choice, perhaps even a little bit of database knowledge sprinkled in there, but now you need to know a little bit of everything from the front end down to the infrastructure it's hosted on.

With this in mind, I believe that a modern technology stack for cloud-native web applications is generally made up of the following components:

* a language
* a server side framework
* a client side framework
* a database
* a data-access framework, such as an ORM
* a hosting environment

This seems like a lot of big decisions to make, but once you've chosen your language, the rest should fall into place.

# Criteria for a modern tech stack

I will be evaluating a number of different stacks against eachother, mainly for their ability to build modern web applications. In order to compare things fairly, I will be evaluating each stack based on the same criteria. In order to consider a tech stack as viable, I believe it must possess the following qualities and capabilities:

* Easily hostable on a public cloud (i.e. Azure/AWS/GCP)
* In demand- particularly at a local level
* Performant
* Good dependency management