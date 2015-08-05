var exceptions = require('../lib/exceptions');

describe('Exceptions list', function() {
  it('should return an Error for a generic Exception object', function() {
    var fn = function() { throw exceptions.Exception() };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('Exception');
  });

  it('should return an Error for IllegalArgument exception', function() {
    var fn = function() { throw exceptions.IllegalArgument() };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('IllegalArgument');
  });

  it('should return an Error for NotImplementedError exception', function() {
    var fn = function() { throw exceptions.NotImplementedError() };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('NotImplementedError');
  });

  it('should return an Error for KeyError exception', function() {
    var fn = function() { throw exceptions.KeyError() };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('KeyError');
  });
});
