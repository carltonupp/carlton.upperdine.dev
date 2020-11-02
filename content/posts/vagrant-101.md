+++
title = "Vagrant 101"
slug = "vagrant-101"

date = "2020-07-19"
tags = ["vagrant", "tutorial", "devops"]
categories = ["blog"]
+++
Vagrant is a tool by HashiCorp that is used for creating lightweight development environments. As someone that likes to experiment with **all the languages**, it can often be a massive pain to get a local dev environment set up before jumping into a new project.

There have been times where I go back to a language, only to find that the SDK or runtime that I installed previously is out of date, so I have to uninstall it before reinstalling the correct version. This is a lot of effort to go to if I only end up spending maybe a weekend building a basic prototype.

Thankfully, tools like Vagrant exist to make this process much easier. By containing your projects and installations within a tiny virtual machine, your changes only last as long as the virtual machine exists, and they don't pollute the host machine with unused runtimes and SDKs.

Perhaps my favourite thing about Vagrant is its ability to define a complete development environment within a single, human-readable file. This file can be kept in the project's repository so any time you need to do further work, you can simply spin up the dev environment and get to work.


# Installation

Installing HashiCorp is as simple as going to the [HashiCorp website](https://www.vagrantup.com/downloads) and downloding the appropriate installation client.

If you happen to be using Windows, this tutorial will not work if you have Hyper-V enabled, so you'll need to disable this before continuing. You can do this from an administrator PowerShell prompt with: 
```
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

Alternatively, you can use the [Hyper-V provider](https://www.vagrantup.com/docs/providers/hyperv) for Vagrant, but I personally haven't had a great deal of use out of it so I'm writing this tutorial to work with VirtualBox.

# Creating a Vagrant environment

In order to create a Vagrant environment, we must first choose a **box** to base our environment on. A **box** in Vagrant represents a base image for a virtual machine, usually defining the underlying operating system and potentially installed runtimes.

Boxes can be found on the [Vagrant Cloud](https://app.vagrantup.com/boxes/search), or alternatively created by us. To keep things simple, lets create an instance of the **hashicorp/bionic64** box from the Vagrant Cloud. To do this, open a terminal and enter `vagrant init hashicorp/bionic64`. This should create a `Vagrantfile` in your directory contining the following:

```ruby
# Comments removed for readability


Vagrant.configure("2") do |config|

  config.vm.box = "hashicorp/bionic64"

end

```

From here, we can simply enter `vagrant up` in the terminal to create an environment based on our Vagrantfile. A quick `vagrant status` will allow us to see if our environment is running:

```shell
$ vagrant status

Current machine states:

default                   running (virtualbox)

The VM is running. To stop this VM, you can run `vagrant halt` to
shut it down forcefully, or you can run `vagrant suspend` to simply
suspend the virtual machine. In either case, to restart it again,
simply run `vagrant up`.

```

From here, we can connect to the environment by entering `vagrant ssh` in the terminal. We don't need to do this right now, but go ahead and give it a try if you're curious.


# Configuring our environment

Okay, so lets say we want our Vagrant environment for building a new Flask application with Python. We have three dependencies for our environment: **python**, **pip** and **flask**.

## Installing our dependencies

Luckily, python 3 comes installed as standard in Ubuntu 18.04, so all we need to install at this point is pip3. In Vagrant, you can use something called a provisioner, which is a fancy term for a post-creation script runner. Add the following to your Vagrantfile:

```ruby
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y python3-pip

    pip3 install flask
  SHELL
```

Tear down your current environment using `vagrant destroy` and recreate it using `vagrant up`. You'll notice that provisioning our environment now takes a little longer, which is due to the provisioner running our script above.

## Our Application

In the same directory as your Vagrantfile, create a new file called `app.py`, and paste in the following code:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Vagrant!'
```

In order to access this service via the browser, we need to forward port 5000 on the Vagrant machine to a port on our host machine. I'll keep them both at 5000 just to keep it simple. Add the following to your Vagrantfile just above your provisioner:

```ruby
config.vm.network "forwarded_port", guest: 5000, host: 5000
```

After this, we need to do a `vagrant reload` to rebuild our environment from the new Vagrantfile. This will save us a lot of time as it will only update the things that have actually changed and won't have to run the provisioner again.

## Synced Folders

You'll notice that I'm referencing a directory called `/vagrant` above, and I think this is a good time to explain Synced Folders in Vagrant. A synced folder is a directory that is shared between your host machine and your virtual machine, allowing you to work on your project files on your own machine but compile or run your application within the Vagrant environment. There is a synced folder set up by default in a Vagrant environment, and it is set to directory that your Vagrantfile is located in.

Give it a try: `vagrant ssh` into your environment and navigate to your `/vagrant` directory. If you list the items in that directory, you'll see your `Vagrantfile` and `app.py`.


# Running the application

Okay, so we're ready to actually run the Flask application, so ssh into your machine and enter the following into the terminal:

_Flask requires the_ `FLASK_APP` _environment variable to be set in order to for the _`flask run` _command to work._

```sh
$ export FLASK_APP=/vagrant/app.py
$ flask run --host=0.0.0.0
```

The application should now be running on http://localhost:5000, and going to that url on your host machine should yield the message `Hello from Vagrant!`. Now we have a fully featured dev environment, we can include the Vagrantfile in our project repository so any other developers working on the project can simply spin up the exact same environment for themselves!


If you've made it this far, you probably now know as much about Vagrant as I do, and I hope you love it equally too. If you have any further questions or comments, please do not hesitate to comment or even give me a follow if you like my work.
