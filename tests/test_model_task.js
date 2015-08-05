var exceptions = require('../lib/exceptions');
var Task = require('../lib/models/task');

describe('Task model', function() {
  describe('has mandatory fields', function() {
    it('should fail to initialize if the name is missing', function() {
      var fn = function() { new Task(undefined) };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should fail to initialize if the dependencies are missing', function() {
      var fn = function() { new Task('name', undefined) };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should fail to initialize if the run is missing', function() {
      var fn = function() { new Task('name', [], undefined) };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should fail to initialize if the run argument isn\'t a function', function() {
      var fn = function() { new Task('name', [], "not_a_function") };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should throw a NotImplementedError with the default function', function() {
      var fn = function() { new Task('name', [], Task.prototype.run).run() };
      expect(fn).to.throw('NotImplementedError');
    });

    it('should fail if config() is not a function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}, {'key': 'value'}) };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should work with valid arguments without config() function', function() {
      var task;

      var fn = function() { task = new Task('name', [], function() {}) };
      expect(fn).to.not.throw('IllegalArgument');
      expect(task.name).to.be.equal('name');
      expect(typeof task.run).to.be.equal('function');
      expect(task.config()).to.be.eql({});
    });

    it('should work with valid arguments', function() {
      var task;

      var config = function() { return {'key': 'value'} };
      var fn = function() { task = new Task('name', [], function() {}, config) };
      expect(fn).to.not.throw('IllegalArgument');
      expect(task.name).to.be.equal('name');
      expect(typeof task.run).to.be.equal('function');
      expect(typeof task.config).to.be.equal('function');
      expect(task.config()).to.be.eql({'key': 'value'});
    });
  });
});
