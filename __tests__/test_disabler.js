var Wheelie = require('../lib/cli/wheelie');

var Task = require('../lib/models/task');
var disablerGenerator = require('../lib/helpers/disabler');


describe('Task disabler', function() {
  var wheelie = null;

  beforeEach(function() {
    // initializes Wheelie
    wheelie = new Wheelie();
  });

  describe('generator', function() {
    it('should return an empty Task without the run() callback', function() {
      var disabler = disablerGenerator('task_name');
      expect(disabler.name).toBe('task_name');
      expect(disabler.dependencies).toEqual([]);
      expect(disabler.run()).toBeUndefined();
    });
  });

  describe('registry interaction', function() {
    it('should disable without removing a registered task', function() {
      // the task browser-sync does something
      var run = jest.fn().mockReturnValue(jest.fn());
      var task = new Task('browser-sync', ['another_task'], run);

      // add the 'browser-sync' task
      wheelie.add(task);
      // disable it through the public API disable()
      wheelie.disable('browser-sync');
      // the registry must contain the 'browser-sync' task but it
      // must be disabled
      expect(wheelie._registry.size).toBe(1);
      var disabledTask = wheelie._registry.get('browser-sync');
      expect(disabledTask.name).toBe('browser-sync');
      expect(disabledTask.dependencies).toEqual([]);
      expect(disabledTask.run()).toBeUndefined();
    });
  });
});
