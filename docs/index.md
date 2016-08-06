# Wheelie

Small but efficient frontend toolchain, built on top of [Gulp][gulp].

[gulp]: http://gulpjs.com/

# Support

If you need support, please use the [GitHub issue tracker][1].

[1]: https://github.com/wheelie/wheelie/issues

# Contributing

We love contributions, so please feel free to fix bugs, improve things,
provide documentation. Just follow the guidelines and submit a PR.

# Requirements

* Node 4.x, 5.x, 6.x
* Gulp >= 3.9

# Overview

Wheelie isn't a task runner, a build system or a Gulp wrapper. It's just a common
interface to your Gulp tasks so that you can share, re-use and easily update them,
improving your automated workflow. It ships out of the box with:

* A ``Task`` model to create custom tasks like you usually do with Gulp. The programmatic
  interface exposes a configuration callback so that other developers may re-use your
  task, overriding your defaults.
* Tasks can be grouped together to create a **recipe**. Your frontend toolchain
  becomes a list of Gulp tasks and it can be versioned in a different repository.
  If you publish your recipe into ``npm``, you can update your projects' toolchain with
  just a change in the project's ``package.json``.
* Nothing less that Gulp already offers you. Wheelie takes care about the Gulp configuration
  and it returns a ``gulp`` instance, configured as described in a recipe.
* Wheelie is fast and without overhead; the Gulp configuration happens only once for
  each run.

# License

*Wheelie* is released under the terms of the **BSD license**. Full details in ``LICENSE`` file.
