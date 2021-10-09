let tempUserId=''
const $r = require('../utils/redis')
module.exports = io => {
  io.on('connection', client => {
    // console.log('链接成功：',client.id)
    //用户登录，去获取用户的未读消息数
    client.on('login',async msg=>{
      tempUserId=msg.user_id;
      $r.setData('io-client',{[`${msg.user_id}`]:client.id})
      console.log(await $r.getDataOne('io-client',tempUserId))
      // console.log('登陆成功:',client.id,msg.user_id)
    })
    //用户退出系统，去redis里面删除用户对应的房间id
    client.on('disconnect',()=>{
      // console.log(client.id,tempUserId)
      $r.delOne('io-client',tempUserId)
      // $r.quit()
    })
  })
}