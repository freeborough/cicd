# Research: Git Integration
Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

We're going to be needing to extract information from git/github repo's, so we need to determine what the options for doing that are.

* Is there an abstraction that will take a local filesystem/github repo and let us work with them through a common interface, or do we need to clone locally?
* Is there a nice wrapper for the git command-line tool?

## Abstraction

I couldn't find a library that provided an abstraction such that you could say "get me this file from this branch" and pass it either the git local path or a hosted git URL.  This is something that we'll either have to make ourselves for those specific cases where we need it.

## Wrappers

There seem to be the following main options for interacting with git:

* Call the git executable like any other executable - want to avoid this if possible as it's error-prone.
* [Simple Git](https://www.npmjs.com/package/simple-git) - A lightweight interface for running git commands in any node.js application.
* [isomorphic-git](https://www.npmjs.com/package/isomorphic-git) - Pure JavaScript reimplementation of git that works in both Node.js and browser JavaScript environments.
* Using the [git module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/git_module.html) built-in to Ansible.

### Simple Git

Looks really solid, I can't see any negatives with using it.

\+ Popular.
\+ Well maintained.
\+ Well documented.
\+ Simple API.
\+ Supports async/await.
\+ Supports all the major features we'd want.
\+ Concurrency support.
\+ Can expose the raw git command.
\+ Clean codebase with automated tests.

### isomorphic-git

This is an interesting one as it doesn't rely on the git executable, and can even be run in a browser environment (though there are issues with that due to CORS).  But by being a complete re-implementation, it'll inevitably both fall out of sync and have its own set of bugs and issues.

\+ Well maintained.
\+ Well documented.
\+ Pure JavaScript, no dependancy on git executable.
\+ Supports all commands we'd likely want.
\+ Supports async/await.
\+ Works in browsers, if that's something we'd need/want to do?

\- Not very popular.
\- Not a feature-complete clone of git, so there could be issues.
\- We're unlikely to not want/be able to use the real git executable.
\- Doesn't have any explicit concurrency support.

### Ansible Git Module

While we could use this, it's really just kicking the can further down the road as we'd then need a wrapper for Ansible.  While we do want to provide ansible support, I don't  want to have it as a hard requirement to using the system.

## Conclusion

Simple Git!  It does everything we want in the way we want.

## Other Notes

Whilst researching this I came across a potentially interesting library, [hosted-git-info](https://www.npmjs.com/package/hosted-git-info), which will let you identify and transform various git hosts URLs between protocols. It also can tell you what the URL is for the raw path for particular file for direct access without git.  This could potentially be a useful way of pulling any in-repo configuration files we want without using git to bring down the whole repo.

## References

* [Simple Git](https://www.npmjs.com/package/simple-git)
* [isomorphic-git](https://www.npmjs.com/package/isomorphic-git)
* [Ansible git module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/git_module.html)
* [hosted-git-info](https://www.npmjs.com/package/hosted-git-info)
