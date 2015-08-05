var Wheelie = require('../lib/cli/wheelie');

var Registry = require('../lib/models/registry');
var Task = require('../lib/models/task');


describe('Wheelie', function() {
  var wheelie;
  var registry;

  beforeEach(function() {
    // initializes Wheelie with a stubbed registry
    wheelie = new Wheelie();
    registry = wheelie.registry;
    sinon.stub(registry, 'add');
    sinon.stub(registry, 'remove');
    sinon.stub(registry, 'update');
  });

  describe('initialization', function() {
    it('should create an empty registry', function() {
      expect(registry.list).to.be.eql({});
    });

    it('should store the gulp reference', function() {
      expect(wheelie.gulp.tasks).to.not.be.undefined;
      expect(wheelie.gulp.isRunning).to.be.false;
    });

    it('should store global options', function() {
      expect(wheelie.options).to.not.be.undefined;
      expect(wheelie.options.src).to.be.equal('client');
      expect(wheelie.options.dest).to.be.equal('dist');
    });
  });

  describe('registry manipulation', function() {
    it('should add a Task into the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.add(task);
      expect(registry.add.calledOnce).to.be.true;
    });

    it('should add a group of Task into the registry', function() {
      var task = new Task('task', [], function() {});
      var anotherTask = new Task('task_2', [], function() {});

      wheelie.add([task, anotherTask]);
      expect(registry.add.calledTwice).to.be.true;
    });

    it('should remove a Task from the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.remove('task');
      expect(registry.remove.calledOnce).to.be.true;
    });

    it('should update a Task in the registry', function() {
      var task = new Task('task', [], function() {});
      wheelie.update('task', {});
      expect(registry.update.calledOnce).to.be.true;
    });
  });

  describe('configurations', function() {
    it('should change the global src attribute', function() {
      wheelie.setSource('new_source');
      expect(wheelie.options.src).to.be.equal('new_source');
    });

    it('should change the global dest attribute', function() {
      wheelie.setDestination('new_destination');
      expect(wheelie.options.dest).to.be.equal('new_destination');
    });
  });
});
