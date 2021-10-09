let tempUserId=''
module.exports = io => {
  io.on('connection', client => {
    console.log('链接成功：',client.id)
    client.on('login',msg=>{
      tempUserId=msg.user_id
      console.log('登陆成功:',client.id,msg.user_id)
    })
    client.on('disconnect',()=>{
      console.log(client.id,tempUserId)
    })
  })
}