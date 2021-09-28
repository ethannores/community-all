const Model = require('../models/post')
const mongoose = require('mongoose')
const VoteService = require('./vote')
async function list(data) {
  let page = +data.page || 1
  let limit = +data.limit || 2
  //定义查询条件
  let where = {}
  let findResult = await Model.find(where)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({
      path: 'author',
      select: { username: 1, avatar: 1 },
    })
    .populate({
      path: 'category',
      select: { title: 1 },
    })
  let count = await Model.countDocuments(where)

  return {
    data: findResult,
    count,
  }
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
    .populate({
      path: 'author',
      select: { username: 1, avatar: 1 },
    })
    .populate({
      path: 'category',
      select: { title: 1 },
    })
  if (data.user) {
    result._doc['isLike'] = await getUserLikeStatus(data._id, data.user)
    result._doc['isCollection'] = await getUserCollectionStatus(
      data._id,
      data.user
    )
  }
  if(result._doc['type']==2){
    result._doc['votes'] = await VoteService.detail({post_id:_id})
  }

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
async function like(data) {
  let { _id, user } = data
  let isLikes = await getUserLikeStatus(_id, user)
  let updateQuery = {
    $push: {
      likes: user,
    },
  }
  if (isLikes) {
    updateQuery = {
      $pull: {
        likes: user,
      },
    }
  }
  let saveStatus = await Model.updateOne(
    {
      _id: mongoose.Types.ObjectId(_id),
    },
    updateQuery
  )
  return {
    code: 200,
    msg: !isLikes ? '点赞成功' : '取消点赞',
    data: !isLikes,
  }
}
async function collection(data) {
  let { _id, user } = data
  let isCollection = await getUserCollectionStatus(_id, user)
  let updateQuery = {
    $push: {
      collections: user,
    },
  }
  if (isCollection) {
    updateQuery = {
      $pull: {
        collections: user,
      },
    }
  }
  let saveStatus = await Model.updateOne(
    {
      _id: mongoose.Types.ObjectId(_id),
    },
    updateQuery
  )
  return {
    code: 200,
    msg: !isCollection ? '收藏成功' : '取消收藏',
    data: !isCollection,
  }
}
async function getUserCollectionStatus(post_id, user) {
  let collectionStatus = await Model.findOne({
    _id: mongoose.Types.ObjectId(post_id),
    collections: {
      $elemMatch: {
        $eq: mongoose.Types.ObjectId(user),
      },
    },
  })
  return collectionStatus ? true : false
}
async function getUserLikeStatus(post_id, user) {
  let likeStatus = await Model.findOne({
    _id: mongoose.Types.ObjectId(post_id),
    likes: {
      $elemMatch: {
        $eq: mongoose.Types.ObjectId(user),
      },
    },
  })
  return likeStatus ? true : false
}
module.exports = {
  list,
  save,
  detail,
  del,
  like,
  collection,
}
