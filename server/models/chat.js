const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	type:{
		type:Number,
		default:1,//聊天类型  1 普通私聊 2系统通知 3群聊
	},
	users:[Schema.Types.ObjectId]
	
})

module.exports = mongoose.model('chat', ModelSchema)
