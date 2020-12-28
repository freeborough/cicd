# CICD: Requirements

Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

This document details the high-level requirements for the project - the core functionality that's wanted, and why.  No specific implementation or technology choices are discussed, please see the [specification document](specification.md) for that level of detail.

## Requirements

The system needs to be able to listen for events from various sources (e.g. git hooks, github web hooks, filesystem changes, REST API, etc.), run scripts when events are triggered (e.g. shell scripts, native code, ansible playbooks, etc.), and record the results of those scripts for later viewing and/or reporting.

The core use-cases are as follows:

* Deploy a system to the appropriate server when specific branches (e.g. develop/x.x, test/x.x, staging/x.x, and release/x.x) are pushed to GitHub.
* Run the test suites of a system in multiple configurations (e.g. different databases and operating systems) on virtual machines in a post-commit git hook.
* When file changes are detected, run a script to rebuild and redeploy a static site through using a static site generator.

The inputs (git hooks, web hooks, filesystem changes, REST API, etc.) should be abstracted such that more can be added later.

Progress and results should be logged to file.

Provide some out-of-the-box configurations for common use-cases (e.g. deploying a static web site to nginx, deploying a node service with pm2, etc.).

## Target Audience

The system is targetted at lone developers/smaller development teams that don't have the resources available to manage a full CI/CD solution.

## Global Requirements

There are several requirements that apply to every element of the system:

* Easy to use - the system should be easy to use, minimal configuration with sane defaults, and well documented.
* In repo configuration - as much of the configuration as possible should be kept within each projects repo, the less you have to go and mess with the CI/CD server the better.
* Dedicated service optional - it should be possible to use at least some of the core functionality without installing and running a dedicated service.

## Future Requirements

These are requirements that do not apply to the initial versions of the project, but are potentially worth keeping in-mind in the first phases of development as doing so could save time overall:

* Scale to using multiple cores and machines.
* Queue/job system with overriding to cancel out-of-date jobs.
* GUI for viewing progress and results.
* Notifications through various systems (email, OS, mobile, etc.)
* GUI for triggering events (e.g. to approve of a system in staging and deploy it to the live server).
* Plugin support so we can more easily allow the use of additional inputs, outputs, controllers, etc.
* CLI for interacting directly with the CI/CD system.
* OS package (e.g. deb, rpm, etc.)
* Container package (e.g. docker hub)
* 'Marketplace' for sharing configurations, like Docker Hub.
