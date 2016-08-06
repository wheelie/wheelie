var IllegalArgument = require('../lib/errors/exceptions').IllegalArgument;
var KeyError = require('../lib/errors/exceptions').KeyError;

var Registry = require('../lib/models/registry');
var Task = require('../lib/models/task');


describe('Registry model', function() {
  var registry = null;

  beforeEach(function() {
    registry = new Registry();
  });

  it('should have initialized status variables', function() {
    expect(registry.list).toEqual({});
    expect(registry.size).toBe(0);
  });

  describe('add method', function() {
    it('should add a new Task if it\'s an instance of Task', function() {
      var task = new Task('assets', [], function() {});
      var fn = function() { registry.add(task); };
      expect(fn).not.toThrow();
    });

    it('should throw an IllegalArgument if the argument is not a valid instance of Task', function() {
      var task = 'nope';
      var fn = function() { registry.add(task); };
      expect(fn).toThrowError(IllegalArgument);
    });

    it('should increase the internal size attribute', function() {
      var task = new Task('assets', [], function() {});
      registry.add(task);
      expect(registry.size).toBe(1);
    });
  });

  describe('get method', function() {
    it('should return a Task if it\'s available inside the registry', function() {
      var task = new Task('assets', [], function() {});
      registry.add(task);
      expect(registry.get('assets')).toEqual(task);
    });

    it('should raise a KeyError exception if the task is not available in the registry', function() {
      var fn = function() { registry.get('nope'); };
      expect(fn).toThrowError(KeyError);
    });
  });

  describe('items method', function() {
    it('should return an empty array if the registry is empty', function() {
      expect(registry.items()).toEqual([]);
    });

    it('should return an array of Task items', function() {
      var assets = new Task('assets', [], function() {});
      var templates = new Task('templates', [], function() {});
      registry.add(assets);
      registry.add(templates);
      expect(registry.items()).toEqual([assets, templates]);
    });
  });

  describe('remove method', function() {
    it('should raise a KeyError exception if the task is not available in the registry', function() {
      var fn = function() { registry.remove('nope'); };
      expect(fn).toThrowError(KeyError);
    });

    it('should remove a Task if it\'s available inside the registry', function() {
      var task = new Task('assets', [], function() {});
      registry.add(task);
      registry.remove('assets');

      var fn = function() { registry.get('assets'); };
      expect(fn).toThrowError(KeyError);
    });

    it('should decrease the internal size attribute', function() {
      var task = new Task('assets', [], function() {});
      registry.add(task);
      registry.remove('assets');
      expect(registry.size).toBe(0);
    });
  });

  describe('update method', function() {
    it('should add options to the Task patches list, if the found task is a Task instance', function() {
      var options = { 'foo': 'bar' };
      var task = new Task('assets', [], function() {});
      registry.add(task);

      registry.update('assets', options);
      expect(registry.get('assets').patches.length).toBe(1);
      expect(registry.get('assets').patches[0]).toEqual(options);
    });

    it('should raise a KeyError exception if the task doesn\'t exist', function() {
      var fn = function() { registry.update('nope', {}); };
      expect(fn).toThrowError(KeyError);
    });
  });
});
