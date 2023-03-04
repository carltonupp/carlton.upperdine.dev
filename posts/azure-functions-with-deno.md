---
title: "Serverless Deno with Azure Functions"
blurb: "How to run your serverless workloads in Azure using your new favourite js runtime."
date: "2023-03-04"
---

I've recently been delving into the world of [Deno](https://deno.land/): a competitor to Node.js that boasts an easier and faster runtime experience for JavaScript. It is written using Rust and designed from the ground up for high performance, with aims to provide a secure, more productive experience for the modern developer.

So far, I'm really enjoying my experience with Deno- I'd probably describe it as a lot like Node.js but with a design philosophy more akin with Golang. For example: Deno ships with a formatter, linter and test runner out of the box, and has a standard library built in. This, combined with it's out-of-the-box TypeScript support, has me very excited.

Unfortunately, a lot of cloud platforms don't explicitly support Deno yet- so unless you are running in containers you'll struggle for first-class runtime support. Luckily, Azure Functions have an option for custom language bindings, which allows developers to write functions using whatever language or runtime they desire, including Deno!

## Requirements

* Deno
* [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools)
* VS Code (strongly preferred)
* Deno Plugin for VS Code
* Azure Functions Plugin for VS Code

## Creating an Azure Function project

Firstly, we need to create a new directory to house our code in. I'll use the name `deno-functions` but feel free to call it whatever you like. From your terminal:
```sh
mkdir deno-functions && cd deno-functions
```

Now that we are in the `deno-functions` directory, we need to use our Azure Functions Core Tools to initialise our function project so that the Core Tools knows that we're dealing with Azure Functions. We do that using `func init` and specifying our desired runtime as `custom`:

```
func init --worker-runtime custom
```

This will create a few files, but the most important one for our project is `host.json`. This file tells our Azure Functions runtime how to run our functions.

## Configuring our project to work with Deno

In order for VS Code to allow us to write code using the Deno standard library, we need to configure the project to enable the Deno plugin. If you already have the Deno plugin for VS Code installed, you can press F1 on your keyboard and select the option `> Deno: Initialize Workspace Configuration`. After doing this, you will be asked a couple of questions, and I would recommend the following answers:
* Enable Deno Linting: **Yes**
* Enable Deno unstable APIs: **No**

Alternatively, you can just create a `settings.json` file in the `.vscode` directory and include the following:
```json
{
    "deno.enable": true
}
```

## Creating our first function

Now we're all set up to work with Azure Functions and Deno, we're ready to create our first function! We do this using the `func new` command:
```
func new --name deno-http 
        --template "HTTP Trigger" 
        --authlevel anonymous
```

I have gone with the name of `deno-http` but feel free to call it whatever you want- just remember to swap in this name when I reference it later in the post. This creates a new directory called `deno-http` and inside it a `function.json` file:

```json
{
  "bindings": [
    {
      "authLevel": "Anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

This file is used to declare the bindings for the function, along with the authentication method, direction and method. We don't need to touch this file any further, but if you'd like to remove the `post` entry from `methods` we won't need it for this use-case.

Now it's time to write our actual function code. Create a file in the `deno-http` directory called `deno-http.ts`. Again, the name doesn't matter here, just keep it in mind when it's referenced in future. Populate your file with the following code:

```ts
import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

const port = (Deno.env.get("FUNCTIONS_CUSTOMHANDLER_PORT") ?? 0) as number;

const handler = (_req: Request): Response => {
  const body = JSON.stringify({
    message: "Hello from Azure Functions with Deno!",
  });

  return new Response(body, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

console.log(`HTTP webserver running. 
    Access it at: http://localhost:${port}/`);

await serve(handler, { port });
```

**We have some important things to cover here.**

Firstly, line **1** is now we import dependencies in Deno. If you've ever written any Go, this should look familiar. By referencing the url directly, we are able to know exactly where that code we are referencing is coming from.

Secondly, our code needs to be listening on the correct port. This is done on line **3** by setting the port to the `FUNCTIONS_CUSTOMHANDLER_PORT` environment variable provided by the Azure Functions runtime.

The rest of it should be fairly self-explanatory if you've ever seen a http server written with TypeScript, but the general gist is that our function returns a JSON object with the message of `Hello from Azure Functions with Deno!`

## Compiling our code into an executable

In order to run our code as a Function, we need to provide our Deno function as an executable. We do this using the `deno compile` command and provide it with the path of the file we want to compile.

```
deno compile --allow-env 
            --allow-net 
            .\deno-http\deno-http.ts
```

Remember when I said earlier that Deno aims to be more secure than it's predecessor? Well when we are running or compiling our Deno code, we must specify if we want to allow our code to access environment variables or be open to the network. We do that using the `--allow-env` and `--allow-net` parameters.

We should now have an executable called `deno-http` in the root of our repository. We can run this executable just like any other web service and it will give us exactly what we need - try it for yourself! 

## Running our executable as an Azure Function

Now that we've got an executable for our application, we need to point our Function application to run it. We do that by modifying the `host.json` file. Open the file and paste the following in there:

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[2.*, 3.0.0)"
  },
  "customHandler": {
    "description": {
      "defaultExecutablePath": "deno-http"
    },
    "enableForwardingHttpRequest": true
  }
}
```

The most important part of this lies within the `customHandler` property. It specifies the path to the executable and allows our Function host to forward our HTTP requests to the correct port (this is incredibly important).

Once you have done that, open up your terminal and enter the following command:

```
func start
```

Doing so will start up our Function host and inform us where our functions are accessible. When I do this on my machine, I get the following
```
Azure Functions Core Tools
Core Tools Version:       4.0.4426 Commit hash: N/A  (64-bit)
Function Runtime Version: 4.1.3.17473

[2023-03-04T18:56:46.880Z] Listening on http://localhost:59769/

Functions:

        deno-http: [GET,POST] http://localhost:7071/api/deno-http

For detailed output, run func with --verbose flag.
[2023-03-04T18:56:47.331Z] Worker process started and initialized.
```

I can now access my function using the web browser or curl, and if this works, you should receive the following:

```json
{"message":"Hello from Azure Functions with Deno!"}
```

## Deploying to Azure

Providing you have your Azure account set up properly, you can then deploy your function using the following command:

```
func azure functionapp publish deno-http
```

Alternatively, you can use the Azure Functions extension in VS Code to deploy your code if you prefer.

I appreciate that there are a lot of different ways of deploying Azure Functions, so I'm avoiding the topic of CI in the aim of not expanding the scope of this post too far.

## Final Thoughts

I have written a lot of serverless functions in my career, but being able to use custom languages and runtimes may just change how we write them going forward. I understand that Go and Rust are frequently used with Azure Functions in this context, but the possibilities for language are endless. For example, you are able to write functions with scientific languages like R, which probably has a lot of use-cases in the data science world.

Deno is doing a lot of things right, and it makes me happy that I can pick it up so quickly and build something like an Azure Function with minimal overhead.

Also worth a mention is that Deno has it's own serverless platform to run on called [Deno Deploy](https://deno.com/deploy) that apparently requires even less set up than Azure Functions. I can't speak from personal experience as I haven't used it myself, but based on my experience so far with Deno I may do soon!

You can find the source code for this blog post [here](https://github.com/carltonupp/deno-functions).

Thanks for reading!