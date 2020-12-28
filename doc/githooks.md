# Research: Git Hooks
Authors(s):
  Connor Youngs
  <email@connoryoungs.com>

## Introduction

We wish to use **Git Hooks** as an input for the CI/CD system. 

Specifically we want to know:

* How they work.
* What hook are available.
* What information they pass.
* What limits, if any, are there.


### How they work?

Git has two groups of hooks, client side hooks and server side hooks.

Client side hooks are triggered by client side operations such as committing and merging.

### What hooks are available? 

A script can be attached to each of the following hooks,

* applypatch-msg
* commit-msg
* fsmonitor-watchman
* post-update
* pre-applypatch
* pre-commit
* pre-merge-commit
* prepare-commit-msg
* pre-push
* pre-rebase
* pre-receive
* update
 

