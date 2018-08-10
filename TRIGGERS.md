# Pipeline triggers

Clustero supports an extensible system for defining pipeline triggers. This page contains a listing of known triggers:

## Git Triggers

Environment variables:
- `TRIGGER_TYPE`: `git`
- `GITHUB_ORG` & `GITHUB_REPO_NAME`: if the Git repository is hosted @ github.com
- `GIT_COMMIT_SHA`
- `GIT_COMMIT_SHORT_SHA`

#### Commit pushed to a branch:

Environment variables:
- `TRIGGER_REASON`: `commit_push`
- `GIT_BRANCH`

Filters:
- Author Email(s)
- Committer Email(s)
- Message regex

#### Tag pushed to repository

Environment variables:
- `TRIGGER_REASON`: `tag_push`
- `GIT_TAG`

Filters:
- Tag name regex

## Clustero Events Triggers

#### Runs of other pipelines

Filters:
- Pipeline name expression
- Result: one of `success` (default), `failure`, or `any`

Environment variables:
- `TRIGGER_TYPE`: `pipeline`
- All environment variables from the triggering pipeline, prefixed by `TRIGGER_PIPELINE_`

This trigger can be either `automatic` or `manual`:
- If set to `automatic`, then whenever a build for a pipeline matching the filters finishes, a new build for this pipeline is scheduled.
- If set to `manual`, then users can schedule builds for this pipeline from a build of a pipeline that matches the filters.

In either case, the artifacts from the source pipeline are available to this pipeline in the `/usr/local/artifacts` subdirectory

## JIRA Triggers

Filters:
- JIRA project name (expression)

### JIRA Releases

Filters:
- Release name regex

Environment variables:
- `TRIGGER_TYPE`: `jira_release`
- `TRIGGER_REASON`: `created` or `released`
- `RELEASE_ID`
- `RELEASE_NAME`

### JIRA Issues

Filters:
- Type (eg. `bug`, `feature`, etc)
- Priority

Environment variables:
- `TRIGGER_TYPE`: `jira_issue`
- `TRIGGER_REASON`: `created`, `transitioned`
- `ISSUE_KEY`
- `TRANSITION_FROM=xxx`
- `TRANSITION_TO=xxx`

## GitHub

Environment variables:
- `GITHUB_ORG` & `GITHUB_REPO_NAME`: if the Git repository is hosted @ github.com

#### Pull Requests

Filters:
- Event: one of `created`, `sync`, `merged`, `closed`
- Forks supported
- Title regex

Environment variables:
- `TRIGGER_TYPE`: `github_pr`
- `TRIGGER_REASON`: `created`, `sync`, `merged` or `closed`
- `PR_NUMBER`
- `GIT_COMMIT_SHA`
- `GIT_COMMIT_SHORT_SHA`
- `GIT_BRANCH`, `GIT_TARGET_BRANCH`

#### Issues

Filters:
- Event: one of `created`, `closed`
- Title regex

Environment variables:
- `TRIGGER_TYPE`: `github_issue`
- `TRIGGER_REASON`: `created` or `closed`
- `ISSUE_NUMBER`

## Manual

Environment variables:
- `TRIGGER_TYPE`: `manual`

Defining this trigger will allow the user to define a set of parameters (JSON schema validation) and these parameters will be available as environment variables, with the `PARAM_` prefix, eg. `PARAM_FOO`.
