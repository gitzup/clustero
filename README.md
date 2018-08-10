# clustero

Clustero is your _opinionated DevOps butler_, at your service.  

- [x] Come up with an idea. 
- [ ] Design (**IN PROGRESS**).
- [ ] Implement.
- [ ] Test [in the wild].
- [ ] Document.   
- [ ] Release. 
- [ ] Excite. 

## Entities

- GitHub App
    - _Clustero_ is available as a GitHub App, installed by GitHub organization owners.
    - The app allows auto-discovery of Git repositories & source code change events.

- Slack App
    - _Clustero_ is available as a Slack App, allowing users to use ChatOps to manage their development platform.
     
- Pipeline
    - Users create pipelines usually to perform a specific action, eg. build & test, deploy, release, etc.
    - Pipelines will usually react to events in the DevOps environment:
        - Source code changes
        - New issues, releases, etc.
        - Build artifact available
        - Extensible system for defining new triggers
        - See [available triggers](./TRIGGERS.md)
    - Pipelines must have a specification of steps to execute when invoked
        - Can be obtained from a source code repository, if the trigger is a source code change
        - Can be provided externally by the user - usually done for post-development tasks like deployment, notification or release publishing.
    - See [pipeline syntax](./PIPELINE-SYNTAX.md)

## Story

Installation:
- Users install the GitHub App in a GitHub organization
- Users optionally install the Slack application as well

Users create pipelines, and provide:
- The pipeline name
- One or more [triggers](./TRIGGERS.md)
- The [instructions](./PIPELINE-SYNTAX.md) for the pipeline, either from source code repository if the trigger provides a repository; otherwise, must be provided manually.
    
## Development

Use `docker-compose` to start the system, as such:

First, ensure the _dashboard_ has all its dependencies installed:

```bash
$ cd dashboard
$ npm install
$ node ./node_modules/node-sass/scripts/install.js
$ npm rebuild node-sass
```

Then ensure that the _server_ has all its dependencies installed:

```bash
$ cd server
$ npm install
```

To run the system, use `docker-compose`:

```bash
docker-compose up --abort-on-container-exit
```

## Building

Build the Docker image, as such:

```bash
docker build --tag gitzup/clustero:local .
```

## Roadmap

- [ ] Support declarative remote artifacts (Docker images, S3, GCP buckets, Maven repositories, etc)
