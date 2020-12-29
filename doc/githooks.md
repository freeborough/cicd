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

Server side hooks run on network operations such as receiving pushed commits.

### What hooks are available? 

A script can be attached for each of the following hooks.

Client side hooks:
* applypatch-msg
* commit-msg — triggered after a message has been written, could use this to automatically sign off on git commit messages we have written, as shown in the sample file provided for this hook.
* fsmonitor-watchman
* post-update
* pre-applypatch
* pre-commit — Run before you even type in a git commit message, can be used to ensure that tests run exiting non zero from this hook aborts the commit, bypassed with git commit --no-verify.
* pre-merge-commit
* prepare-commit-msg 
* pre-push 
* pre-rebase

Server side hooks:
* pre-receive
* post-receive
* update

Page 8.3 of the git documentation goes into more details on the hooks available and how to customize them [8.3 Customizing Git — Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks\))

Some of the hooks described here namely applypatch-msg, reapply-patch and post-applypatch are to do with email work flow using the git am command.
 

### Limits and or considerations.
 
Scripts triggered by Git Hooks can be written in any language but script files must be named the hook have no extension(pre-commit, post-commit) and be marked executable,
so we need to ensure we include [shebangs](https://en.wikipedia.org/wiki/Shebang_\(Unix\)) in our scripts to appropriate runtime environments the sample scripts provided are written in shell and Perl.Suggested languages include Python,Ruby and shell.


## Lab results

**The following was tested on arch linux and I have not tested in a windows environment yet**

I have included a python script called pre-commit in the lab folder, I needed to import the os and sys libraries. 

I decided to test with the **pre-commit** hook.

The hook is called whenever the git commit command is used with or without arguments. 
exiting with a non zero value will cause git commit to abort,
exiting a zero value indicating success the git commit continued,
In python this is controlled with the sys.exit() function.

This hook is called before the output of the git commit command is called. 
(I tried to commit without adding any files and the script executed and then command failed due to no files to commit).


## What do they pass?

The current working directory for hooks appears to be the root of the git repository.
Tested using python os.getcwd()

This web page contains a lot of useful information on the environment variables git automatically sets when each hook is called [Missing Git Hooks Documentation](https://longair.net/blog/2011/04/09/missing-git-hooks-documentation/).

In python using os.environ with a key that doesn't exist causes the python script to fail and return a fail status which will cause the git commit command to abort, this is interesting and helpful because if something goes wrong and the script doesn't run the git commit should abort and we wouldn't need to always enforce sys.exit(1) etc.

Some environment variables are

GIT_AUTHOR_NAME Contains the git author name, Interestingly running the script outside of a git hook causes the script to fail because this doesn't exist yet.
GIT_AUTHOR_DATE Contains the date a commit was authored for example. Same as above

This website provided a detailed further information of the different environment variables used by git and variables hooks themselves set. [Digital Ocean - How to use git hooks to automate development and deployment tasks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)


**Concluson**

We can access useful git environment variables in python using the os.environ object, trying to access a non existent key will cause python to throw a key error and cause the git commit command to abort.


## Conclusion
I believe we could use git hooks for running tests and style engines on code before committing, as well as automatically adding signing off lines to git messages or styling git messages, however I found the following information regarding client side hooks bellow quite alarming.

**It’s important to note that client-side hooks are not copied when you clone a repository. If your intent with these scripts is to enforce a policy, you’ll probably want to do that on the server side; see the example in An** [Example Git-Enforced Policy](https://git-scm.com/book/en/v2/Customizing-Git-An-Example-Git-Enforced-Policy#_an_example_git_enforced_policy)

## Sources of information
Some good example use-cases of hooks and projects using hooks can be found at [githooks.com](https://githooks.com)

The official git documentation [Git Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) and the sample files provided with git init.

This website contains a nice table of the hooks, their description and any arguments they require [Digital Ocean - How to use git hooks to automate development and deployment tasks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)

