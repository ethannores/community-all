const Model = require('../models/comment')
const mongoose = require('mongoose')

//评论列表
async function list(data) {
	let page = +data.page || 1
	let limit = +data.limit || 20
	let post_id = mongoose.Types.ObjectId(data.post_id);
	let where={post_id};
	let type  = data.type;
	let sort={};
	if(type=='new'){
		sort={created_at:-1}
	}else if(type=='like'){
		sort={likes:-1}
	}else if(type=='reply'){

	}
	where['pid']=null
	where['status']=1
	let findResult=await Model.find(where).sort(sort).skip((page-1)*limit).limit(limit).populate([{
		path:'user',
		select:{
			username:1,
			avatar:1
		}
	},{
		path:'childrens',
		populate:[{
			path:'user',
			select:{
				username:1,
				avatar:1
			}
		},{
			path:'reply_user',
			select:{
				username:1,
				avatar:1
			}
		}]
	}]);
	let count = await Model.countDocuments(where)
	return {
		data:findResult,
		count
	}
}
async function save(data) {
  let {_id,content,user,post_id,reply_to}=data;
  //新增内容
  let returnData={}
	let createData={
		content,user,post_id,reply_to
	}
	if(reply_to){
		//说明是回复别人，则获取对方相关信息
		let data = await detail({id:reply_to})
		createData['pid']=data.data.pid||reply_to;
		createData['reply_user']=data.data.user;
	}
  let saveResult = await Model.create(createData)
  returnData['data']=saveResult
  returnData['code']=200
  returnData['msg']='操作成功'
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
//评论点赞
async function like(data){
	let {_id,user}=data;
	let isLike = await getListStatus(data);
	let result;
	//当前未点赞，需要点赞
	let updateQuery={
		$push:{
			likes:user
		}
	}
	if(isLike){
		updateQuery={
			$pull:{
				likes:user
			}
		}
	}
	//当前已点赞，需要取消点赞
	result=await Model.updateOne({_id:mongoose.Types.ObjectId(_id)},updateQuery)
	return {
		code:200,
		data:!isLike,
		msg:!isLike?'点赞成功':'取消点赞'
	}
}
//获取评论点赞状态
async function getListStatus(data){
	let {_id,user}=data;
	let findResult = await Model.findOne({
		_id:mongoose.Types.ObjectId(_id),
		likes:{
			$elemMatch:{
				$eq:mongoose.Types.ObjectId(user)
			}
		}
	})
	return findResult!=null
}

module.exports = {
	list,
	save,
	detail,
	del,like
}
