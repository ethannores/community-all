const Model = require('../models/user')
const { jwtSecret } = require('../config/config')
const jwt = require('jsonwebtoken')
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
async function save(data) {
  console.log(data.username, data.password)
  const { username, password } = data
  //新增内容
  let saveResult = await Model.create({
    username,
    password,
  })
  let returnData = {}
  returnData['data'] = saveResult
  returnData['code'] = 200
  returnData['msg'] = '保存成功'
  return returnData
}
//用户登录
async function login(data) {
  const { username, password } = data
  console.log(data)
  let returnData = {}
  if (!password) {
    return {
      code: 100,
      msg: '请输入密码',
    }
  }
  let findResult = await Model.findOne({
    username,
  })
  if (!findResult) {
    return {
      code: 100,
      msg: '用户不存在',
    }
  }
  let confirm = await Model.comparePwd(password, findResult.password)
  if (!confirm) {
    return {
      code: 100,
      msg: '密码错误',
    }
  }
  let token = jwt.sign(
    {
      data: findResult,
    },
    jwtSecret,
    {
      expiresIn: '12h',
    }
  )
  returnData['code'] = 200
  returnData['data'] = {
    username: findResult['username'],
    role: findResult['role'],
    permissions: findResult['permissions'],
    avatar: findResult['avatar'],
    _id: findResult['_id'],
  }
  returnData['token'] = token
  returnData['msg'] = '登录成功'
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
  login,
}
