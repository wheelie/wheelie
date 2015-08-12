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
      expect(wheelie.options.src).to.be.equal('client/');
      expect(wheelie.options.build).to.be.equal('build/');
      expect(wheelie.options.dist).to.be.equal('dist/');
      expect(wheelie.options.production).to.be.false;
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
    it('should change the "src" folder attribute', function() {
      wheelie.setSrc('new_source');
      expect(wheelie.options.src).to.be.equal('new_source');
    });

    it('should change the "build" folder attribute', function() {
      wheelie.setBuild('new_destination');
      expect(wheelie.options.build).to.be.equal('new_destination');
    });

    it('should change the "dist" folder attribute', function() {
      wheelie.setDist('new_destination');
      expect(wheelie.options.dist).to.be.equal('new_destination');
    });

    it('should return the "build" folder if production flag is false', function() {
      var out = wheelie.getDest();
      expect(out).to.be.equal('build/');
    });

    it('should return the "dist" folder if production flag is true', function() {
      wheelie.options.production = true;
      var out = wheelie.getDest();
      expect(out).to.be.equal('dist/');
    });
  });
});
