var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');


describe('Wheelie,', function() {
  var wheelie;
  var sandbox = sinon.sandbox;

  beforeEach(function() {
    // initializes Wheelie with a stubbed Gulp
    wheelie = new Wheelie();

    sandbox.create();
    sandbox.stub(wheelie.gulp, 'task');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should inject all registered tasks with their callbacks into the Gulp registry', function() {
    var gulpTask = sandbox.stub();
    var run = function() { return gulpTask; };

    var task = new Task('task', [], run);
    var anotherTask = new Task('task_2', ['task'], run);

    wheelie.add([task, anotherTask]);
    wheelie.build();

    firstCall = wheelie.gulp.task.getCall(0);
    secondCall = wheelie.gulp.task.getCall(1);
    expect(firstCall.calledWith('task', [], gulpTask)).to.be.true;
    expect(secondCall.calledWith('task_2', ['task'], gulpTask)).to.be.true;
  });

  it('should register the Gulp task that doesn\'t have a run() callback', function() {
    var task = new Task('task', []);

    wheelie.add(task);
    wheelie.build();

    gulpTask = wheelie.gulp.task.getCall(0);
    expect(gulpTask.calledWith('task', [], undefined)).to.be.true;
  });

  describe('tasks configuration loader', function() {
    it('should call the config() callback for each task', function() {
      var emptyFn = function() {};
      var config = sandbox.stub();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      expect(config.calledOnce).to.be.true;
    });

    it('should pass the global settings to each task config() callback', function() {
      var emptyFn = function() {};
      var config = sandbox.stub();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      expect(config.calledWith(wheelie.options)).to.be.true;
    });

    it('should provide a "dest" folder according to production status', function() {
      var spy = sandbox.spy(wheelie, "getDest");

      var emptyFn = function() {};
      var config = sandbox.stub();

      var task = new Task('task', [], emptyFn, config);

      wheelie.add(task);
      wheelie.build();

      var passedSettings = config.getCall(0).args[0];

      expect(spy.calledOnce).to.be.true;
      expect(passedSettings.dest).to.be.not.undefined;
    });

    it('should prevent global settings pollution between plugins execution', function() {
      var gulpTask = sandbox.stub();
      var run = function() { return gulpTask; };

      var maliciousConfig = function(globals) {
        globals.dest = '/';
        return {};
      }

      var goodConfig = sandbox.stub();

      var task = new Task('task', [], run, maliciousConfig);
      var anotherTask = new Task('task_2', ['task'], run, goodConfig);

      wheelie.add([task, anotherTask]);
      wheelie.build();

      var passedSettings = goodConfig.getCall(0).args[0];
      expect(passedSettings.dest).to.be.not.equal('/');
    });
  });

  describe('tasks executor', function() {
    it('should apply a patch to the generated config() object', function() {
      var run = sandbox.stub();
      var config = function() { return {'key': 'value'}; };
      var patch = {'patch': 'applied'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', patch);
      wheelie.build();

      args = run.getCall(0).args;
      expect(args[0]).to.be.eql(wheelie.gulp);
      expect(args[1]).to.be.eql({'key': 'value', 'patch': 'applied'});
    });

    it('should apply all patches to the generated config() object', function() {
      var run = sandbox.stub();
      var config = function() { return {'key': 'value'}; };
      var firstPatch = {'patch': 'applied'};
      var secondPatch = {'key': 'changed'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.update('task', firstPatch);
      wheelie.update('task', secondPatch);
      wheelie.build();

      args = run.getCall(0).args;
      expect(args[0]).to.be.eql(wheelie.gulp);
      expect(args[1]).to.be.eql({'key': 'changed', 'patch': 'applied'});
    });

    it('should pass the gulp instance to the run() callback', function() {
      var run = sandbox.stub();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.getCall(0).args;
      expect(args[0]).to.be.eql(wheelie.gulp);
    });

    it('should pass the config() object to the run() callback', function() {
      var run = sandbox.stub();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.getCall(0).args;
      expect(args[1]).to.be.eql(object);
    });

    it('should pass the Wheelie global options to the run() callback', function() {
      var run = sandbox.stub();
      var config = function() { return object; };
      var object = {'key': 'value'};

      var task = new Task('task', [], run, config);
      wheelie.add(task);
      wheelie.build();

      args = run.getCall(0).args;
      expect(args[2]).to.be.eql(wheelie.options);
    });
  });
});
