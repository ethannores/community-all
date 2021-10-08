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
	},
	reply_user:{
		type:Schema.Types.ObjectId,
		ref:'user'
	},
	reply_to:{
		type:Schema.Types.ObjectId,
		ref:'comment'
	},
	created_at:{
		type:Date,
		default:Date.now
	},
	status:{
		type:Number,
		default:1,//1正常显示 2被禁
	}
},{
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `toObject()` output includes virtuals
})

ModelSchema.virtual('childrens',{
	ref: 'comment',
  localField: '_id',
  foreignField: 'pid'
})


module.exports = mongoose.model('comment', ModelSchema)
