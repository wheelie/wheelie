var Wheelie = require('../lib/cli/wheelie');

var Watcher = require('../lib/helpers/watcher');
var Task = require('../lib/models/task');


describe('Auto-watch feature', function() {
  var wheelie = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
    // spy on Gulp
    spyOn(wheelie._gulp, 'task');
    spyOn(wheelie._gulp, 'watch');
  });

  it('should provide a Watcher task with a special name', function() {
    expect(Watcher.name).toBe('__wheelie__');
    expect(Watcher.dependencies).toEqual(['build']);
  });

  it('should add the Watcher task if not in production mode', function() {
    wheelie._options.production = false;
    wheelie.build();

    firstCall = wheelie._gulp.task.calls.argsFor(0);
    expect(wheelie._gulp.task.calls.count()).toBe(2);
    expect(firstCall).toEqual(['__wheelie__', ['build'], undefined]);
  });

  it('should not add the Watcher task if in production mode', function() {
    wheelie._options.production = true;
    wheelie.build();

    firstCall = wheelie._gulp.task.calls.argsFor(0);
    expect(wheelie._gulp.task.calls.count()).toBe(1);
    expect(firstCall[0]).not.toEqual('__wheelie__');
  });

  it('should not add any watcher if the task does not declare something', function() {
    var task = new Task('assets');

    wheelie._options.production = false;
    wheelie.add(task);
    wheelie.build();

    expect(wheelie._gulp.watch.calls.count()).toBe(0);
  });

  it('should add a new watcher if a task declare to do so', function() {
    var config = function() {
      return {
        watcher: 'src/**/*.js'
      }
    }
    var task = new Task('assets', [], jest.fn(), config);

    wheelie._options.production = false;
    wheelie.add(task);
    wheelie.build();

    expect(wheelie._gulp.watch.calls.count()).toBe(1);
    expect(wheelie._gulp.watch).toHaveBeenCalledWith('src/**/*.js', ['assets']);
  });
});
