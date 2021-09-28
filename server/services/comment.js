const Model = require('../models/comment')
const mongoose = require('mongoose')

async function list(data) {
	let page = +data.page || 1
	let limit = +data.limit || 20
	let post_id = mongoose.Types.ObjectId(data.post_id);
	let where={post_id};
	let findResult=await Model.find(where).skip((page-1)*limit).limit(limit).populate({
		path:'user',
		select:{
			username:1,
			avatar:1
		}
	})
	let count = await Model.countDocuments(where)
	return {
		data:findResult,
		count
	}
}
async function save(data) {
  let {_id,content,user,post_id}=data;
  //新增内容
  let returnData={}
  let saveResult = await Model.create({
    content,user,post_id
  })
  returnData['data']=saveResult
  returnData['code']=200
  returnData['msg']='保存成功'
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

module.exports = {
	list,
	save,
	detail,
	del,
}
