const router = require('koa-router')();
const {
    fetchFindRecommend
} = require('../api')
const swipers = require('../data/swipers')

router.get('/recommend',async (ctx,next) => {
    try{
        const data = await fetchFindRecommend();
        ctx.body = data;
    } catch(e) {
        next(e)
    }
})

router.get('/swiper',(ctx,next) => {
    const findSwipers = swipers.find;
    const resData = {
        code:0,
        message:"0",
        data:findSwipers
    }
    ctx.body = resData;
})

module.exports = router.routes();