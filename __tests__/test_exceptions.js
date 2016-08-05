var exceptions = require('../lib/errors/exceptions');

describe('Exceptions list', function() {
  it('should return an Error for a generic Exception object', function() {
    var fn = function() { throw exceptions.Exception() };
    expect(fn).toThrow();
    expect(fn).toThrowError('a generic exception occurs');
  });

  it('should return an Error for IllegalArgument exception', function() {
    var fn = function() { throw exceptions.IllegalArgument() };
    expect(fn).toThrow();
    expect(fn).toThrowError('illegal or wrong argument passed to this method');
  });

  it('should return an Error for NotImplementedError exception', function() {
    var fn = function() { throw exceptions.NotImplementedError() };
    expect(fn).toThrow();
    expect(fn).toThrowError('this method is defined but not implemented');
  });

  it('should return an Error for KeyError exception', function() {
    var fn = function() { throw exceptions.KeyError() };
    expect(fn).toThrow();
    expect(fn).toThrowError('the key was not found in the Object instance');
  });
});
