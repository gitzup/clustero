# Pipeline execution

## Strands

Pipeline execution is governed by _strands_ - a sequence execution of steps, where each step is a Docker image with an optional set of arguments. Strands are executed concurrently, except where a specific inter-strand dependency is declared.

Here is an example build file with a single strand:

```YAML
version: 1
strands:
- name: build
  steps:
  - type: node:10.7 # this is just a Docker image
    cmd: [npm, ci] # "npm ci" is the new npm command replacing "npm install" for CI/CD
  - type: node:latest
    cmd: [npm, run, test]
  - type: node
    cmd: [npm, run, build]       
```

Each step is a Docker image executed with the workspace mounted at `/usr/local/src`. You can also have multiple strands, in which case they will be run concurrently (by default), like so:

```YAML
version: 1
strands:
- name: build-server
  dir: ./server
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
- name: build-client
  dir: ./client
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
```

Notice how the `dir` property was added to the strands, so steps in each strand will run in different internal directories (`server` & `client`); this means that instead of the whole workspace being mounted at `/usr/local/src` for the steps, the subdirectory in the `dir` property is mounted there instead.

This means that the `dir` property **must** be a relative path. You can also use the `dir` or `directory` property on individual steps to override the strand default.

Strands can have dependencies as well - usually when you want a certain strand to run after all other concurrently-running strands have finished. Here's another example:

```YAML
version: 1
strands:
- name: build-server
  dir: ./server
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
- name: build-client
  dir: ./client
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
- name: package
  after: [build-server, build-client]
  steps:
  - type: ubuntu
    cmd: [bash, '-c', 'tar -cf myproject.tar ./dist']
```

The `package` strand will only run when both the `build-server` and `build-client` strands have finished successfully.

## Artifacts

Each pipeline can specify a set of artifacts that are _captured_ when the pipeline ends successfully. Here's how to list them:

```YAML
version: 1
strands:
- name: build-server
  dir: ./server
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
- name: build-client
  dir: ./client
  steps:
  - type: node
    cmd: [npm, ci]
  - type: node
    cmd: [npm, run, build]       
artifacts:
- name: server
  path: ./server/dist
- name: client
  path: ./client/dist
```

The artifact path can be a file, directory or a glob expression.

Pipeline might also receive artifacts - usually when the trigger is another pipeline. In such cases, artifacts will be provided for steps under the `/usr/local/artifacts` directory.
       
## Environment variables

Each step will always have access to the following environment variables:
- `PROJECT_NAME`
- `PROJECT_SLUG`
- `PIPELINE_NAME`
- `PIPELINE_SLUG`
- `STRAND_NAME`
- `STRAND_SLUG`
- `STEP_NAME`
- `STEP_SLUG`

## Specification

Here's a full specification of a build YAML for reference:

```YAML
version: 1            # build spec version, must be "1"
timeout: 10m          # total execution timeout; time suffixes can be s, m, or h (seconds, minutes, hours)
environment: ''       # if this build performs a deployment, specify the environment here (can be an expression); result of the expression is available to steps as the DEPLOY_ENVIRONMENT environment variable
strands:              # required array of strands (one or more)
- name: strand-name   # required, must match [a-z][a-z0-9_-]*[a-z0-9]
  dir: .              # optional subdirectory to be mounted as /usr/local/src to steps (steps can override) 
  after: ['']         # optional array of other strands required to finish successfully before this strand
  timeout: 10m        # strand execution timeout; time suffixes can be s, m, or h (seconds, minutes, hours)
  steps:              # required array of steps (one or more)
  - name: step-name   # optional, must match [a-z][a-z0-9_-]*[a-z0-9]
    type: repo:tag    # required Docker image (will be pulled)
    entrypoint: []    # optional Docker entrypoint override 
    cmd: []           # optional Docker cmd override
    dir: .            # optional subdirectory to be mounted as /usr/local/src 
    user: ''          # optional user to run as inside the Docker image
    timeout: 10m      # step execution timeout; time suffixes can be s, m, or h (seconds, minutes, hours)
    env:              # optional array of environment variables to provide
    - 'KEY=VALUE'     # items can be strings in the format of KEY=VALUE
    - key: ''         # alternatively they can be objects with "key" and "value" properties
      value: ''
artifacts:            # optional array of artifact specifications that this pipeline will capture
- name: ''            # artifact logical name, must match [a-z][a-z0-9_-]*[a-z0-9]
  path: ''            # local path of the artifact, can be a glob expression 
  required: true      # whether the artifact must be found or not
```
