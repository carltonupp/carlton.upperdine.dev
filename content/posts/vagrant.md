+++
title = "Disposable development environments with Vagrant"
slug = "vagrant"

date = "2019-04-01"
tags = ["vagrant", ".net core", "macOS", "polyglot"]
categories = ["blog"]
+++
![Vagrant by HashiCorp](../../images/vagrant.png)

Vagrant is a tool by HashiCorp that is used for building and managing virtual machine environments via a command line interface. It takes a lot of the pain away from provisioning virtual machines by allowing you to provision a new virtual machine from a single Vagrantfile. 


The painless process of creating a new virtual machine makes Vagrant absolutely perfect for creating throwaway development or test environments. I mentioned in my previous post that I like to jump between languages, which usually leads to my hard drive becoming cluttered with old runtimes and code that I no longer require (the code I do require should be in source control obviously!). By having these lightweight and easily replicated development environments, it means I can easily spin up a new playground and get to work without spending the first couple of hours configuring things.


I’m off to a conference in a couple of days, so I need an environment ready to go for those workshops. The conference I am attending is F# Exchange in London, so as you can imagine I need an environment that has .NET Core installed and I see no better opportunity to let Vagrant shine! So, providing Vagrant and VirtualBox are installed on your machine: lets get started with creating a .NET Core environment!


Create a new folder that you would like to house your environment in, and inside that folder create a new file called Vagrantfile. Open up Vagrantfile in your text editor of choice and paste the following:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
end
```

The above code (Ruby for the curious) is setting the virtual machine’s base image to a Vagrant box that is running Ubuntu 14.04 LTS. Many more of these base images can be found at Vagrant Cloud, or alternatively you could create your own box from scratch if you’re feeling adventurous. From here, the virtual machine is ready to boot up, although it won’t have anything installed on it. The whole point of using Vagrant is that we’ll have a fully fledged development environment available upon creation, without having to do any configuration ourselves, so the next step is to create a shell script that will install the .NET Core SDK. In the same directory as our Vagrantfile, create the following shell script:


```
# bootstrap.sh

apt-get update
 
# add the microsoft feed to the package manager
wget -q https://packages.microsoft.com/config/ubuntu/14.04/packages-microsoft-prod.deb 
dpkg -i packages-microsoft-prod.deb 

# install the dotnet core 2.2 sdk
apt-get install -y apt-transport-https 
apt-get update 
apt-get install -y dotnet-sdk-2.2 
```

Now we just need to reference this script in our Vagrantfile, so it should now look like this:

```ruby
Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.provision :shell, path: "bootstrap.sh"
end 
```

Now it’s time to actually provision the machine! Open the terminal and navigate to the directory that holds your Vagrantfile and shell script, then enter the following command:

```
vagrant up
```

This process could take a while, as the first time you provision a box it needs to download the base image from the repository. This will only happen on the first time you provision it, as the box is saved on the machine for future use. 


Once the machine has finished, it’s time to connect to it and see if our bootstrap script worked! We connect to a Vagrant machine by using the following command:

```
vagrant ssh
```

And once you are connected to the virtual machine, we can check that dotnet core is installed by running the following command:

```
dotnet --version
```

If you’re seeing something like **2.2.105**, then congratulations! You just set up your first Vagrant environment! From here, you now have a disposable machine that you can run your code in without polluting your host machine with various SDKs and runtimes.


Unless you are the kind of psychopath that enjoys editing code via the command line, you’re probably wondering at this point how we create and edit code on our new development environment. Vagrant uses something called Synced Folders that provides a shared interface between your host machine and your guest machine. To see this in action, create a new file in the same directory as your Vagrantfile called HelloWorld.txt. Now, providing you are still connected to your virtual machine via ssh, run the following command:

```
ls /vagrant
```

This will list the contents of your vagrant directory on the virtual machine, and among the items listed should be your freshly created HelloWorld.txt! From here, it’s as simple as opening the directory containing your Vagrantfile in your text editor of choice (I use VS Code) and working from this directory. Something I would recommend is utilising the inbuilt terminal in your text editor to connect to your virtual machine. That way you have a way to build and run your code within the text editor.


If you would like to disconnect from your Vagrant environment, simply use the logout command. Alternatively, if you would like to destroy your machine completely (make sure you’re using source control!), you can use the following command:

```
vagrant destroy
```

And it’s as simple as that! I really enjoy using Vagrant for my development environments because it’s so lightweight and quick to get a new environment up and running. I’d highly encourage that you consider Vagrant for your future projects, and after perhaps 15 minutes of work I have a virtual machine that I can keep around just for the conference and then get rid of without having to uninstall anything.


If you would like to learn more about Vagrant, I would highly recommend their documentation: 
https://www.vagrantup.com/docs/index.html