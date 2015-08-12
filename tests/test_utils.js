var exceptions = require('../lib/errors/exceptions');
var utils = require('../lib/utils');


describe('Utilities:', function() {
  describe('mandatory', function() {
    it('should return the field if it\'s not undefined', function() {
      var field;
      var fn = function() { field = utils.mandatory('ok'); };
      expect(fn).to.not.throw('IllegalArgument');
      expect(field).to.be.equal('ok');
    });

    it('should throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.mandatory(undefined); };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.mandatory(null); };
      expect(fn).to.throw('IllegalArgument');
    });
  });

  describe('isFunction', function() {
    it('should return the field if it\'s a function', function() {
      var fakeFn = function() {};
      var field;

      var fn = function() { field = utils.isFunction(fakeFn); };
      expect(fn).to.not.throw('IllegalArgument');
      expect(field).to.be.equal(fakeFn);
    });

    it('should not throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.isFunction(undefined); };
      expect(fn).to.not.throw('IllegalArgument');
    });

    it('should not throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.isFunction(null); };
      expect(fn).to.not.throw('IllegalArgument');
    });

    it('should throw an error if field is not a function', function() {
      var field;
      var fn = function() { field = utils.isFunction('wrong'); };
      expect(fn).to.throw('IllegalArgument');
    });
  });

  describe('isArray', function() {
    it('should return the field if it\'s an array', function() {
      var field;

      var fn = function() { field = utils.isArray([1, 2]); };
      expect(fn).to.not.throw('IllegalArgument');
      expect(field).to.be.eql([1, 2]);
    });

    it('should not throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.isArray(undefined); };
      expect(fn).to.not.throw('IllegalArgument');
    });

    it('should not throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.isArray(null); };
      expect(fn).to.not.throw('IllegalArgument');
    });

    it('should throw an error if field is not an array', function() {
      var field;
      var fn = function() { field = utils.isArray('wrong'); };
      expect(fn).to.throw('IllegalArgument');
    });
  });

  describe('extend', function() {
    it('should merge two JavaScript objects, updating their values', function() {
      var oldObj = { 'foo': 'foo', 'bar': 'foo' };
      var updateObj = { 'foo': 'bar' };

      var newObj = utils.extend({}, oldObj, updateObj);
      expect(newObj).to.be.deep.eql({'foo': 'bar', 'bar': 'foo'});
    });

    it('should deep merge two JavaScript objects in a new one, updating their values', function() {
      var oldObj = {'settings': {'foo': 'foo'}};
      var updateObj = {'settings': {'foo': 'bar'}};

      var newObj = utils.extend({}, oldObj, updateObj);
      expect(newObj).to.be.deep.eql({'settings': {'foo': 'bar'}});
    });

    it('should deep merge two JavaScript objects replacing the old one, updating their values', function() {
      var oldObj = {'settings': {'foo': 'foo'}};
      var updateObj = {'settings': {'foo': 'bar'}};

      var newObj = utils.extend(oldObj, updateObj);
      expect(newObj).to.be.deep.eql({'settings': {'foo': 'bar'}});
    });
  });
});
