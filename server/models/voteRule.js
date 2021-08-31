const mongoose = require('mongoose')
const { Schema } = mongoose

const ModelSchema = new Schema({
  post_id: Schema.Types.ObjectId,
  source: {
    type: Number,
    default: 1, //投票类型，1 系统上传投票  2 用户上传内容
  },
  limit: {
    type: Number,
    default: 1, //限定用户能投票的数量   1-9
  },
  start_time:Date, //投票开始时间
  end_time:Date, //投票截止时间
})

module.exports = mongoose.model('vote-rule', ModelSchema)
