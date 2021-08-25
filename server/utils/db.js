const {mongodbUrl} = require('../config/config')
const mongoose = require('mongoose');

module.exports = ()=>{
  let db = mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
		useUnifiedTopology: true,
  })
  return db
}