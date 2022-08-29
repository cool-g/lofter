const router = require('koa-router')() 
const find_tabs = require('../data/find_tabs')

router.get("/findtabs", (ctx,next) => {
    ctx.body= {
        code:0,
        message:"0",
        data:find_tabs
    }
})

module.exports = router.routes();