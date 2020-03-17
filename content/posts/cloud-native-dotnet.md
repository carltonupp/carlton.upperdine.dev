## Codebase

### Definition

> One codebase tracked in revision control, many deploys

### What this means

* A codebase is a single deployable application
* Keep each codebase in a repository
* If your application is distributed, split it into multiple repositories
* All deployments come from the same repository, including to the developer's own machine

### .NET Specific Advice

* If your applications share code, extract and refactor this shared code into NuGet packages.

## Dependencies

### Definition

> Explicitly declare and isolate dependencies

### What this means

* Use the standard packaging system for your language to manage and install external dependencies.
* Prefer locally installed packages over globally installed ones.
* Store all project dependencies in a file that is kept within the codebase.
* Depend on explicit dependencies, not implicit ones

### .NET Specific Advice

* List all project dependencies in either the associated `.csproj` file or a `packages.config` file.
* Use NuGet, or the dotnet CLI to install dependencies.
* If your application depends on system tools, do not make assumptions that the system tool exists.

## Config

### Definition

> Store config in the environment

### What this means

* Config refers to anything that is like to vary between deployment environments.
* This includes connection strings, credentials, api keys and urls

### .NET Specific Advice

* Move on from storing these details in the `web.config` file
* Use the `Environment.GetEnvironmentVariable` static method to access these variables.

## Backing services

### Definition

> Treat backing services as attached resources

### What this means

* A backing service is any service the app consumes over the network as part of its normal operation. This can include datastores, messaging/queuing systems, SMTP services and caching systems.
* Treat third party services exactly the same as local services. Do not hard code explicit dependencies on a specific instance of a database, cache, etc.

### .NET Specific Advice

## Build, release run

### Definition

> Strictly separate build and run stages

### What this means

There are typically three stages of a deployment:

* Build: transforms a repository into an executable bundle containing compiled libraries and any external dependencies.
* Release: transfers the bundle created during the build stage to the execution environment.
* Run: runs the app in the execution environment, and starting the application's processes.

Each of these stages should depend on the output of the previous stage, but have no understanding of what is done in that stage. 

For example: a release process takes a build artifact and deploys it to the execution environment. The release process has no understanding of what is being done during the build process, it simply requires a build artifact.

### .NET Specific Advice

* Do not build & deploy from Visual Studio, instead favouring an automated tool such as TeamCity & Octopus Deploy or Azure Pipeline services.

## Processes

### Definition

> Execute the app as one or more stateless processes

### What this means

* Every process in an application be stateless, i.e. keep no information between requests.
* Any data that needs to be persisted should be stored in a data store.
* Do not use sticky sessions, instead storing user session data in an external cache.

### .NET Specific Advice

* ASP.NET WebApi and MVC both allow you to build stateless applications. WebForms makes it very difficult, so avoid this, though I don't see many organisations doing greenfield development with WebForms.

### Port binding

### Definition

> Export services via port binding

### What this means

Your application should not depend on an external server in order for your application to be able to run. Instead of depending on an external webserver within the execution environment, use an internal webserver library and bind your application to a port.

### .NET Specific Advice
* Kestrel is the 
* A standard setup for ASP.NET Core applications is to run the service with Kestrel and expose it via a reverse proxy using either IIS or Nginx.

## Concurrency

