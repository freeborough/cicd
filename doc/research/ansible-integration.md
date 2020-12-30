# Research: Ansible Integration
Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

While [Ansible](https://www.ansible.com/) can of course be called through the command-line, as it would be the most common 'scripting' mechanism we're going to use (to start with at least) it would be useful to see if there was a better solution for integrating with it.

## Options

There aren't many options for interacting with Ansible from node..

* [ansible](https://www.npmjs.com/package/ansible)
* [node-ansible-control](https://www.npmjs.com/package/node-ansible-control)
* [node-ansible](https://www.npmjs.com/package/node-ansible)
* [Python API](https://docs.ansible.com/ansible/latest/dev_guide/developing_api.html) through [python-shell](https://www.npmjs.com/package/python-shell)

## Ansible Module

Complete no go - barely used, probably abandoned, and incomplete.

## Node Ansible Control Module

Still in early development with a warning about potential API breaks on minor versions.  It's barely used as a result, but is in active development and could be one to watch in the future or help out with if we decide to go down that route.

## Node Ansible Module

Seems to have been abandoned - the main author hasn't done anything in 5+ years and the most recently maintained fork appears to have switched to being a fork of node-ansible-control.  It is the most used library of its kind though, so there is likely some potential use here for maybe creating our own, but it would be a risk to use.

## Python API through python-shell

Ansible is written in Python and provides an API that can be used within it to control it programatically, and python-shell is a popular and well-maintained module for executing python scripts from node.  It feels a lot like extra hoops to jump through, but from what I can determine seems like it might be marginally better than using the ansible executable itself.

## Conclusion

Not an easy one, there are essentially no great options.  I think for now in the interests of simplicity and flexibility we just go with a generic shell runner and look at better ansible integration if needed in a later phase.

## References

* [Ansible](https://www.ansible.com/)
* [ansible](https://www.npmjs.com/package/ansible)
* [node-ansible-control](https://www.npmjs.com/package/node-ansible-control)
* [node-ansible](https://www.npmjs.com/package/node-ansible)
* [Python API](https://docs.ansible.com/ansible/latest/dev_guide/developing_api.html) through [python-shell](https://www.npmjs.com/package/python-shell)