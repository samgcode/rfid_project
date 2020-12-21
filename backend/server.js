const Koa = require('koa');
const cors = require('cors');
const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello koa';
});

app.listen(3000);