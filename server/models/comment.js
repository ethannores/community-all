const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	post_id:{
		type:Schema.Types.ObjectId,
		ref:'post'
	},
	content:String,
	img:String,
	likes:[
		{
			type:Schema.Types.ObjectId,
			ref:'user'
		}
	],
	user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	pid:{
		type:Schema.Types.ObjectId,
		ref:'comment'
	},
	reply_user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
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
