const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	title: String,
	pid:Schema.Types.ObjectId,
	description:String,
	img:String
})

module.exports = mongoose.model('category', ModelSchema)
