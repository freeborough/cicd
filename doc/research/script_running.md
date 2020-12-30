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

I have created a lab setup using Nodejs, express and python to test the data output abilities of this library and discovered that it doesn't run in real time and will only output data once the script has been closed. to get this working just run npm init and npm i express, then run node index.js and point a browser at localhost:3000 and localhost:/files/.

Exec should be used for quick and dirty tasks, spawn should be used for bigger tasks with a lot of output as buffering use by exec takes a lot of memory in comparassion to streaming used by spawn.

Spawn can be used to fullfil promises but I do not have enough knowledge on the subject to test that.
## Findings using this approach.

Using the stream method does allow the execution of commands in the provided lab setup a shell command to list all child files and a python script that prints 11.

In both cases the server will only return the data once the program has closed, halting the loading of the webpage.

However it was possible to process multiple requests at once. for example the files command ran whilst the example sleep,print python script.

This appears to be appropriate for the use case of firing off a script and receiving back the output of the command any errors that occurred and the exit code of said command.


# References

