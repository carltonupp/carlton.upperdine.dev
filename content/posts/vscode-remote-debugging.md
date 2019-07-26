+++
title = "Visual Studio Code’s Remote Development Extension Pack"
slug = "vscode-remote-debugging"

date = "2019-06-24"
tags = ["vagrant", "polyglot", "vscode"]
categories = ["blog"]
+++
I’m a huge fan of Vagrant. It’s absolutely perfect for spinning up a simple, disposable environment and avoids cluttering your hard drive. For the most part, it’s relatively painless to write code in Visual Studio Code and run it in my Vagrant box, but my experiences of getting the debugging features to work have left a lot to be desired. Visual Studio Code’s debugging is, for the most part, geared towards debugging code on the host machine instead of a virtual guest machine, so inevitably there will be a few issues encountered along the way.

In comes the Remote Development extension pack: a set of extensions for Visual Studio Code that makes development on a remote machine far more pleasant an experience. This can be found on the Marketplace and includes support for SSH, Windows Subsystem for Linux (WSL) and Containers. This is not only fantastic for people running disposable environments, but also people with an aversion to editing files on a server in Vim (and subsequently being unable to exit). 

![The extension in VS Code's marketplace](../../images/vscode-extension.png)

Once installed, connecting to a vagrant machine is a nice, simple process. 


***Note: you will require an ssh client on your machine for this to work.***


Open up your terminal, navigate to the directory containing your .Vagrantfile and enter 
  ~~~
vagrant ssh-config > vagrant-ssh
~~~
This should create a new file in your directory and opening it in notepad should show something resembling:
~~~
  Host default
   HostName 127.0.0.1
   User vagrant
   Port 2200
   UserKnownHostsFile /dev/null
   StrictHostKeyChecking no
   PasswordAuthentication no
  etc
~~~

Back in Visual Studio Code, press **F1** and select the command `Remote-SSH: Open Configuration` File then select the relevant configuration file. This should open a config file, and in here you should paste in the details from your vagrant-ssh file that you created earlier. Once this is done, save the config file, enter the command `Remote-SSH: Connect Current Window to host` and then select your host name from the drop-down list that appears. From here, you should now see an icon in the bottom left corner saying something along the lines of `SSH: <hostname>` and this means you are successfully connected remotely to your Vagrant machine!

Once you are working in a Remote Development session, debugging will work as if running the code on your own machine. Another bonus is the ability to install extensions just for the remote environment, so that extensions list can remain nice and tidy, only containing the extensions that are explicitly required for that environment. The Remote Development pack also adds an additional menu to the sidebar that allows you to view your SSH connections, making connecting to a Vagrant machine incredibly simple once this has been set up!

I only discovered this a few days ago myself, but it has removed a lot of headaches from my workflow and I can see it being a staple on all of my development machines going forward.