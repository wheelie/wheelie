# Usage

Install Wheelie with the official recipes registry:

```bash
$ npm install --save-dev wheelie wheelie-recipe
```

Create a ``gulpfile.js`` in your project root folder with the following content:

```javascript
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
```

With the above ``Gulpfile``, you can launch the ``watch`` task simply with:

```bash
$ gulp
$ gulp watch  # (or)
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
  production: !!argv.production
```

* ``colors``: for each log level, defines the chosen color
* ``writeLevel``: defines the current log level
* ``src``: the application source folder
* ``build``: defines the build folder if it's required by some tasks
* ``dist``: defines the output folder if a production build is triggered
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
