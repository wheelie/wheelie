var exceptions = require('../lib/exceptions');

describe('Exceptions list', function() {
  it('should return an Error for AttributeError exception', function() {
    var fn = function() { throw exceptions.AttributeError() };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('AttributeError');
  });
});
