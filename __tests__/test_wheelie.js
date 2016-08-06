var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');


describe('Wheelie', function() {
  var wheelie, registry = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
    registry = wheelie._registry;
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
      expect(wheelie._gulp.tasks).not.toBe(undefined);
      expect(wheelie._gulp.isRunning).toBe(false);
    });

    it('should store config defaults', function() {
      expect(wheelie._options).not.toBe(undefined);
      expect(wheelie._options.writeLevel).toEqual('INFO');
      expect(wheelie._options.src).toEqual('client/');
      expect(wheelie._options.build).toEqual('static/');
      expect(wheelie._options.dist).toEqual('static/');
      expect(wheelie._options.production).toBe(false);
    });

    it('should accept options during the initialization', function() {
      var options = {
        writeLevel: 'WARNING',
        src: 'src/',
        build: 'build/',
        dist: 'dist/'
      }

      wheelie = new Wheelie(options, 'another_gulp');
      expect(wheelie._gulp).toEqual('another_gulp');
      expect(wheelie._options.gulp).toBe(undefined);
      expect(wheelie._options.writeLevel).toEqual('WARNING');
      expect(wheelie._options.src).toEqual('src/');
      expect(wheelie._options.build).toEqual('build/');
      expect(wheelie._options.dist).toEqual('dist/');
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
      expect(wheelie._options.src).toEqual('new_source');
    });

    it('should change the "build" folder attribute', function() {
      wheelie.setBuild('new_destination');
      expect(wheelie._options.build).toEqual('new_destination');
    });

    it('should change the "dist" folder attribute', function() {
      wheelie.setDist('new_destination');
      expect(wheelie._options.dist).toEqual('new_destination');
    });

    it('should return the "static" folder if production flag is false', function() {
      var out = wheelie._getDest();
      expect(out).toEqual('static/');
    });

    it('should return the "static" folder if production flag is true', function() {
      wheelie._options.production = true;
      var out = wheelie._getDest();
      expect(out).toEqual('static/');
    });
  });
});
