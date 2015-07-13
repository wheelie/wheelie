var expect = require('chai').expect;
var LoggerClass = require('../lib/logging/logger');

describe('A Logger', function () {
  var logger;

  beforeEach(function() {
    logger = new LoggerClass();
  });

  it('should have DEBUG as default write level', function() {
    expect(logger.getWriteLevel()).to.be.equal('DEBUG');
  });
});
