const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');

const router = require('./routes');
const logger = require('./config/winston');

const app = new Koa();

const port = 3000;

app.use(koaLogger({
    transporter: (str, args) => {
        logger.debug(str);
    }
}));

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, function() {
    console.log(`API is running at localhost:${port}`);
});