+++
title = "Chaos Engineering your onboarding experience"
slug = "chaos-engineering-your-onboarding-experience"

date = "2020-10-29"
tags = []
categories = ["blog"]
+++

Today I did something very stupid: I nuked my database. After I finished my foul-mouthed tirade (sorry mum), I started to pick up the pieces of my broken dev environment. It was at this point that I started thinking of chaos engineering.

For those not in the know: chaos engineering is a practice where you purposely kill or maim parts of your system (e.g. services, databases) in order to evaluate how fault tolerant your system is. By making system failures a part of daily life, you are forced to adapt and make your systems more resilient.

## What does this have to do with me knackering up my database?

By nuking my own database, I had inadvertently began a chaos engineering experiment on the developer onboarding experience for my current project. How long it would take to recover from this would be indicative of how good the onboarding experience was.

I was applying the principles of chaos engineering, usually reserved for computer systems, to a "real world" process. Luckily I was back on my feet in under 5 minutes, which in my opinion is a win.

## What did I learn from this experiment?

Firstly, I need to double check **EVERYTHING** that I execute in SQL Server Management Studio. This entire thing could have been avoided if I'd have simply not been so trigger happy with a `DROP DATABASE` command.

Perhaps the biggest lesson however was that the onboarding experience for a project can have a great impact on productivity. We often judge the quality of a code base on factors such as code coverage, or adherence to coding standards, but perhaps we should start including the onboarding experience in that. 

I've worked on systems that were fantastic on paper: very high code coverage, adherence to SOLID principles, trendy front-end technologies - but they sometimes took over a week to get up and running!

I won't go as far as automatically nuking my database at random intervals, but this whole experience taught me the importance of a good onboarding experience.