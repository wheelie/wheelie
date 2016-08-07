# Usage

Install Wheelie with the official recipes registry:

```bash
$ npm install --save-dev wheelie wheelie-recipe
```

Create a ``gulpfile.js`` in your project root folder with the following content:

```javascript
  // importing your gulp reference
  var gulp = require('gulp');

  // importing Wheelie constructor and a recipe
  var Wheelie = require('wheelie');
  var recipe = require('wheelie-recipe');

  // adding a Wheelie recipe
  var wheelie = new Wheelie();
  wheelie.add(recipe);
  wheelie.build();

  // <-- at this point, Gulp is configured with a set of tasks available in the wheelie-recipe package
```

With the above ``Gulpfile``, you can launch the ``watch`` task simply with:

```bash
$ gulp
```

# Disable a Task in a recipe

Sometimes recipes are too generic and we may don't need to use a particular task. Unfortunately,
if a task depends on this one, we can't remove it otherwise Gulp starts complaining about a
missing task. A good example is using Wheelie in a Django application with a recipe that does
exactly what we need, but that starts the ``browser-sync`` task.

Because Django already ships with a default ``runserver``, we want to disable ``browser-sync``
and in our ``gulpfile.js`` we can:

```javascript
  var wheelie = new Wheelie();
  wheelie.add(recipe);              // <- `browser-sync` is enabled
  wheelie.disable('browser-sync');  // <- `browser-sync` is disabled
  wheelie.build();
```

# Wheelie options

Wheelie ships with some default configurations, used during tasks registration. The following, are
a list of common settings that you can use during the ``Task`` definition within the ``config()``
method:

```javascript
  colors: {
    'DEBUG': 'white',
    'INFO': 'blue',
    'WARNING': 'yellow',
    'ERROR': 'red',
  },
  writeLevel: 'INFO',
  src: 'client/',
  build: 'static/',
  dist: 'static/',
  entrypoint: '__wheelie__',
  production: !!argv.production
```

* ``colors``: for each log level, defines the chosen color
* ``writeLevel``: defines the current log level
* ``src``: the application source folder
* ``build``: defines the build folder if it's required by some tasks
* ``dist``: defines the output folder if a production build is triggered
* ``entrypoint``: it's the Gulp ``default`` task; you can update it through ``Wheelie#setDefault()`` method,
  or overriding the setting in the constructor
* ``production``: used to alter the task flow (i.e.: write sourcemaps or not)

## Update default options

To update the configuration above, simply pass an ``options`` object to the Wheelie constructor:

```javascript
  var options = {
    writeLevel: 'DEBUG',
    src: 'lib'
  }
  var wheelie = new Wheelie(options);
```

# Wheelie reload

Because Wheelie makes easy to update your tasks configuration, it's usual that you have to restart
Gulp many times. Because we're developers and we're lazy, it's a good idea using an external tool
such as [nodemon][nodemon]. In this way, you can add a ``scripts`` entry in your ``package.json``:

```javascript
  "scripts": {
    "wheelie": "nodemon --watch gulpfile.js --exec gulp",
  },
```

In your shell, just:

```bash
$ npm run wheelie
```

More instructions in the [nodemon documentation][docs].

[nodemon]: http://nodemon.io/
[docs]: https://github.com/remy/nodemon
