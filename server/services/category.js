const Model = require('../models/category')
const mongoose = require('mongoose')

//根据扁平数据构建树形结构
function getTreeByData(data) {
  if (data.length == 0) return []
  let tempData = JSON.parse(JSON.stringify(data))
  let tree = []
  let map = {}
  for (let i = 0; i < tempData.length; i++) {
    let id = tempData[i]['_id']
    map[id] = tempData[i]
    tempData[i]['children'] = []
    if (tempData[i].pid && map[tempData[i].pid]) {
      map[tempData[i].pid]['children'].push(tempData[i])
    }
    if (!tempData[i].pid) {
      tree.push(tempData[i])
    }
  }
  return tree
}
//获取列表
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
  let match = [];
  data.keyword&&match.push({
    $match:{
      title:{
        $regex:new RegExp(data.keyword,'g')
      }
    }
  })
  //关联表
  let lookup = [
    {
      $lookup:{
        from:'categories',
        localField:'pid',
        foreignField:'_id',
        as:'parent'
      }
    }
  ]
  //返回体表字段筛选
  let project = [
    {
      $project:{
        _id:1,
        title:1,
        pid:1,
        description:1,
        parent:'$parent.title'
      }
    }
  ]
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
        data: [...match,...pageArr,...lookup, ...project],
      },
    },
  ])
  return findResult
}
//获取树形结构数据
async function tree() {
  let data = await Model.find()
  return getTreeByData(data)
}
async function save(data) {
  let { _id, title, pid, description } = data
  let returnData = {}
  pid = pid ? pid : null
  if (_id) {
    //id存在则修改内容
    let findUpdateResult = await Model.findByIdAndUpdate(
      {
        _id,
      },
      {
        title,
        pid,
        description,
      }
    )
    returnData['data'] = findUpdateResult
  } else {
    //新增内容
    let saveResult = await Model.create({
      title,
      pid,
      description,
    })
    returnData['data'] = saveResult
  }
  returnData['code'] = 200
  returnData['msg'] = '保存成功'
  return returnData
}
async function detail(data) {
  let { id } = data
  let result = await Model.findById(id)
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
  tree,
}
