var LoggerClass = require('../lib/logging/logger');

describe('A Logger', function () {
  var logger;

  beforeEach(function() {
    logger = new LoggerClass();
  });

  it('should have DEBUG as default write level', function() {
    expect(logger.getWriteLevel()).to.be.equal('DEBUG');
  });

  it('should change the write level', function() {
    logger.setWriteLevel('DEBUG');
    expect(logger.getWriteLevel()).to.be.equal('DEBUG');
    logger.setWriteLevel('INFO');
    expect(logger.getWriteLevel()).to.be.equal('INFO');
    logger.setWriteLevel('WARNING');
    expect(logger.getWriteLevel()).to.be.equal('WARNING');
    logger.setWriteLevel('ERROR');
    expect(logger.getWriteLevel()).to.be.equal('ERROR');
    logger.setWriteLevel('DISABLED');
    expect(logger.getWriteLevel()).to.be.equal('DISABLED');
  });

  it('should raise an exception if write level doesn\'t exist', function() {
    var fn = function() { logger.setWriteLevel('MAGIC_LEVEL'); };
    expect(fn).to.throw(Error);
    expect(fn).to.throw('Selected write level \'MAGIC_LEVEL\' doesn\'t exist');
  });

  describe('with a write level order', function() {
    it('should enable write levels >= DEBUG', function() {
      logger.setWriteLevel('DEBUG');
      expect(logger.writeIsEnabled('DEBUG')).to.be.true;
      expect(logger.writeIsEnabled('INFO')).to.be.true;
      expect(logger.writeIsEnabled('WARNING')).to.be.true;
      expect(logger.writeIsEnabled('ERROR')).to.be.true;
    });

    it('should enable write levels >= INFO', function() {
      logger.setWriteLevel('INFO');
      expect(logger.writeIsEnabled('DEBUG')).to.be.false;
      expect(logger.writeIsEnabled('INFO')).to.be.true;
      expect(logger.writeIsEnabled('WARNING')).to.be.true;
      expect(logger.writeIsEnabled('ERROR')).to.be.true;
    });

    it('should enable write levels >= WARNING', function() {
      logger.setWriteLevel('WARNING');
      expect(logger.writeIsEnabled('DEBUG')).to.be.false;
      expect(logger.writeIsEnabled('INFO')).to.be.false;
      expect(logger.writeIsEnabled('WARNING')).to.be.true;
      expect(logger.writeIsEnabled('ERROR')).to.be.true;
    });

    it('should enable write levels >= ERROR', function() {
      logger.setWriteLevel('ERROR');
      expect(logger.writeIsEnabled('DEBUG')).to.be.false;
      expect(logger.writeIsEnabled('INFO')).to.be.false;
      expect(logger.writeIsEnabled('WARNING')).to.be.false;
      expect(logger.writeIsEnabled('ERROR')).to.be.true;
    });

    it('should disable the logging if DISABLED write level is selected', function() {
      logger.setWriteLevel('DISABLED');
      expect(logger.writeIsEnabled('DEBUG')).to.be.false;
      expect(logger.writeIsEnabled('INFO')).to.be.false;
      expect(logger.writeIsEnabled('WARNING')).to.be.false;
      expect(logger.writeIsEnabled('ERROR')).to.be.false;
    });
  });
});
