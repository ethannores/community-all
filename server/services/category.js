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
    tempData[i]['value'] = id
    tempData[i]['label'] = tempData[i]['title']
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

// let arr = [
//   { id: 1, name: '1', pid: 0 },
//   { id: 2, name: '2', pid: 0 },
//   { id: 3, name: '3', pid: 1 },
//   { id: 4, name: '4', pid: 1 },
//   { id: 5, name: '5', pid: 3 },
// ]

// return [
//   {
//     id: 1,
//     name: '1',
//     pid: 0,
//     children: [
//       {
//         id: 3,
//         name: '3',
//         pid: 1,
//         children: [{ id: 5, name: '5', pid: 3 }],
//       },
//       { id: 4, name: '4', pid: 1 },
//     ],
//   },
//   { id: 2, name: '2', pid: 0 },
// ]

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
  let match = []
  //关联表
  let lookup = []
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
        data: [...pageArr, ...match, ...lookup, ...project],
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
