import * as winston from 'winston';

const loggerOptions: winston.LoggerOptions = {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    exitOnError: false,
    transports: [
        new winston.transports.Console()
        // new winston.transports.File({filename: 'server.log'})
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exceptions.log'})
    ]
};

export const logger: any = winston.createLogger(loggerOptions);
