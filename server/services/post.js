const Model = require('../models/post')
const mongoose = require('mongoose')
async function list(data) {
  let page = +data.page || 1
  let limit = +data.limit || 20
  // 分页
  let pageArr = [
    { $skip: (page - 1) * limit },
    {
      $limit: limit,
    },
  ]
  //筛选
  let match = []
  //关联表
  let lookup = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categories',
      },
    },
  ]
  //返回体表字段筛选
  let project = []
  //过滤
  let findResult = await Model.aggregate([
    {
      $facet: {
        count: [
          ...match,
          {
            $count: 'count',
          },
        ],
        data: [...match, ...pageArr, ...lookup, ...project],
      },
    },
  ])
  return findResult
}
async function save(data) {
  let { _id, category, title, content, type, vote_source, author } =
    data
  let returnData = {}
  if (_id) {
    //id存在则修改内容
    let findUpdateResult = await Model.findByIdAndUpdate(
      {
        _id,
      },
      { category, title, content, type, vote_source, author }
    )
    returnData['data'] = findUpdateResult
  } else {
    //新增内容
    let saveResult = await Model.create({
      category,
      title,
      content,
      type,
      vote_source,
      author,
    })
    returnData['data'] = saveResult
  }
  returnData['code'] = 200
  returnData['msg'] = '保存成功'
  return returnData
}
async function detail(data) {
  let { _id } = data
  let result = await Model.findById(mongoose.Types.ObjectId(_id))
  return {
    code: 200,
    data: result,
  }
}
async function del(data) {
  let { id } = data
  let result = await Model.findByIdAndRemove(id)
  return {
    code: 200,
    msg: '删除成功',
    data: result,
  }
}
module.exports = {
  list,
  save,
  detail,
  del,
}
