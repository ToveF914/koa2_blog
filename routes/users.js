const router = require('koa-router')()
const users = require('../lib/models')
const moment = require('moment')

router.prefix('/users') //top router level

router.post('/', async function (ctx, next) {
  let params = ctx.request.body;
  if(params.pageNo === undefined || params.pageNo === ''){
    params.pageNo = 1
  }
  if(params.pageSize === undefined || params.pageSize === ''){
    params.pageSize = 10
  }
  let keyword = new RegExp(ctx.request.body.keyword, 'i')
  ctx.body = {
    code: 200,
    data: await users.find(
      {
        $or: [
          { name: keyword },
          { phone: keyword }
        ]
      },
    ).sort({ "_id": -1 }).limit(params.pageSize).skip((params.pageNo - 1) * params.pageSize),
    total: await users.find({
      $or: [
        { name: keyword },
        { phone: keyword }
      ]
    }).count()
  }
})

router.post('/create', async function (ctx, next) {
  let params = ctx.request.body;
  params.create_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  params.update_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  await users.create(ctx.request.body).then(res => {
    ctx.body = {
      code: 200,
      data: 'success'
    }
  })
})

router.post('/update', async function (ctx, next) {
  let params = ctx.request.body;
  params.update_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  await users.findByIdAndUpdate(params.id,{$set:params}).then(res => {
    ctx.body = {
      code: 200,
      data: 'success'
    }
  })
})

router.post('/remove', async function (ctx, next) {
  let params = ctx.request.body;
  await users.findByIdAndRemove(params._id).then(res => {
    console.log(res)
    ctx.body = {
      code: 200,
      data: 'success'
    }
  })
})

module.exports = router
