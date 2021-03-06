const { exitOnError } = require('winston');
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf } = format;


const config = require('../config');
// console.log(config.loggerOptions.scannerFile);
const options = config.loggerOptions;

exports.createLogger = function(loggerOptions) {
    // console.log("logger options: ", options);
    let transports = [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ];
    if(loggerOptions.scannerTransport) {
        transports = [
            new winston.transports.File(options.scannerFile),
        ];
    }
    console.log(transports);
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