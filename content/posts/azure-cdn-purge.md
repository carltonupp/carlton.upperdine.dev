+++
title = "Fix caching issues on Azure static websites"
slug = "azure-cdn-purge"

date = "2019-11-22"
tags = ["hugo", "azure", "devops"]
categories = ["blog"]
+++

Since migrating my site over to an Azure static website, my hosting costs remain a modest £0.20/month. My Azure DevOps pipeline still holds together like a champ and effortlessly deploys my changes upon pushing to the master branch on my GitHub repository. Life is generally good in that respect.

One gripe I do have with my static website is how long it takes for the CDN to update with the latest changes. The other day, I pushed some changes to my [About](/about/) page and replaced my avatar image, but 12 hours after my changes were deployed to Azure I was still seeing the old version of my site. A CDN will keep a cached version of the site to prevent more reads from storage than necessary and keep my costs low.

After some reading, I learned that you are able to purge a CDN endpoint and force it to retrieve the latest files from the storage account. Doing this manually is as simple as clicking a button, but I wanted this to be included in my CI/CD pipeline. Low and behold, a simple search of the Azure DevOps Marketplace for 'Purge CDN Endpoint' yielded exactly what I was after.

![The Purge Azure CDN Endpoint task](../../images/purge-cdn-endpoint.png)

After installing this task and adding it to my release process, setting it up is as simple as pointing it towards the CDN Endpoint that you would like to purge. Now that this is part of the pipeline, I shouldn't get any further caching issues, and will see my changes as soon as they are deployed.
