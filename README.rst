=======
Wheelie
=======

.. image:: https://travis-ci.org/palazzem/wheelie.svg
    :target: https://travis-ci.org/palazzem/wheelie
    :alt: Build Status

.. image:: https://david-dm.org/palazzem/wheelie.svg
    :target: https://david-dm.org/palazzem/wheelie
    :alt: Dependency Status

.. image:: https://david-dm.org/palazzem/wheelie/dev-status.svg
    :target: https://david-dm.org/palazzem/wheelie#info=devDependencies
    :alt: Dev Dependency Status

Small but efficient frontend toolchain, built on top of `Gulp`_ and inspired by `Frigate`_.

Wheelie isn't a task runner, a build system, a ``Gulp`` wrapper or anything like this. It's just a common
interface to define your ``Gulp`` recipes so that you can easily reshare, reuse and update at once your
automated workflow.

This project is under **heavy development**; further information will be released soon.

Usage
-----

**Warning**: the public API isn't stable yet and may be changed in future!

Create a ``Gulpfile.js`` in your project root folder with the following content:

.. code-block:: javascript

    // importing Wheelie instance and a list of tasks
    var wheelie = require('wheelie');
    var recipe = require('wheelie-recipe');

    // starting Wheelie defining the default task
    wheelie.add(recipe);
    wheelie.setDefault('watch');
    wheelie.build();

    // <-- at this point, Gulp is configured according to Wheelie registry

With the above ``Gulpfile``, you can launch the ``watch`` task simply with:

.. code-block:: bash

    $ gulp
    $ gulp watch  # ... or ...

Easy not?

Wheelie recipes
---------------

A Wheelie recipe is just a collection of common ``Gulp`` tasks. Even if this work can be achieved using
``Gulp`` directly, Wheelie exposes a common interface for tasks creation and global options. In this way, you can
create a collection of common tasks usable in all of your projects.


Write your own recipe
---------------------

The building blocks of a Wheelie recipe are:

* ``Task`` that represents a single ``Gulp`` task; common examples are ``watch``, ``sass`` or ``browserify``
* ``TaskGroup`` that represents a collection of tasks; a common example is ``build``

Task
~~~~

To create a new ``Task`` you should create a new file in your root folder such as ``tasks/assets.js`` with
the following content:

.. code-block:: javascript

    var Task = require('wheelie/models/task');
    var gulp = require('wheelie').gulp;
    var options = require('wheelie').options;

    var config = {
      src: options.src + '/assets/**',
      dest: options.dest + '/assets'
    }

    function run() {
      return gulp.src(config.src)
          .pipe(gulp.dest(config.dest));
    }

    module.exports = new Task('assets', run, config);


TaskGroup
~~~~~~~~~

For this example we may assume that we have some common tasks such as ``'browserify``, ``sass``, ``assets``
and ``templates`` that are part of the ``build`` group. To create a new ``TaskGroup`` you should create
the ``tasks/build.js`` file in your root folder with the following content:

.. code-block:: javascript

    var TaskGroup = require('wheelie/models/task_group');
    module.exports = new TaskGroup('build', ['browserify', 'sass', 'assets', 'templates']);


The recipe
~~~~~~~~~~

The first step is to create the ``tasks/recipe.js`` file as your recipe container:

.. code-block:: javascript

    var browserify = require('./browserify');
    var sass = require('./sass');
    var assets = require('./assets');
    var templates = require('./templates');
    var build = require('./build');

    module.exports = [browserify, sass, assets, templates, build];


Then, you should just configure Wheelie to add your recipe in its recipe list:

.. code-block:: javascript

    var wheelie = require('wheelie');
    var recipe = require('./tasks/recipe');

    // starting Wheelie defining the default task
    wheelie.add(recipe);
    wheelie.setDefault('build');
    wheelie.build();


This configuration, allows you to launch these ``Gulp`` commands:

.. code-block:: bash

    $ gulp             # launches the setDefault argument
    $ gulp build       # launches the build TaskGroup
    $ gulp sass        # launches the sass Task
    $ gulp <whatever>  # ... and so on ...


Reusing the recipe
~~~~~~~~~~~~~~~~~~

To reuse a recipe you can create a Wheelie recipe `npm`_ plugin so that you can simply install your recipe
and ``wheelie`` packages as ``devDependencies`` in your ``package.json`` file. In this way, you can version
your recipes and quickly update at once all your projects.

Anyway, some projects may be different from others and you may need some tweaks among tasks configurations.
For this reason, Wheelie exposes an ``update`` method that replaces the task configuration keys with the one
provided. In this case you can just:

.. code-block:: javascript

    // Gulpfile.js
    // ... other Wheelie configurations ...

    wheelie.update('sass', { sourceComments: 'map' });


Easy not?

.. _npm: https://www.npmjs.com/

Examples
--------

You can find a ``Gulpfile.js`` example in the ``examples/`` folder. Go into that folder
and launch ``gulp`` as usual. This initial example will print the current ``Task`` configuration
together with the ``gulp`` instance object.

Testing
-------

We use `Testem`_ as a test runner. Install all development dependencies and launch Testem
in continuous integration mode:

.. code-block:: bash

    $ npm install
    $ npm run test     # (launches testem in CI mode)
    $ npm run test:tdd # (uses testem TDD)
    $ npm run jshint   # (linting)

You can also use the included NPM ``script``, that launches ``jshint`` before CI tests:

.. code-block:: bash

    $ npm test


.. _Testem: https://github.com/airportyh/testem

License
-------

Wheelie is released under the terms of the **BSD LICENSE**. Full details in ``LICENSE`` file.

.. _Gulp: http://gulpjs.com/
.. _Frigate: https://github.com/lincolnloop/generator-frigate
