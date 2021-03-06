var logger = require('../lib/logging/logger');

describe('A Logger', function () {
  it('should have INFO as default write level', function() {
    expect(logger.getWriteLevel()).toBe('INFO');
  });

  it('should change the write level', function() {
    logger.setWriteLevel('DEBUG');
    expect(logger.getWriteLevel()).toBe('DEBUG');
    logger.setWriteLevel('INFO');
    expect(logger.getWriteLevel()).toBe('INFO');
    logger.setWriteLevel('WARNING');
    expect(logger.getWriteLevel()).toBe('WARNING');
    logger.setWriteLevel('ERROR');
    expect(logger.getWriteLevel()).toBe('ERROR');
    logger.setWriteLevel('DISABLED');
    expect(logger.getWriteLevel()).toBe('DISABLED');
  });

  it('should raise an exception if write level doesn\'t exist', function() {
    var fn = function() { logger.setWriteLevel('MAGIC_LEVEL'); };
    expect(fn).toThrow();
    expect(fn).toThrowError('Write level "MAGIC_LEVEL" doesn\'t exist');
  });

  describe('with a write level order', function() {
    it('should enable write levels >= DEBUG', function() {
      logger.setWriteLevel('DEBUG');
      expect(logger.writeIsEnabled('DEBUG')).toBe(true);
      expect(logger.writeIsEnabled('INFO')).toBe(true);
      expect(logger.writeIsEnabled('WARNING')).toBe(true);
      expect(logger.writeIsEnabled('ERROR')).toBe(true);
    });

    it('should enable write levels >= INFO', function() {
      logger.setWriteLevel('INFO');
      expect(logger.writeIsEnabled('DEBUG')).toBe(false);
      expect(logger.writeIsEnabled('INFO')).toBe(true);
      expect(logger.writeIsEnabled('WARNING')).toBe(true);
      expect(logger.writeIsEnabled('ERROR')).toBe(true);
    });

    it('should enable write levels >= WARNING', function() {
      logger.setWriteLevel('WARNING');
      expect(logger.writeIsEnabled('DEBUG')).toBe(false);
      expect(logger.writeIsEnabled('INFO')).toBe(false);
      expect(logger.writeIsEnabled('WARNING')).toBe(true);
      expect(logger.writeIsEnabled('ERROR')).toBe(true);
    });

    it('should enable write levels >= ERROR', function() {
      logger.setWriteLevel('ERROR');
      expect(logger.writeIsEnabled('DEBUG')).toBe(false);
      expect(logger.writeIsEnabled('INFO')).toBe(false);
      expect(logger.writeIsEnabled('WARNING')).toBe(false);
      expect(logger.writeIsEnabled('ERROR')).toBe(true);
    });

    it('should disable the logging if DISABLED write level is selected', function() {
      logger.setWriteLevel('DISABLED');
      expect(logger.writeIsEnabled('DEBUG')).toBe(false);
      expect(logger.writeIsEnabled('INFO')).toBe(false);
      expect(logger.writeIsEnabled('WARNING')).toBe(false);
      expect(logger.writeIsEnabled('ERROR')).toBe(false);
    });
  });

  describe('writing functions', function() {
    var _console = null;

    beforeEach(function() {
      // mock the console
      _console = console;
      console = jest.fn();
      console.log = jest.fn();
      console.info = jest.fn();
      console.warn = jest.fn();
      console.error = jest.fn();
    });

    afterEach(function() {
      // unmock the console
      console = _console;
    });

    it('should write a DEBUG message', function() {
      logger.setWriteLevel('DEBUG');
      logger.debug('debug');
      expect(console.log).toBeCalled();
    });

    it('should write an INFO message', function() {
      logger.setWriteLevel('INFO');
      logger.info('info');
      expect(console.info).toBeCalled();
    });

    it('should write a WARNING message', function() {
      logger.setWriteLevel('WARNING');
      logger.warning('warning');
      expect(console.warn).toBeCalled();
    });

    it('should write an ERROR message', function() {
      logger.setWriteLevel('ERROR');
      logger.error('error');
      expect(console.error).toBeCalled();
    });
  });
});
