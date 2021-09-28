const mongoose = require('mongoose')
const { Schema } = mongoose

// const UserSchema = require('./user')
// const CategorySchema = require('./category')

const ModelSchema = new Schema({
  title: String,
  author: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  category: [{
    type:Schema.Types.ObjectId,
    ref:'category'
  }],
  content: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
  type: {
    type: Number,
    default: 1, //1 普通帖子  2 长帖子  3 投票贴  4 学习贴
  },
  likes: [Schema.Types.ObjectId],
  collections: [Schema.Types.ObjectId],
  views: Number,
  face_img: String,
  imgs: [String],
})

module.exports = mongoose.model('post', ModelSchema)
