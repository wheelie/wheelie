# Changelog

## 0.2.0 [2016-08-06]

**Breaking changes**
* issue [#29][29]: updated settings defaults (``writeLevel``, ``build`` and ``dist``)

**Improvements**
* issue [#31][31]: config file is now flat; remove ``logger`` and ``wheelie`` keyword
* issue [#32][32]: using [Jest][jest] as a test framework
* issue [#10][10]: Wheelie internals are now private (``registry`` and ``options``)
* issue [#33][33]: the Task model provides the ``isValid()`` method that validates set fields
* README improvement
* provide documentation

**Bugfixes**
* fixed [#22][22]: the exception system doesn't provide the right amount of information
* fixed [#30][30]: there is no way to update Wheelie internal configurations
* fixed [#34][34]: remove options proxies; enforce a clear way to update Wheelie defaults

[jest]: https://facebook.github.io/jest/
[29]: https://github.com/wheelie/wheelie/issues/29
[31]: https://github.com/wheelie/wheelie/issues/31
[32]: https://github.com/wheelie/wheelie/issues/32
[10]: https://github.com/wheelie/wheelie/issues/10
[33]: https://github.com/wheelie/wheelie/issues/33
[22]: https://github.com/wheelie/wheelie/issues/22
[30]: https://github.com/wheelie/wheelie/issues/30
[34]: https://github.com/wheelie/wheelie/issues/34

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
