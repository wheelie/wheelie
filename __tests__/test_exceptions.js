var exceptions = require('../lib/errors/exceptions');

describe('Exceptions list', function() {
  it('should return an Error for IllegalArgument exception', function() {
    var fn = function() { throw new exceptions.IllegalArgument() };
    expect(fn).toThrowError('Illegal or wrong argument passed to this method');
  });

  it('should return an Error for NotImplementedError exception', function() {
    var fn = function() { throw new exceptions.NotImplementedError() };
    expect(fn).toThrowError('This method is defined but not implemented');
  });

  it('should return an Error for KeyError exception', function() {
    var fn = function() { throw new exceptions.KeyError() };
    expect(fn).toThrowError('The key was not found in the Object instance');
  });
});
