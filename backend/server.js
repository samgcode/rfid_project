const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');

const logger = require('logger').logger;

const router = require('./routes');

const app = new Koa();

const port = 3000;

app.use(koaLogger({
    transporter: (str, args) => {
        logger.info(str);
    }
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