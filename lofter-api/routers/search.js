const router = require('koa-router')();
const swipers = require('../data/swipers')
const {
    fetchSearchHotkey,
    fetchSearchSuggest,
    fetchSearchResult
} = require('../api')

// 热词推荐
router.get('/hotkey',async (ctx,next) => {
    try{
        const data = await fetchSearchHotkey();
        ctx.body = data;
    } catch(e) {
        next(e)
    }
})

// 搜索页轮播图
router.get('/swiper',(ctx,next) => {
    const searchSwipers = swipers.search;
    const resData = {
        code:0,
        message:"0",
        data:searchSwipers
    }
    ctx.body = resData;
})

// 搜索建议 
router.get('/suggest',async (ctx,next) => {
    const keywords = encodeURI(ctx.query.keywords);
    try{
        const data = await fetchSearchSuggest(keywords);
        ctx.body = data;
    } catch(e) {
        next(e)
    }
})

// 搜索结果
router.get('/result',async (ctx,next) => {   
    const key = encodeURI(ctx.query.key);
    try{
        const data = await fetchSearchResult(key);
        const resData = {
            code:0,
            message:"0",
            data:data.data.posts
        }
        ctx.body = resData;
    } catch(e) {
        next(e)
    }
})

module.exports = router.routes();