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

Wheelie isn't a task runner, a build system or a ``Gulp`` wrapper. It's just a common interface
to your ``Gulp`` tasks so that you can reshare, reuse and update them easily improving your
automated workflow.

.. _Gulp: http://gulpjs.com/
.. _Frigate: https://github.com/lincolnloop/generator-frigate

Usage
-----

**Warning**: the public API isn't stable yet and may be changed in the future!

Create a ``Gulpfile.js`` in your project root folder with the following content:

.. code-block:: javascript

    // importing your gulp reference
    var gulp = require('gulp');

    // importing Wheelie instance and a list of tasks (recipe)
    var wheelie = require('wheelie');
    var recipe = require('wheelie-recipe');

    // adding a recipe to Wheelie, defining the default task
    wheelie.add(recipe);
    wheelie.setDefault('watch');
    wheelie.build();

    // <-- at this point, Gulp is configured with a set of tasks available in the wheelie-recipe package

With the above ``Gulpfile``, you can launch the ``watch`` task simply with:

.. code-block:: bash

    $ gulp
    $ gulp watch  # ... or ...

Easy not?

Write your own recipe
---------------------

A Wheelie recipe is just a collection of ``Gulp`` tasks. Even if you may achieve this work using just ``Gulp#task()``
method, Wheelie exposes a common interface for tasks definition and configurations passing. In this way, you can
create a collection of common tasks usable for all of your projects.

The goal of this project is to create a kind of registry for ``Gulp`` tasks so that you can write your own
``npm`` packages, that contain your common ``Gulp`` tasks. In the meantime, because every project may be different
and may require little customizations (i.e. changing the destination folder for all of your plugins or changing
the image optimization level), Wheelie provides an easy way to update your plugins configurations.

Task
~~~~

The building block of a Wheelie recipe is the ``Task`` model that defines a ``Gulp`` task. Common examples
are ``watch``, ``sass`` or ``browserify`` tasks.

To create a new ``Task`` you should create a new file in your root folder such as ``tasks/assets.js`` with
the following content:

.. code-block:: javascript

    // requiring the Task model
    var Task = require('../models/task');

    // this function provides a lazy loading for your task configurations;
    // in this step, you can access to the wheelie global options
    function config(globals) {
      return {
        src: globals.src + '/assets/**',
        dest: globals.dest + '/assets'
      };
    }

    // this function should return the same callback you usually pass to gulp.task();
    // in this step, you can access to a common gulp reference and to the Task config
    // options, eventually updated by your gulpfile.js
    function run(gulp, config) {
      return function() {
          return gulp.src(config.src)
            .pipe(gulp.dest(config.dest));
      };
    }

    // you exports a new Task, named 'assets' with the 'image' task as a dependency;
    // in this case, 'image' task is launched first
    module.exports = new Task('assets', ['image'], run, config);


The recipe
~~~~~~~~~~

To put everything together, you should create the ``tasks/recipe.js`` file
as your recipe container:

.. code-block:: javascript

    // assuming you have the following tasks
    var browserify = require('./browserify');
    var sass = require('./sass');
    var assets = require('./assets');
    var templates = require('./templates');
    var build = require('./build');

    // you should just return a list of them
    module.exports = [browserify, sass, assets, templates, build];


To add the recipe above in Wheelie tasks list, simply:

.. code-block:: javascript

    // ...

    // import wheelie and your recipe
    var wheelie = require('wheelie');
    var recipe = require('./tasks/recipe');

    // add the recipe and set a default (not mandatory)
    wheelie.add(recipe);
    wheelie.setDefault('build');

    // ...


Using this configuration, you can launch these ``Gulp`` commands:

.. code-block:: bash

    $ gulp             # launches the setDefault argument
    $ gulp build       # launches the build TaskGroup
    $ gulp sass        # launches the sass Task
    $ gulp <whatever>  # ... and so on ...


Reusing the recipe
~~~~~~~~~~~~~~~~~~

To reuse a recipe you can create a Wheelie recipe `npm`_ plugin so that you can simply install your recipe
and ``wheelie`` packages as ``devDependencies`` in your ``package.json`` file. In this way, you can version
your recipes and quickly update your projects workflows.

.. _npm: https://www.npmjs.com/

Updating tasks options
~~~~~~~~~~~~~~~~~~~~~~

Some projects may require different tasks configurations, despite what you've planned while writing your recipe.
For this reason, Wheelie exposes an ``update`` method that replaces a task configuration key with the one you've
provided. In this case you can just:

.. code-block:: javascript

    // gulpfile.js
    // ...

    // update 'sass' configurations, changing 'sourceComments' value to 'map'
    wheelie.update('sass', { sourceComments: 'map' });

    // but don't update your tasks after this point
    wheelie.build();


During the ``Wheelie#build()`` process, ``Task#config()`` is called and the returned object is patched with your
updates. At this point, the resulting config is passed to ``Task#run()`` method, together with the common ``gulp``
instance.

Examples
--------

You can find a ``gulpfile.js`` example in the ``examples/`` folder. Go into that folder
and launch ``gulp`` as usual. This initial example will print the current ``Task`` configuration
together with the ``gulp`` instance object.

Testing
-------

We use `Testem`_ as a test runner. Install all development dependencies and launch Testem
in continuous integration mode:

.. code-block:: bash

    $ npm install
    $ npm run test     # (launches testem in CI mode)
    $ npm run test:tdd # (uses testem TDD mode)
    $ npm run jshint   # (linting)


.. _Testem: https://github.com/airportyh/testem

License
-------

Wheelie is released under the terms of the **BSD LICENSE**. Full details in ``LICENSE`` file.

Changelog
---------

0.1.0 [2015-08-07]
~~~~~~~~~~~~~~~~~~

* First pre-release
* Sharing the same ``gulp`` instance imported from the main project
* Providing the Wheelie registry
* ``Task#config()`` lazy loading
* Wheelie tasks configurations can be updated using ``Wheelie#update()``
