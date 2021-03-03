const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const stripAnsi = require('strip-ansi');

const logger = require('logger').createLogger({className: __filename});

const router = require('./routes');

const app = new Koa();

const port = 3000;

process.on('unhandledRejection', function(err) {
    logger.error(err);
});

app.use(koaLogger((str) => {
    logger.info(stripAnsi(str));
}));

app.on('error', (err) => {
    logger.error(err);
})

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, function() {
    logger.info(`API is running at localhost:${port}`);
});