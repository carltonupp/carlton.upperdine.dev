+++
title = "Spring Cleaning: Setting up a fresh MacBook for polyglot development"
slug = "spring-cleaning"

date = "2019-03-24"
tags = ["vagrant", "polyglot", "macOS"]
categories = ["blog"]
+++


Something I have done for as long as I’ve owned a computer is a regular reinstall of the operating system, allowing me to essentially start fresh and get rid of any “baggage” such as unused installations or dormant coding projects. I’m the tech industry’s answer to Marie Kondo.

Despite owning a MacBook Pro for around 4 years now, I have neglected to do any kind of this “spring cleaning” on it. I am something of a polyglot, and aside from my day job of developing applications using the .NET platform, I have a habit of bouncing around various ecosystems such as Python, Ruby, Node, Java and Elixir. The problem with bouncing around different technology stacks is that not all of them are things that I am ever likely to go back to (looking at you, PHP), so over time my hard drive became cluttered with various unused runtimes and global package installations. 

So, starting out with a freshly installed MacBook Pro running a copy of macOS Mojave:


1. **Clear up the dock**  
  After completing my fresh install of MacOS Mojave, I was left with a very naked MacBook Pro. I had forgotten how cluttered the dock is on a fresh install, so my first task is to clear that down to just the things that I actually use. Completely optional, but you minimalists out there will understand.
2. **Install Xcode Command Line Tools**  
  Before I can install a couple of the items further down my list, I have to install the Xcode Command Line Tools from Apple. Alternatively, I could install the entire Xcode IDE from the App Store, but this would be overkill and I’m trying to keep things as minimalistic as possible. If you are an iOS or macOS developer, you’ll require the entire IDE anyway.
3. **Install Homebrew**  
  Homebrew is one of those tools that you honestly don’t realise how much you like it until it’s taken away from you. I don’t feel like I need to cover this one in great detail, as just about any developer with a mac is probably already running Homebrew, so I’ll just get this installed and move on.
4. **Install Git**  
  Again, git should be no surprise to any developer, as it’s overwhelmingly the most popular version control system used throughout the world. Using Homebrew, installing git is as simple as: brew install git 
And that’s it!
5. **Install Visual Studio Code**  
  This step could really be replaced with any text editor such as Sublime Text, Atom, or even Notepad++ for the masochists among you. I like VS Code because of the rich ecosystem of extensions it has for just about any platform, which is nice for someone that bounces between ecosystems as much as I do.
6. **Install Vagrant**  
  Vagrant is an incredible tool for quickly provisioning local development environments. I will be covering my usage of Vagrant in a dedicated blog post, but for now getting it installed is all that is required. This is something I intend on using quite heavily moving forward, and I would highly recommend giving it a go. An alternative to this would be Docker, though they are not exactly the same, and I generally prefer Vagrant.

After installing all of this, I now have a MacBook Pro that is far less cluttered and set up for long term maintainability. If I have done this correctly, I shouldn’t ever have to do this again!