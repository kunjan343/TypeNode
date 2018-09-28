import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';

/**
 * Define winston logger options
 * @returns LoggerOptions   logger object
 */
const loggerOptions: LoggerOptions = {
    exitOnError: false,
    silent: false,
    format: format.combine(
      format.colorize(),
      format.align(),
      format.simple()
    ),
    transports: [
        new transports.Console()
    ]
};

export const logger: Logger = createLogger(loggerOptions);
