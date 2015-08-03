var notify = require('gulp-notify');


module.exports = {
  notifyError: notifyError
};

function notifyError() {
  var args = Array.prototype.slice.call(arguments);

  // send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // keep gulp from hanging on this task
  this.emit('end');
}
