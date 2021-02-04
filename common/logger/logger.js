process.env["NODE_CONFIG_DIR"] = '../common/logger/config'

const { exitOnError } = require('winston');
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf } = format;
const config = require('config');

const options = config.get('options');

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