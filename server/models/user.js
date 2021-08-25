const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const ModelSchema = new Schema({
  username: String,
  password: String,
  nickname: String,
  avatar: {
    type: String,
    default:
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  },
  email: String,
  role: Schema.Types.ObjectId,
  permissions: [Schema.Types.ObjectId],
})

ModelSchema.statics.comparePwd = async function (newPwd, oldPwd) {
  return await bcrypt.compare(newPwd, oldPwd)
}

ModelSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 8)
  next()
})

module.exports = mongoose.model('user', ModelSchema)
