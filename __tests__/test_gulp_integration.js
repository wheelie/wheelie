var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');


describe('Wheelie,', function() {
  var wheelie = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
    // spy on Gulp
    spyOn(wheelie._gulp, 'task');
  });

  describe('tasks registration', function() {
    it('should inject all registered tasks with their callbacks into the Gulp registry', function() {
      var gulpTask = jest.fn();
      var run = jest.fn().mockReturnValue(gulpTask);

      var task = new Task('task', [], run);
      var anotherTask = new Task('task_2', ['task'], run);

      wheelie.add([task, anotherTask]);
      wheelie.build();

      firstCall = wheelie._gulp.task.calls.argsFor(0);
      secondCall = wheelie._gulp.task.calls.argsFor(1);
      expect(firstCall).toEqual(['task', [], gulpTask]);
      expect(secondCall).toEqual(['task_2', ['task'], gulpTask]);
    });

    it('should register the Gulp task that doesn\'t have a run() callback', function() {
      var task = new Task('task', []);

      wheelie.add(task);
      wheelie.build();

      expect(wheelie._gulp.task).toHaveBeenCalledWith('task', [], undefined);
    });
  });

  describe('tasks configuration loader', function() {
    it('should call the config() callback for each task', function() {
      var config = jest.fn().mockReturnValue({});
      var task = new Task('task', [], jest.fn(), config);

      wheelie.add(task);
      wheelie.build();

      expect(config.mock.calls.length).toBe(1);
    });

    it('should pass the global settings to each task config() callback', function() {
      var config = jest.fn().mockReturnValue({});
      var task = new Task('task', [], jest.fn(), config);

      wheelie.add(task);
      wheelie.build();

      expect(config.mock.calls[0][0]).toEqual(wheelie._options);
    });

    it('should provide a "dest" folder according to production status', function() {
      spyOn(wheelie, '_getDest').and.returnValue('something');

      var config = jest.fn().mockReturnValue({});
      var task = new Task('task', [], jest.fn(), config);

      wheelie.add(task);
      wheelie.build();

      expect(wheelie._getDest.calls.count()).toBe(1);
      expect(config.mock.calls[0][0]).not.toBe(undefined);
    });

    it('should prevent global settings pollution between plugins execution', function() {
      var run = jest.fn().mockReturnValueOnce(jest.fn());
      var goodConfig = jest.fn().mockReturnValue({});

      var maliciousConfig = function(globals) {
        globals.dest = '/';
        return {};
      }

      var task = new Task('task', [], run, maliciousConfig);
      var anotherTask = new Task('task_2', ['task'], run, goodConfig);

      wheelie.add([task, anotherTask]);
      wheelie.build();

      expect(goodConfig.mock.calls[0][0].dest).not.toEqual('/');
    });
  });

  describe('tasks executor', function() {
    it('should apply a patch to the generated config() object', function() {
      var run = jest.fn();
      var config = jest.fn().mockReturnValue({'key': 'value'});
      var patch = {'patch': 'applied'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', patch);
      wheelie.build();

      args = run.mock.calls[0];
      expect(args[0]).toEqual(wheelie._gulp);
      expect(args[1]).toEqual({'key': 'value', 'patch': 'applied'});
    });

    it('should apply all patches to the generated config() object', function() {
      var run = jest.fn();
      var config = jest.fn().mockReturnValue({'key': 'value'});
      var firstPatch = {'patch': 'applied'};
      var secondPatch = {'key': 'changed'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', firstPatch);
      wheelie.update('task', secondPatch);
      wheelie.build();

      args = run.mock.calls[0];
      expect(args[0]).toEqual(wheelie._gulp);
      expect(args[1]).toEqual({'key': 'changed', 'patch': 'applied'});
    });

    it('should pass the gulp instance to the run() callback', function() {
      var run = jest.fn();
      var config = jest.fn().mockReturnValue({'key': 'value'});

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.mock.calls[0];
      expect(args[0]).toEqual(wheelie._gulp);
    });

    it('should pass the config() object to the run() callback', function() {
      var run = jest.fn();
      var config = jest.fn().mockReturnValue({'key': 'value'});

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.mock.calls[0];
      expect(args[1]).toEqual({'key': 'value'});
    });

    it('should pass the Wheelie global options to the run() callback', function() {
      var run = jest.fn();
      var config = jest.fn().mockReturnValue({'key': 'value'});

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.mock.calls[0];
      expect(args[2]).toEqual(wheelie._options);
    });
  });
});
