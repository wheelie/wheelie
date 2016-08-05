var validators = require('../lib/validators');


describe('Validators:', function() {
  describe('isSet', function() {
    it('should return true if it\'s not undefined', function() {
      var check = validators.isSet('ok');
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = validators.isSet(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = validators.isSet(null);
      expect(check).toBe(false);
    });
  });

  describe('isFunction', function() {
    it('should return true if it\'s a function', function() {
      var fakeFn = function() {};
      var check = validators.isFunction(fakeFn);
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = validators.isFunction(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = validators.isFunction(null);
      expect(check).toBe(false);
    });

    it('should return false if field is not a function', function() {
      var check = validators.isFunction('wrong');
      expect(check).toBe(false);
    });
  });

  describe('isArray', function() {
    it('should return true if it\'s an array', function() {
      var check = validators.isArray([1, 2]);
      expect(check).toBe(true);
    });

    it('should return false if field is undefined', function() {
      var check = validators.isArray(undefined);
      expect(check).toBe(false);
    });

    it('should return false if field is null', function() {
      var check = validators.isArray(null);
      expect(check).toBe(false);
    });

    it('should return false if field is not an array', function() {
      var check = validators.isArray('wrong');
      expect(check).toBe(false);
    });
  });
});
