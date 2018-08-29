/**
 * 注册
 */
const router = require('koa-router')
const userModel = require('../lib/mysql.js')
const md5 = require('md5')
const checkoutNotLogin = require('../middlewares/check.js').checkoutNotLogin
const checkLigin = require('../middlewares/check.js').checkLigin
const moment = require('moment')
const fs = require('fs')

// 注册页面
router.get('/signup', async(ctx, next) => {
  await checkoutNotLogin(ctx)
  await ctx.render('signup', {
    session: ctx.session
  })
})

module.exports = router
