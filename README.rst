=======
Wheelie
=======

.. image:: https://travis-ci.org/palazzem/wheelie.svg
    :target: https://travis-ci.org/palazzem/wheelie
    :alt: Build Status

.. image:: https://david-dm.org/palazzem/wheelie.svg
    :target: https://david-dm.org/palazzem/wheelie
    :alt: Dependency Status

Small but efficient frontend toolchain, built on top of `Gulp`_ and inspired by `Frigate`_.

This project is under heavy development; further information will be released soon.

Usage
-----

*Disclaimer*: the API isn't stable yet.

Create a ``Gulpfile.js`` in your project root folder with the following content:

.. code-block:: javascript

    // importing Wheelie instance and a list of tasks
    var wheelie = require('wheelie');
    var tasks = require('wheelie-tasks');

    // starting Wheelie defining the default task
    wheelie.add(tasks);
    wheelie.setDefault('watcher');
    wheelie.build();

    // <-- at this point, Gulp is configured according to Wheelie registry

With the above Gulp file, you can launch the ``watcher`` task simply with:

.. code-block:: bash

    $ gulp

Easy not?

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
