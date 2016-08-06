=======
Wheelie
=======

.. image:: https://travis-ci.org/palazzem/wheelie.svg
    :target: https://travis-ci.org/palazzem/wheelie
    :alt: Build Status

.. image:: https://codecov.io/gh/palazzem/wheelie/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/palazzem/wheelie
    :alt: Coverage Status

.. image:: https://david-dm.org/palazzem/wheelie.svg
    :target: https://david-dm.org/palazzem/wheelie
    :alt: Dependency Status

.. image:: https://david-dm.org/palazzem/wheelie/dev-status.svg
    :target: https://david-dm.org/palazzem/wheelie#info=devDependencies
    :alt: Dev Dependency Status

Small but efficient frontend toolchain, built on top of `Gulp`_.

.. _Gulp: http://gulpjs.com/

Support
-------

If you need support, please use the `GitHub issue tracker`_.

.. _GitHub issue tracker: https://github.com/palazzem/wheelie/issues

Contributing
------------

We love contributions, so please feel free to fix bugs, improve things,
provide documentation. Just follow the guidelines and submit a PR.

Requirements
------------

* Node 4.x, 5.x, 6.x
* Gulp >= 3.9

Overview
--------

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

Getting started
---------------

Install Wheelie with the official recipes registry::

    $ npm install --save-dev wheelie wheelie-recipe

Create a ``gulpfile.js`` in your project root folder with the following content:

.. code-block:: javascript

    // importing your gulp reference
    var gulp = require('gulp');

    // importing Wheelie constructor and a list of tasks (recipe)
    var Wheelie = require('wheelie');
    var recipe = require('wheelie-recipe');

    // adding a recipe to Wheelie, using "watch" as default task
    var wheelie = new Wheelie();
    wheelie.add(recipe);
    wheelie.setDefault('watch');
    wheelie.build();

    // <-- at this point, Gulp is configured with a set of tasks available in the wheelie-recipe package

With the above ``Gulpfile``, you can launch the ``watch`` task simply with:

.. code-block:: bash

    $ gulp
    $ gulp watch  # (or)

Official recipes
----------------

`wheelie-recipe`_ is a recipe currently maintained by Wheelie core developers. We're not suggesting
our way to write frontend applications, but just to inspire and enforce a community-driven way to write
Wheelie recipes.

.. _wheelie-recipe: https://github.com/palazzem/wheelie-recipe

Testing
-------

We use `Jest`_ as a test framework. Install all development dependencies and launch the test
suite:

.. code-block:: bash

    $ npm install
    $ npm test

.. _Jest: https://facebook.github.io/jest/

Documentation
-------------

Full documentation for the project is available at http://wheelie.readthedocs.io/

License
-------

Wheelie is released under the terms of the **BSD LICENSE**. Full details in ``LICENSE`` file.
