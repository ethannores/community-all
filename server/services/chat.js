const Model = require('../models/chat')
const mongoose = require('mongoose')
async function list(data) {
	let page = +data.page || 1
	let limit = +data.limit || 20
  // 分页
	let pageArr = [
		{ $skip: (page - 1) * limit },
		{
			$limit: limit,
		},
	]
  //筛选
  let match=[];
  //关联表
  let lookup=[];
  //返回体表字段筛选
  let project=[];
  //过滤
  let findResult = await Model.aggregate([
    {
      $facet:{
        count: [
					...match,
					{
						$count: 'count',
					},
				],
				data: [
          ...pageArr,
          ...match,
          ...lookup,
          ...project
        ]
      }
    }
  ]);
	return findResult
}
async function save(data) {
  let {sender,receiver}=data;
  //判断当前两个用户是否已经构成了聊天id
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
//获取两用户对应的聊天id
async function getChatIdByUser(data){
  let {sender,receiver,type=1}=data;
  let findResult = await Model.findOne({
    users:{
      $all:[mongoose.Types.ObjectId(sender),mongoose.Types.ObjectId(receiver)]
    },
    type
  })
  if(findResult){
    return findResult._id
  }else{
    let saveResult = await Model.create({
      users:[sender,receiver]
    })
    return saveResult._id
  }
}
//根据用户id获取用户所有对应的chat
async function getChatIDs(user_id){
  let findResuld = await Model.find({
    users:{
      $elemMatch:{
        $eq:mongoose.Types.ObjectId(user_id)
      }
    }
  })
  return findResuld.map(e=>mongoose.Types.ObjectId(e._id))
}

module.exports = {
	list,
	save,
	detail,
	del,
  getChatIdByUser,
  getChatIDs
}
