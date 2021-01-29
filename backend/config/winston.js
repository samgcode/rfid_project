const { exitOnError } = require('winston');
const winston = require('winston');

const options = {
    file: {
        level: 'debug',
        filename: '../logs/backend.log',
        handleExceptions: true,
        json: true,
        colorize: true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
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

module.exports = logger;