var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');


describe('Wheelie', function() {
  var wheelie, registry = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
    registry = wheelie.registry;
    // spy on Registry
    spyOn(registry, 'add');
    spyOn(registry, 'remove');
    spyOn(registry, 'update');
  });

  describe('initialization', function() {
    it('should create an empty registry', function() {
      expect(registry.list).toEqual({});
    });

    it('should store the gulp reference', function() {
      expect(wheelie.gulp.tasks).not.toBe(undefined);
      expect(wheelie.gulp.isRunning).toBe(false);
    });

    it('should store global options', function() {
      expect(wheelie.options).not.toBe(undefined);
      expect(wheelie.options.src).toEqual('client/');
      expect(wheelie.options.build).toEqual('static/');
      expect(wheelie.options.dist).toEqual('static/');
      expect(wheelie.options.production).toBe(false);
    });
  });

  describe('registry manipulation', function() {
    it('should add a Task into the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.add(task);
      expect(registry.add.calls.count()).toBe(1);
    });

    it('should add a group of Task into the registry', function() {
      var task = new Task('task', [], function() {});
      var anotherTask = new Task('task_2', [], function() {});

      wheelie.add([task, anotherTask]);
      expect(registry.add.calls.count()).toBe(2);
    });

    it('should remove a Task from the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.remove('task');
      expect(registry.remove.calls.count()).toBe(1);
    });

    it('should update a Task in the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.update('task', {});
      expect(registry.update.calls.count()).toBe(1);
    });
  });

  describe('configurations', function() {
    it('should change the "src" folder attribute', function() {
      wheelie.setSrc('new_source');
      expect(wheelie.options.src).toEqual('new_source');
    });

    it('should change the "build" folder attribute', function() {
      wheelie.setBuild('new_destination');
      expect(wheelie.options.build).toEqual('new_destination');
    });

    it('should change the "dist" folder attribute', function() {
      wheelie.setDist('new_destination');
      expect(wheelie.options.dist).toEqual('new_destination');
    });

    it('should return the "static" folder if production flag is false', function() {
      var out = wheelie.getDest();
      expect(out).toEqual('static/');
    });

    it('should return the "static" folder if production flag is true', function() {
      wheelie.options.production = true;
      var out = wheelie.getDest();
      expect(out).toEqual('static/');
    });
  });
});
