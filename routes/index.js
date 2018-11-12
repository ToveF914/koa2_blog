const router = require('koa-router')()
const users = require('../lib/models')

router.get('/login', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/register', async (ctx, next) => {
  params.create_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  params.update_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  await users.create(ctx.request.body).then(res => {
    ctx.body = {
      code: 200,
      data: 'success'
    }
  })
})

router.get('/repasswd', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
