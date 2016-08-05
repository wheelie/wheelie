var exceptions = require('../lib/errors/exceptions');
var utils = require('../lib/utils');


describe('Utilities:', function() {
  describe('mandatory', function() {
    it('should return the field if it\'s not undefined', function() {
      var field;
      var fn = function() { field = utils.mandatory('ok'); };
      expect(fn).not.toThrow();
      expect(field).toEqual('ok');
    });

    it('should throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.mandatory(undefined); };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });

    it('should throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.mandatory(null); };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
    });
  });

  describe('isFunction', function() {
    it('should return the field if it\'s a function', function() {
      var fakeFn = function() {};
      var field;

      var fn = function() { field = utils.isFunction(fakeFn); };
      expect(fn).not.toThrow();
      expect(field).toEqual(fakeFn);
    });

    it('should not throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.isFunction(undefined); };
      expect(fn).not.toThrow();
    });

    it('should not throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.isFunction(null); };
      expect(fn).not.toThrow();
    });

    it('should throw an error if field is not a function', function() {
      var field;
      var fn = function() { field = utils.isFunction('wrong'); };
      expect(fn).toThrow();
    });
  });

  describe('isArray', function() {
    it('should return the field if it\'s an array', function() {
      var field;

      var fn = function() { field = utils.isArray([1, 2]); };
      expect(fn).not.toThrow();
      expect(field).toEqual([1, 2]);
    });

    it('should not throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.isArray(undefined); };
      expect(fn).not.toThrow();
    });

    it('should not throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.isArray(null); };
      expect(fn).not.toThrow();
    });

    it('should throw an error if field is not an array', function() {
      var field;
      var fn = function() { field = utils.isArray('wrong'); };
      // FIXME: check if it's an ``IllegalArgument``
      expect(fn).toThrow();
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
