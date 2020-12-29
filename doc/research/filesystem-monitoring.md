# Research: Filesystem Monitoring
Author(s):
  Andy Freeborough <andy@freeborough.com>

## Introduction

In-order to use filesystem monitoring as a trigger/input mechanism we need to research them:

* How they work.
* What information they pass.
* What limits, if any, there are.

## How Others Do It

Looking at how other applications do it like nodemon, live-server, etc. two things become clear:

1. The built-in node fs module provides this feature but is error-prone, especially in certain configurations.
2. Everyone uses the [Chokidar](https://www.npmjs.com/package/chokidar) package.  And I do mean everyone - it has over 6,500 npm dependents, 7 million github repo dependents, and over 15 million weekly downloads.

## Chokidar

There's very little to say - it's wildly popular including being in major systems, simple API, cross-platform, well-mainted, and thoroughly tested.

## References

* [Chokidar](https://www.npmjs.com/package/chokidar)
