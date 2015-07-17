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
  });
});
