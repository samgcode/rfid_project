const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const router = require('./routes');

const port = 3000;

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, function() {
    console.log(`API is running at localhost:${port}`);
});