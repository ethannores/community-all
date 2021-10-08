const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	user:{
		type:mongoose.Types.ObjectId,
		ref:'user'
	},
	follow:{
		type:mongoose.Types.ObjectId,
		ref:'user'
	}
})

module.exports = mongoose.model('follow', ModelSchema)
