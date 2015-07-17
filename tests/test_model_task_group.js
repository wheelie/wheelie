var exceptions = require('../lib/exceptions');
var TaskGroup = require('../lib/models/task_group');

describe('TaskGroup model', function() {
  describe('has mandatory fields', function() {
    it('should fail to initialize if the name is missing', function() {
      var fn = function() { new TaskGroup(undefined) };
      expect(fn).to.throw('AttributeError');
    });

    it('should fail to initialize if the tasks list is missing', function() {
      var fn = function() { new TaskGroup('name', undefined) };
      expect(fn).to.throw('AttributeError');
    });

    it('should work with valid arguments', function() {
      var group;

      var fn = function() { group = new TaskGroup('name', ['task']) };
      expect(fn).to.not.throw('AttributeError');
      expect(fn).to.not.throw('IllegalArgument');
      expect(group.name).to.be.equal('name');
      expect(group.tasks).to.be.eql(['task']);
    });
  });
});
