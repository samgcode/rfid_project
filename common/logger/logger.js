const { exitOnError } = require('winston');
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf } = format;


const config = require('../config');
const options = config.loggerOptions;

const logger = winston.createLogger({
    class: '',
    format: combine(
        format.errors({ stack: true }),
        timestamp(),
        printf(({ level, message, timestamp, stack }) => {
            return JSON.stringify({
                class: this.class,
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


// exports.scannerLogger = scannerLogger;
// exports.logger = logger;
exports.createLogger = function(loggerOptions) {
    let transports = [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ];
    console.log(loggerOptions);
    if(loggerOptions.scannerTransport) {
        transports = [
            new winston.transports.File(options.scannerFile),
        ];
    }
    return winston.createLogger({
        class: '',
        format: combine(
            format.errors({ stack: true }),
            timestamp(),
            printf(({ level, message, timestamp, stack }) => {
                return JSON.stringify({
                    class: loggerOptions.className,
                    timestamp,
                    level,
                    message,
                    stack
                });
            })
        ),
        transports,
        exitOnError: false
    });
}