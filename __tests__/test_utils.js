var exceptions = require('../lib/errors/exceptions');
var utils = require('../lib/utils');


describe('Utilities:', function() {
  describe('isSet', function() {
    it('should return true if it\'s not undefined', function() {
      var check = utils.isSet('ok');
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = utils.isSet(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = utils.isSet(null);
      expect(check).toBe(false);
    });
  });

  describe('isFunction', function() {
    it('should return true if it\'s a function', function() {
      var fakeFn = function() {};
      var check = utils.isFunction(fakeFn);
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = utils.isFunction(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = utils.isFunction(null);
      expect(check).toBe(false);
    });

    it('should return false if field is not a function', function() {
      var check = utils.isFunction('wrong');
      expect(check).toBe(false);
    });
  });

  describe('isArray', function() {
    it('should return true if it\'s an array', function() {
      var check = utils.isArray([1, 2]);
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = utils.isArray(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = utils.isArray(null);
      expect(check).toBe(false);
    });

    it('should return false if field is not an array', function() {
      var check = utils.isArray('wrong');
      expect(check).toBe(false);
    });
  });

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
