const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	content: String,
	type:{
		type:Number,
		default:1,//1文字消息 2图片消息
	},
	sender:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	receiver:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	created_at:{
		type:Date,
		default:Date.now
	},
	status:{
		type:Number,
		default:1 //1未读  2已读
	},
	chat_id:Schema.Types.ObjectId
})

module.exports = mongoose.model('message', ModelSchema)
