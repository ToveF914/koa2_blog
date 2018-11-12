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
  if(ctx.request.body !== {}){
    let nuser = new users(ctx.request.body)
    await nuser.save((err,res) => {
      if(!err){
        ctx.body = {
          status: true,
          data: 'success'
        }
      }
    })
  }
})

router.post('/update', async function (ctx, next) {
  let params = ctx.request.body;
  params.update_time = moment(new Date()).format('YYYY/MM/DD hh:mm:ss');
  users.findByIdAndUpdate(params.id,{$set:params}).then(res => console.log(res))
})

router.post('/remove', async function (ctx, next) {
  let params = ctx.request.body;
  users.findByIdAndRemove(params._id).then(res => console.log(res))
})

module.exports = router
