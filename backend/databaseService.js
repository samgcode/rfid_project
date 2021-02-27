const mongoose = require('mongoose');

const logger = require('logger').createLogger({className: __filename});

exports.intializeDatabase = function(dbURL, eventService) {
    const mongoDB = process.env.MONGODB_URI || dbURL;
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    connectWithAutoRetry(mongoDB, db, eventService);
}

function connectWithAutoRetry(uri, connection, eventService) {
    mongoose.connect(uri, { useNewUrlParser: true });
    connection.on('error', (err) => {
        logger.error(err);
        setTimeout(connectWithAutoRetry, 10000, uri, connection, eventService);
    });
    connection.on('connected', function() {
        logger.info("connection established successfully");
        eventService.startApp();
    });
}