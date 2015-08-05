var exceptions = require('../lib/exceptions');
var Registry = require('../lib/models/registry');
var Task = require('../lib/models/task');

var registry;

describe('Registry model', function() {

  beforeEach(function() {
    registry = new Registry();
  });

  describe('add method', function() {
    it('should add a new Task if it\'s an instance of Task', function() {
      var task = new Task('assets', [], function() {}, {});
      var fn = function() { registry.add(task); };
      expect(fn).to.not.throw(Error);
    });

    it('should throw an IllegalArgument if the argument is not a valid instance of Task', function() {
      var task = 'nope';
      var fn = function() { registry.add(task); };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('IllegalArgument');
    });

    it('should increase the internal size attribute', function() {
      var task = new Task('assets', [], function() {}, {});
      registry.add(task);
      expect(registry.size).to.be.equal(1);
    });
  });

  describe('get method', function() {
    it('should return a Task if it\'s available inside the registry', function() {
      var task = new Task('assets', [], function() {}, {});
      registry.add(task);
      expect(registry.get('assets')).to.be.eql(task);
    });

    it('should raise a KeyError exception if the task is not available in the registry', function() {
      var fn = function() { registry.get('nope'); };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('KeyError');
    });
  });

  describe('items method', function() {
    it('should return an empty array if the registry is empty', function() {
      expect(registry.items()).to.be.eql([]);
    });

    it('should return an array of Task items', function() {
      var assets = new Task('assets', [], function() {}, {});
      var templates = new Task('templates', [], function() {}, {});
      registry.add(assets);
      registry.add(templates);
      expect(registry.items()).to.be.eql([assets, templates]);
    });
  });

  describe('remove method', function() {
    it('should raise a KeyError exception if the task is not available in the registry', function() {
      var fn = function() { registry.remove('nope'); };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('KeyError');
    });

    it('should remove a Task if it\'s available inside the registry', function() {
      var task = new Task('assets', [], function() {}, {});
      registry.add(task);
      registry.remove('assets');

      var fn = function() { registry.get('assets'); };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('KeyError');
    });

    it('should decrease the internal size attribute', function() {
      var task = new Task('assets', [], function() {}, {});
      registry.add(task);
      registry.remove('assets');
      expect(registry.size).to.be.equal(0);
    });
  });

  describe('update method', function() {
    it('should add options to the Task, if the found task is a Task instance', function() {
      var options = { 'foo': 'bar' };
      var task = new Task('assets', [], function() {});
      registry.add(task);

      registry.update('assets', options);
      expect(registry.get('assets').options).to.be.eql(options);
    });

    it('should update the Task options, if the found task is a Task instance', function() {
      var options = { 'foo': 'bar' };
      var task = new Task('assets', [], function() {}, { 'foo': 'foo', 'bar': 'foo' });
      registry.add(task);

      registry.update('assets', options);
      expect(registry.get('assets').options).to.be.eql({ 'foo': 'bar', 'bar': 'foo' });
    });

    it('should raise a KeyError exception if the task doesn\'t exist', function() {
      var fn = function() { registry.update('nope', {}); };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('KeyError');
    });
  });
});
