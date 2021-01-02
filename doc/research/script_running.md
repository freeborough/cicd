# Research: Script Running
Author(s):
Connor Youngs <github@connoryoungs.com> 

## Introduction

We want to know what the best way to run scripts/executables from Nodejs such that the output
can be collected and parsed and that it is stable.

Key things we want to achieve

* Specify the working directory of the command we execute.
* Run the command asynchronously, ideally using promises(sync/await syntax).
* Handle a crash in the command gracefully
* Capture the output of a command, ideally in real-time.


## Options

* [child_process Module](https://nodejs.org/api/child_process.html#child_process_class_childprocess)

### Child Process Module

Allows spawning of child processes and threads to execute shell scripts as to not block 
on the single main js thread.

There are two methods for executing scripts on child processes, exec which collects output
in the form of a callback function, and spawn() which uses an events based system and attaches to stderr stdin and stdout.

Exec should be used for quick and dirty tasks, spawn should be used for bigger tasks with a lot of output as buffering use by exec takes a lot of memory in comparison to streaming used by spawn.

Spawn can be used to fulfil promises but I do not have enough knowledge on the subject to test that.
## Findings using this approach.

Using the stream method does allow the execution of commands in the provided lab setup a shell command to list all child files and a python script that prints 11.

**For python scripts it is neccesary to use python -u to force python to flush print statements to stdout.**

This appears to be appropriate for the use case of firing off a script and receiving back the output of the command any errors that occurred and the exit code of said command.


# Lab setup

There are two lab setups for this research purpose, index.js and spawner.js, both are found in in the lab folder.

* Run node index.js and then point a browser at localhost:3000 and localhost:3000/files the first should print 1-11 and /files will return a list of all the files in the lab directory.

* Run node spawner.js command args will run any command passed to it and output any data the command flushes to stdout.

# Conclusion

Child_process module should do what we want by using the spawn function we can stream data in real-time back to the main node thread by hooking into stderr, stdout and stdin, some wrappers 
for this module for certain languages exist like python-shell. 

This module appears to meet all the criteria above, specifying the working directory, running the command async and allowing promises, handles crashes in a command gracefully as it captures the exit code and can capture the output of a command in real-time as long as it is flushed to stdout.








# References

