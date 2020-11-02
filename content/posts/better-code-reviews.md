+++
title = "3 tips for better code reviews"
slug = "better-code-reviews"

date = "2020-10-29"
tags = []
categories = ["blog"]
+++

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/dzgapwtgr1n6xbl6qkku.png)

# Introduction

Just like death and taxes, code reviews are simply a part of life. We've all had them, and some of us have even given them. Why is it then, that many of us are so bad at it?

The purpose of a code review is simple: to ensure that the code being merged into the codebase is up to a certain standard. On paper it sounds easy, but it becomes a lot more complicated when you factor in the interpersonal dynamics at work.

The secret is that code reviews can be done well, and without a great deal of pain. In this post, I will outline some guidelines and tips for enabling a better code review process within your organisation.

## Leave your ego at the door

Code reviews are not an opportunity for the people you work with to criticise you through the medium of code. If a colleague points out an improvement to make to your code, it is almost never because they hate you.

On the other side of the table: code reviews are not a time for you to mercilessly rip into someone because they bruised your ego in a meeting or took the last doughnut.

Code reviews are an opportunity to collectively make better software, and should be seen as nothing else.

## Automate what you can

Code reviews can be a time consuming exercise, especially when we have our own work to be doing too. A lot of time can be wasted on flagging up typos, dead code- not to mention the political hand grenade that is naming conventions.

Luckily, most of us are using build tools nowadays and we can add things like unit test runners and  linters such as ESLint for JavaScript/TypeScript into the build process. This allows us to focus on more important things in a code review, such as verifying that the code actually solves the business problem.

Also, by automating these checks you are delegating checking for simple bugs and stylistic errors to an automatic process, and you can't argue with a machine. Most of these checks can be run before every commit too, so offending code never actually makes it into the repository in the first place.

## Good is better than perfect

Code can always be improved, but anything past good code is diminishing returns. As much as we all want to think that we write flawless code, there is almost always some improvement that can be made.

Sometimes you will encounter a piece of code that passes all of the tests and is by all accounts good code, but you think of something that would make it better. Unless your change would make the code objectively better i.e. more efficient or more readable, just leave it.

It's easy to disappear down a rabbit hole, and at the end you've spent an extra 2 days refactoring the code but it adds no further value to the product, and at the end of the day that's the most important thing.