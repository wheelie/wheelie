var through = require("through2");


/**
 * Returns a Gulp task that doesn't do anything. This helper may be used to
 * disable a Gulp task according to a precondition. For instance, you may
 * deactivate the CSS minification if you are not in production mode.
 */
function noop() {
  return through.obj(function (file, enc, cb) {
    cb(null, file);
  });
}

module.exports = noop;
