const { exitOnError } = require('winston');
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf } = format;

const options = {
    file: {
        level: 'debug',
        filename: '../logs/fullStack.log',
        handleExceptions: true,
        json: true,
        colorize: true,
        timestamp: true
    },
    scannerFile: {
        level: 'debug',
        filename: '../logs/scanner.log',
        handleExceptions: true,
        json: true,
        colorize: true,
        timestamp: true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true
    },
};

const logger = winston.createLogger({
    format: combine(
        format.errors({ stack: true }),
        timestamp(),
        printf(({ level, message, timestamp, stack }) => {
            return JSON.stringify({
                timestamp,
                level,
                message,
                stack
            });
        })
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

const scannerLogger = winston.createLogger({
    format: combine(
        format.errors({ stack: true }),
        timestamp(),
        printf(({ level, message, timestamp, stack }) => {
            return JSON.stringify({
                timestamp,
                level,
                message,
                stack
            });
        })
    ),
    transports: [
        new winston.transports.File(options.scannerFile),
    ],
    exitOnError: false
});

exports.logger = logger;
exports.scannerLogger = scannerLogger;