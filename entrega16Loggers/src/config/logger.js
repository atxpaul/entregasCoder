import log4js from 'log4js';

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'logs/errores.log' },
    archivoWarn: { type: 'file', filename: 'logs/warn.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
    loggerArchivoWarn: {
      type: 'logLevelFilter',
      appender: 'archivoWarn',
      level: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarn'],
      level: 'all',
    },
  },
});

let logger = log4js.getLogger();

export default logger;
