const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	post_id: Schema.Types.ObjectId,
	description:String,
	provider:Schema.Types.ObjectId, //若未提供则默认为发帖人的id  否则为提供者的id
	imgs:String,
	video:String,
	status:{
		type:Number,
		default:1,// 该条投票状态 正常状态/审核通过（可以投票状态）  2  未审核  3审核未通过  4 投票异常暂停投票
	},
	vote_users:[{
		vote_at:{
			type: Date,
    	default: new Date(),
		},
		user:Schema.Types.ObjectId
	}],
})

module.exports = mongoose.model('vote', ModelSchema)
