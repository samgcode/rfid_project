const Koa = require('koa');
const cors = require('cors');
const app = new Koa();

const router = require('./routes');

const port = 3000;

// app.use(ctx => {
//     ctx.body = 'Hello koa';
// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, function() {
    console.log(`API is running at localhost:${port}`);
});