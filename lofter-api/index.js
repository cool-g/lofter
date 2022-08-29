const Koa = require("koa");  // http server
const app = new Koa();
const cors = require('koa-cors'); // 支持跨域
const router = require('koa-router')();
const mainRouter = require('./routers/index');
const findRouter = require('./routers/find');
const searchRouter = require('./routers/search')

// 启用跨域中间件
app.use(cors());
// 启用路由中间件
app.use(mainRouter);
router.use('/find',findRouter);
router.use('/search',searchRouter);
app.use(router.routes());

// 监听端口
app.listen(3000);