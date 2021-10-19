const Model = require('../models/message')
const mongoose = require('mongoose')
const ChatService = require('./chat')
const { count } = require('../models/message')
async function list(data) {
  let page = +data.page || 1
  let limit = +data.limit || 20
  let user_id = data.user_id
  let chat_ids = await ChatService.getChatIDs(user_id)
  // 分页
  let pageArr = [
    { $skip: (page - 1) * limit },
    {
      $limit: limit,
    },
  ]
  //筛选
  let match = [
    {
      $match: {
        chat_id: {
          $in: chat_ids,
        },
      },
    },
  ]

  
  //group
  let group = [
    {
      $group: {
        _id: '$chat_id',
        count: { $sum: 1 },
        content: { $last: '$content' },
        img: { $last: '$img' },
        type: { $last: '$type' },
        created_at: { $last: '$created_at' },
        sender: { $last: '$sender' },
        receiver: { $last: '$receiver' },
        status: { $last: '$status' },
      },
    },
  ]
  //关联表
  let lookup = [
    {
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'sender',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'receiver',
        foreignField: '_id',
        as: 'receiver',
      },
    },
  ]
  //返回体表字段筛选
  let project = [
    {
      $project:{
        chat_id:1,
        count:1,
        content:1,
        img:1,
        type:1,
        created_at:1,
        status:1,
        sender_id:'$sender._id',
        sender_avatar:'$sender.avatar',
        sender:'$sender.username',
        receiver_id:'$receiver._id',
        receiver_avatar:'$receiver.avatar',
        receiver:'$receiver.username',
      }
    }
  ]
  let sort = [{ $sort: { created_at: -1 } },{$sort:{status:1}}]
  //过滤
  let findResult = await Model.aggregate([
    {
      $facet: {
        count: [
          ...match,
          ...group,
          {
            $count: 'count',
          },
        ],
        data: [
          ...match,
          ...group,
          ...sort,
          ...pageArr,
          ...lookup,
          { $unwind: '$receiver' },
          { $unwind: '$sender' },
          ...project,
        ],
      },
    },
  ])
  //再查找上述相关对应的未读消息数
  let chat_unread_ids = findResult[0].data.map(e=>mongoose.Types.ObjectId(e._id))
  let unread_match=[{
    $match:{
      chat_id:{$in:chat_unread_ids},
      status:1,
      receiver:mongoose.Types.ObjectId(user_id)
    }
  }]
  let counts = await Model.aggregate([
    ...unread_match,
    {
      $group:{_id:'$chat_id',count:{$sum:1}}
    },
    ...pageArr,
  ])
  //两个数组遍历  将未读数添加上去
  if(counts.length>0){
    for(let i=0;i<counts.length;i++){
      for(let k=0;k<findResult[0].data.length;k++){
        if(String(counts[i]['_id'])==String(findResult[0].data[k]['_id'])){
          findResult[0].data[k]['unread']=counts[i]['count']
        }
      }
    }
  }
  
  return findResult

}
async function save(data) {
  let { _id } = data
  let returnData = {}
  if (_id) {
    //id存在则修改内容
    let findUpdateResult = await Model.findByIdAndUpdate(
      {
        _id,
      },
      {}
    )
    returnData['data'] = findUpdateResult
  } else {
    //新增内容
    let saveResult = await Model.create({})
    returnData['data'] = saveResult
  }
  returnData['code'] = 200
  returnData['msg'] = '保存成功'
  return returnData
}
async function detail(data) {
  let { id } = data
  let result = await Model.findById(id)
  return {
    code: 200,
    data: result,
  }
}
async function del(data) {
  let { id } = data
  let result = await Model.findByIdAndRemove(id)
  return {
    code: 200,
    msg: '删除成功',
    data: result,
  }
}
//发送消息 存库
async function sendMessage(data) {
  console.log(data)
  let chat_id = await ChatService.getChatIdByUser(data)
  let saveResult = await Model.create({
    chat_id,
    sender: data.sender,
    receiver: data.receiver,
    content: data.content,
  })
  return saveResult
}
//将消息变为已读
async function chatRead(data){
  let {chat_id,receiver} = data;
  let result;
  if(chat_id){
    //聊天id存在时消息变为已读
    result = await Model.updateMany({
      chat_id:mongoose.Types.ObjectId(chat_id),
      receiver:mongoose.Types.ObjectId(receiver),
      status:1
    },{
      status:2
    })
  }
  return result
}
//获取用户所有的未读消息
async function getUnreadByUser(user_id) {
  //获取用户在的所有聊天id
  // let chat_ids = await ChatService.getChatIDs(user_id);
  //查找用户的所有未读消息
  let unreadNum = await Model.countDocuments({
    // chat_id:{
    //   $in:chat_ids
    // },
    receiver: mongoose.Types.ObjectId(user_id),
    status: 1,
  })
  console.log(unreadNum)
  return unreadNum
}
//根据chatId 获取相关聊天记录
async function getChatDetail(data){
  let {chat_id}=data;
  let findReault = await Model.find({
    chat_id:mongoose.Types.ObjectId(chat_id)
  }).populate('sender','_id username avatar')
  .populate('receiver','_id username avatar')
  // .projection({
  //   chat_id:1,
  //   content:1,
  //   created_at:1,
  //   status:1,
  //   type:1,
  //   sender_id:'$sender._id',
  //   sender_avatar:'$sender.avatar',
  //   sender:'$sender.username',
  //   receiver_id:'$receiver._id',
  //   receiver_avatar:'$receiver.avatar',
  //   receiver:'$receiver.username',
  // })
  return {
    code:200,
    data:findReault
  }
}

module.exports = {
  list,
  save,
  detail,
  del,
  getUnreadByUser,
  sendMessage,
  getChatDetail,chatRead
}
