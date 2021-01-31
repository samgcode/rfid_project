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
        format.errors({ stack: true }), // log the full stack
        timestamp(), // get the time stamp part of the full log message
        printf(({ level, message, timestamp, stack }) => { // formating the log outcome to show/store 
          return `${timestamp} ${level}: ${message} - ${stack}`;
        })
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message) {
      logger.info(message);
    },
};

exports.logger = logger;