var exceptions = require('../lib/errors/exceptions');
var Task = require('../lib/models/task');

describe('Task model', function() {
  describe('has mandatory fields', function() {
    it('should fail to initialize if the name is missing', function() {
      var fn = function() { new Task(undefined) };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });

    it('should fail to initialize if the dependencies are missing', function() {
      var fn = function() { new Task('name', undefined) };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });

    it('should fail to initialize if the run argument isn\'t a function', function() {
      var fn = function() { new Task('name', [], "not_a_function") };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });

    it('should fail if config() is not a function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}, {'key': 'value'}) };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });

    it('should return an undefined reference when calling the "super class" run() method', function() {
      var task = new Task('name', []);
      expect(task.run()).toBe(undefined);
    });

    it('should work with valid arguments but without run() function', function() {
      var task;

      var fn = function() { task = new Task('name', []) };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(task.config()).toEqual({});
    });

    it('should work with valid arguments but without config() function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}) };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(task.config()).toEqual({});
    });

    it('should work with valid arguments', function() {
      var task;

      var config = function() { return {'key': 'value'} };
      var fn = function() { task = new Task('name', [], function() {}, config) };
      expect(fn).not.toThrow();
      expect(task.name).toEqual('name');
      expect(task.dependencies).toEqual([]);
      expect(typeof task.run).toEqual('function');
      expect(typeof task.config).toEqual('function');
      expect(task.config()).toEqual({'key': 'value'});
    });
  });
});
