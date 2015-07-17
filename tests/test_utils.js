var exceptions = require('../lib/exceptions');
var utils = require('../lib/utils');


describe('Utilities:', function() {
  describe('getMandatoryField', function() {
    it('should return the field if it\'s not undefined', function() {
      var field;
      var fn = function() { field = utils.getMandatoryField('ok'); };
      expect(fn).to.not.throw('AttributeError');
      expect(field).to.be.equal('ok');
    });

    it('should throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.getMandatoryField(undefined); };
      expect(fn).to.throw('AttributeError');
    });

    it('should throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.getMandatoryField(null); };
      expect(fn).to.throw('AttributeError');
    });
  });

  describe('getMandatoryFunction', function() {
    it('should return the field if it\'s a function', function() {
      var fakeFn = function() {};
      var field;

      var fn = function() { field = utils.getMandatoryFunction(fakeFn); };
      expect(fn).to.not.throw('IllegalArgument');
      expect(field).to.be.equal(fakeFn);
    });

    it('should throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.getMandatoryFunction(undefined); };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.getMandatoryFunction(null); };
      expect(fn).to.throw('IllegalArgument');
    });

    it('should throw an error if field is not a function', function() {
      var field;
      var fn = function() { field = utils.getMandatoryFunction('wrong'); };
      expect(fn).to.throw('IllegalArgument');
    });
  });

  describe('getMandatoryArray', function() {
    it('should return the field if it\'s an array', function() {
      var field;

      var fn = function() { field = utils.getMandatoryArray([1, 2]); };
      expect(fn).to.not.throw('AttributeError');
      expect(field).to.be.eql([1, 2]);
    });

    it('should throw an error if field is undefined', function() {
      var field;
      var fn = function() { field = utils.getMandatoryArray(undefined); };
      expect(fn).to.throw('AttributeError');
    });

    it('should throw an error if field is null', function() {
      var field;
      var fn = function() { field = utils.getMandatoryArray(null); };
      expect(fn).to.throw('AttributeError');
    });

    it('should throw an error if field is not an array', function() {
      var field;
      var fn = function() { field = utils.getMandatoryArray('wrong'); };
      expect(fn).to.throw('AttributeError');
    });
  });
});
