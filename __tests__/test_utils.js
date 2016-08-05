var utils = require('../lib/utils');


describe('Utilities:', function() {
  describe('extend', function() {
    it('should merge two JavaScript objects, updating their values', function() {
      var oldObj = { 'foo': 'foo', 'bar': 'foo' };
      var updateObj = { 'foo': 'bar' };

      var newObj = utils.extend({}, oldObj, updateObj);
      expect(newObj).toEqual({'foo': 'bar', 'bar': 'foo'});
    });

    it('should deep merge two JavaScript objects in a new one, updating their values', function() {
      var oldObj = {'settings': {'foo': 'foo'}};
      var updateObj = {'settings': {'foo': 'bar'}};

      var newObj = utils.extend({}, oldObj, updateObj);
      expect(newObj).toEqual({'settings': {'foo': 'bar'}});
    });

    it('should deep merge two JavaScript objects in a new one, updating even arrays', function() {
      var oldObj = {'settings': {'foo': []}};
      var updateObj = {'settings': {'foo': ['with_bar']}};

      var newObj = utils.extend({}, oldObj, updateObj);
      expect(newObj).toEqual({'settings': {'foo': ['with_bar']}});
    });

    it('should deep merge two JavaScript objects replacing the old one, updating their values', function() {
      var oldObj = {'settings': {'foo': 'foo'}};
      var updateObj = {'settings': {'foo': 'bar'}};

      var newObj = utils.extend(oldObj, updateObj);
      expect(newObj).toEqual({'settings': {'foo': 'bar'}});
    });
  });
});
