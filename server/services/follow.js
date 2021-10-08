const Model = require('../models/follow')
const mongoose = require('mongoose')

//获取关注列表
async function list(data) {
	let { user, type, limit = 20, page = 1 } = data
	let where = {}
	let populateObj = {
		path: 'user',
		select: {
			username: 1,
			avatar: 1,
		},
	}
	if (type == 'fans') {
		where['follow'] = mongoose.Types.ObjectId(user)
	} else {
		where['user'] = mongoose.Types.ObjectId(user)
		populateObj['path'] = 'follow'
	}
	let findResult = await Model.find(where).skip((page-1)*limit).limit(limit).populate(populateObj)
  let count = await Model.countDocuments(where)
	return {
    data:findResult,
		count
  }
}
//点击关注
async function save(data) {
	let { user, follow } = data
  let returnData={}
	//新增内容
	let saveResult = await Model.create({
		user,
		follow,
	})
	returnData['data'] = saveResult
	returnData['code'] = 200
	returnData['msg'] = '操作成功'
	return returnData
}
//获取关注状态
async function getFollowStatus(data) {
	let { user, follow } = data
	let findResult = await Model.findOne({
		user: mongoose.Types.ObjectId(user),
		follow: mongoose.Types.ObjectId(follow),
	})
	return findResult != null
}
//取消关注
async function del(data) {
	let { user, follow } = data
	let result = await Model.findOneAndDelete({
		user: mongoose.Types.ObjectId(user),
		follow: mongoose.Types.ObjectId(follow),
	})
	return {
		code: 200,
		msg: '取消关注',
		data: result,
	}
}

module.exports = {
	list,
	save,
	del,
	getFollowStatus,
}
