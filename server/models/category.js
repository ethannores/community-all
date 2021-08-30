const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	title: String,
	pid:{
		type:Schema.Types.ObjectId,
		default:null
	},
	description:String,
	img:String
})

module.exports = mongoose.model('category', ModelSchema)
