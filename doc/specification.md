# CICD: Specification

Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

This document provides the detailed specification for the implementation of the [requiments](requirements.md).  The specification is broken-up into discrete phases.

## Architecture

* Operating System: Linux
* Development Environment: NodeJS
* Web Framework: Express
* Configuration Format: ?

## Unknowns

These must be addressed before the project can be fully specified and started:

### Git Hooks

Need to determine how git hooks work, what hooks are available, what information they give, and what format that information is given in.

### GitHub Web Hooks

Need to determine the protocol for handling github web hook http posts, what hooks are available, what information they give, and what format that information is given in.

### Git Integration

We're going to be needing to extract information from git/github repo's, so we need to determine what the options for doing that are.  Specifically is there an abstraction that will take a local filesystem/github repo and let us work with them?

### Filesystem Monitoring

Need to determine how changes to the filesystem can be monitored.  From memory there's something called 'inodes' that I think are used, and there is an operating-system based limit that can potentially be increased.  Two known projects that do this are: nodemon, live-server.

### Script Running

What is the best way to run bash scripts from NodeJS such that the output can be collected and parsed, and that is stable.

### Ansible Integration

Ansible is an excellent tool for performing a lot of the tasks we wish to accomplish, what is the best way to call Ansible playbooks from NodeJS?

### Configuration Format

Whilst something like JSON and YAML would be OK solutions, having something that offers more could be really useful - in the way that something like NGINX does.  For example, a system that supports:

* Variables
* Basic logic
* Includes
* Comments

This would allow us to have a more re-usable/abstract configuration that could be shared between projects.  For example, to be able to create a generic "staging" configuration that you could apply to all your sites.  You could simply point your github webhook at the CI/CD system and make a staging/x.x branch and the site could be deployed to repo-name.staging.yourdomain.com without any additional configuration on the CI/CD system.

Possible configuration formats include:

* JSON
* YAML
* TOML
* DHALL
* HOCON
* LIBUCL
* JSON5
* JSONC

## Phase 1: Minimum Viable Product

TODO: After resolving all unknowns, determine what the minimum viable product should be.
