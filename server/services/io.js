const $r = require('../utils/redis')
const {getUnreadByUser,sendMessage}=require('./message')
module.exports = io => {
  io.on('connection', client => {
    // console.log('链接成功：',client.id)
    //监听用户登录，去获取用户的未读消息数
    client.on('login',async msg=>{
      $r.setData('io-client',msg.user_id,client.id)
      client.$user_id=msg.user_id
      let unread = await getUnreadByUser(msg.user_id);
      client.emit('login',{
        unread
      })
      console.log('登陆成功:',client.id,msg.user_id)
    })
    //监听用户发送消息
    client.on('sendMsg',async data=>{
      let msgData={
        sender:client.$user_id||'6152cb63218cdd91bfd5e571',
        receiver:data.receiver,
        content:data.content,
      }
      let sendResult = await sendMessage(msgData);
      client.emit('message',sendResult);
      //判断接收消息方是否在线，若不在线则不管，在线则将消息内容发送给接收方
      let receiverClientId = await $r.getDataOne('io-client',data.receiver);
      if(receiverClientId){
        io.to(receiverClientId).emit('message', sendResult)
      }
    })
    //用户退出系统，去redis里面删除用户对应的房间id
    client.on('disconnect',()=>{
      if(client.$user_id){
        $r.delOne('io-client',client.$user_id)
      }
      
      // $r.quit()
    })
  })
}