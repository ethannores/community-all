const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
	username: String,
})

module.exports = mongoose.model('club', ModelSchema)
