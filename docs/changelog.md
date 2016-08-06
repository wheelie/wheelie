# Changelog

## 0.1.4 [2016-04-15]

* Updating all dependencies

## 0.1.3 [2015-08-12]

* Bugfix: ``Utils#extend()`` method now deeply extends and updates Array objects
* Convention: all paths uses a trailing slash

## 0.1.2 [2015-08-07]

* [#16][16]: ``Task#run()`` method receives Wheelie global options
* [#17][17]: ``noop`` helper that disables a plugin

[16]: https://github.com/wheelie/wheelie/issues/16
[17]: https://github.com/wheelie/wheelie/issues/17

## 0.1.1 [2015-08-07]

* added ``gulp-notify`` plugin used by the error handler

## 0.1.0 [2015-08-07]

* First pre-release
* Sharing the same ``gulp`` instance imported from the main project
* Providing the Wheelie ``registry``
* ``Task#config()`` lazy loading
* Wheelie tasks configurations can be updated using ``Wheelie#update()``
