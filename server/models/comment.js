const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	post_id:Schema.Types.ObjectId,
	content:String,
	img:String,
	user:Schema.Types.ObjectId,
	pid:Schema.Types.ObjectId,
	reply_user:Schema.Types.ObjectId,
	created_at:{
		type:Date,
		default:Date.now
	},
	status:{
		type:Number,
		default:1,//1正常显示 2被禁
	}
})

module.exports = mongoose.model('comment', ModelSchema)
