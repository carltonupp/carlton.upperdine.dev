+++
title = "Migrating to Hugo"
slug = "migrating-to-hugo"

date = "2019-07-27"
tags = ["hugo", "azure", "devops"]
categories = ["blog"]
+++

Last night I did something cool that I feel the need to share. I migrated this site from WordPress to Hugo. When I say last night, I mean I literally got home from work, created the blog from scratch and ported over everything in my WordPress site to my new Hugo site.

For those that aren't aware, [Hugo](https://gohugo.io/) is a static site generator built with Go, and it is amazingly fast. Because it's a static site generator, this means I no longer have to shell out for a database to hold my blog posts, and saving money is among my favourite activities. Another benefit to static site hosting is that it will make for a very quick site as there will be no calls to a database, simply HTML files being served.

Now that my site is static, I am able to host it in Azure Blob Storage and serve it over HTTPS using Azure's Static Website service. Azure Blob Storage is incredibly cheap, and hosting my site in this way will cost me *pennies* each month, as opposed to spending around £20 per quarter on my WordPress hosting.

In order to get my changes into Azure, I have created an Azure DevOps pipeline that watches my public GitHub repo for commits to the master branch, then performs a Hugo build operation on the source to generate html files from the markdown I have written. From here, it transfers my artifact into Blob Storage. Creating this pipeline took literally five minutes and worked on the first try, which is exactly why I love Azure DevOps.

![An end-to-end view of my pipeline](../../images/blogpipeline.png)

I found this whole process very satisfying, and the end to end toolchain detailed above is composed entirely of technologies owned by Microsoft! In future when people dismiss Microsoft as old fashioned and stuffy, I'll point them in the direction of this post.