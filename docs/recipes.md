# Write your own recipe

A Wheelie recipe is just a collection of ``Gulp`` tasks. Even if you may achieve this work using just ``Gulp#task()``
method, Wheelie exposes a common interface for tasks definition and configurations. In this way, you can
create a collection of common tasks usable among your projects.

The goal of this project is to create a kind of registry for ``Gulp`` so that you can write your frontend toolchain
as a ``npm`` package. Anyway, projects may be slightly different and they may require little customizations such as
changing the destination folder for all of your plugins or changing the image optimization level.
Wheelie addresses the problem, providing an easy way to update your tasks configurations.

## Task

The building block of a Wheelie recipe is the ``Task`` model that defines a ``Gulp`` task. Common examples
are ``watch``, ``sass`` or ``browserify`` tasks.

To create a new ``Task`` you should create a new file in your root folder such as ``tasks/assets.js`` with
the following content:

```javascript
  // requiring the Task model
  var Task = require('wheelie/lib/models/task');

  // this function provides a lazy loading for your task configurations;
  // in this step you can access to the global options
  function config(globals) {
    return {
      src: globals.src + '/assets/**',
      dest: globals.dest + '/assets'
    };
  }

  // this function should return the same callback you usually pass to gulp.task();
  // in this step, you can access to a common gulp reference and to the Task configuration
  // updated with your eventual overrides
  function run(gulp, config) {
    return function() {
        return gulp.src(config.src)
          .pipe(gulp.dest(config.dest));
    };
  }

  // you exports a new Task, named 'assets' with the 'image' task as a dependency;
  // in this case, 'image' task is launched first
  module.exports = new Task('assets', ['image'], run, config);
```

## Task watchers

When you're defining a ``Task`` as you did above, you can set a special attribute to the ``config``
object, so that Wheelie can create automatically a watcher. This makes easy to create your recipe
because you don't need to define a ``watch`` task nor to create a complex way to re-watch changes.

To add a watcher, define the ``config()`` callback as follows:

```javascript
  function config(globals) {
    // assuming src and watcher are the same
    var source = globals.src + '/assets/**';

    return {
      watcher: source,
      src: source,
      dest: globals.dest + '/assets'
    };
  }
```

If the attribute ``watcher`` is missing, no watchers are added into the ``gulp`` instance.

## The recipe

To put everything together, you should create the ``tasks/recipe.js`` file
as your recipe container:

```javascript
  // assuming you have created the following tasks
  var browserify = require('./browserify');
  var sass = require('./sass');
  var assets = require('./assets');
  var templates = require('./templates');
  var build = require('./build');

  // a recipe is just a list of tasks
  module.exports = [browserify, sass, assets, templates, build];
```

**NOTE**: if you're going to use Wheelie auto-watchers, the recipe **SHOULD** expose
a ``build`` task that does all the things.

## Add the recipe

To add the recipe above in Wheelie registry, simply:

```javascript
  // import wheelie and your recipe
  var Wheelie = require('wheelie');
  var recipe = require('./tasks/recipe');

  // add the recipe
  var wheelie = new Wheelie();
  wheelie.add(recipe);
  wheelie.build()
```

Using this configuration, you can launch these ``Gulp`` commands:

```bash
$ gulp             # launches the setDefault argument
$ gulp build       # launches the build TaskGroup
$ gulp sass        # launches the sass Task
$ gulp <whatever>  # ... and so on ...
```

## Reusing the recipe

To simply re-use a recipe, publish a Wheelie recipe into [npm][npm], so that you can install your recipe and
``wheelie`` packages as ``devDependencies`` in your ``package.json``. Your frontend toolchain is now under
version control and you can quickly update your projects workflows after each improvement of the toolchain.

[npm]: https://www.npmjs.com/

## Updating tasks options

Some projects may require different tasks configurations, despite what you've planned while writing your recipe.
For this reason, Wheelie exposes an ``update`` method that replaces a task configuration key with the one you've
provided. In this case you can just:

```javascript
    // gulpfile.js
    // ...

    // update 'sass' configurations, changing 'sourceComments' value to 'map'
    wheelie.update('sass', { sourceComments: 'map' });

    // but don't update your tasks after this point
    // because it's too late
    wheelie.build();
```

During the ``Wheelie#build()`` process, ``Task#config()`` is called and the returned object is patched with your
updates. At this point, the resulting config is passed to ``Task#run()`` method, together with the common ``gulp``
instance.
