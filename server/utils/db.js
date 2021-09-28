const {mongodbUrl} = require('../config/config')
const mongoose = require('mongoose');

const UserSchema = require('../models/user')
const CategorySchema = require('../models/category')
const PostSchema = require('../models/post')
const CommentSchema = require('../models/comment')


module.exports = ()=>{
  let db = mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
		useUnifiedTopology: true,
  })  
  return db
}