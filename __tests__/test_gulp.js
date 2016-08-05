var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');


describe('Wheelie,', function() {
  var wheelie = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
    // spy on Gulp
    spyOn(wheelie.gulp, 'task');
  });

  it('should inject all registered tasks with their callbacks into the Gulp registry', function() {
    var gulpTask = jasmine.createSpy();
    var run = function() { return gulpTask; };

    var task = new Task('task', [], run);
    var anotherTask = new Task('task_2', ['task'], run);

    wheelie.add([task, anotherTask]);
    wheelie.build();

    firstCall = wheelie.gulp.task.calls.argsFor(0);
    secondCall = wheelie.gulp.task.calls.argsFor(1);
    expect(firstCall).toEqual(['task', [], gulpTask]);
    expect(secondCall).toEqual(['task_2', ['task'], gulpTask]);
  });

  it('should register the Gulp task that doesn\'t have a run() callback', function() {
    var task = new Task('task', []);

    wheelie.add(task);
    wheelie.build();

    expect(wheelie.gulp.task).toHaveBeenCalledWith('task', [], undefined);
  });

  describe('tasks configuration loader', function() {
    it('should call the config() callback for each task', function() {
      var emptyFn = function() {};
      var config = jasmine.createSpy();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      expect(config.calls.count()).toBe(1);
    });

    it('should pass the global settings to each task config() callback', function() {
      var emptyFn = function() {};
      var config = jasmine.createSpy();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      expect(config).toHaveBeenCalledWith(wheelie.options);
    });

    it('should provide a "dest" folder according to production status', function() {
      spyOn(wheelie, 'getDest').and.returnValue('something');

      var emptyFn = function() {};
      var config = jasmine.createSpy();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      var passedSettings = config.calls.argsFor(0)[0];

      expect(wheelie.getDest.calls.count()).toBe(1);
      expect(passedSettings.dest).not.toBe(undefined);
    });

    it('should prevent global settings pollution between plugins execution', function() {
      var run = function() { return jasmine.createSpy(); };
      var goodConfig = jasmine.createSpy();

      var maliciousConfig = function(globals) {
        globals.dest = '/';
        return {};
      }

      var task = new Task('task', [], run, maliciousConfig);
      var anotherTask = new Task('task_2', ['task'], run, goodConfig);

      wheelie.add([task, anotherTask]);
      wheelie.build();

      var passedSettings = goodConfig.calls.argsFor(0)[0];
      expect(passedSettings.dest).not.toEqual('/');
    });
  });

  describe('tasks executor', function() {
    it('should apply a patch to the generated config() object', function() {
      var run = jasmine.createSpy();
      var config = function() { return {'key': 'value'}; };
      var patch = {'patch': 'applied'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', patch);
      wheelie.build();

      args = run.calls.argsFor(0);
      expect(args[0]).toEqual(wheelie.gulp);
      expect(args[1]).toEqual({'key': 'value', 'patch': 'applied'});
    });

    it('should apply all patches to the generated config() object', function() {
      var run = jasmine.createSpy();
      var config = function() { return {'key': 'value'}; };
      var firstPatch = {'patch': 'applied'};
      var secondPatch = {'key': 'changed'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', firstPatch);
      wheelie.update('task', secondPatch);
      wheelie.build();

      args = run.calls.argsFor(0);
      expect(args[0]).toEqual(wheelie.gulp);
      expect(args[1]).toEqual({'key': 'changed', 'patch': 'applied'});
    });

    it('should pass the gulp instance to the run() callback', function() {
      var run = jasmine.createSpy();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.calls.argsFor(0);
      expect(args[0]).toEqual(wheelie.gulp);
    });

    it('should pass the config() object to the run() callback', function() {
      var run = jasmine.createSpy();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.calls.argsFor(0);
      expect(args[1]).toEqual(object);
    });

    it('should pass the Wheelie global options to the run() callback', function() {
      var run = jasmine.createSpy();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.calls.argsFor(0);
      expect(args[2]).toEqual(wheelie.options);
    });
  });
});
