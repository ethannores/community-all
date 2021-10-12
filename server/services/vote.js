const Model = require('../models/vote')
const VoteRuleModel = require('../models/voteRule')
const mongoose = require('mongoose')
const UploadService = require('./upload')
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
  let match=[];
  //关联表
  let lookup=[];
  //返回体表字段筛选
  let project=[];
  //过滤
  let findResult = await Model.aggregate([
    {
      $facet:{
        count: [
					...match,
					{
						$count: 'count',
					},
				],
				data: [
          ...pageArr,
          ...match,
          ...lookup,
          ...project
        ]
      }
    }
  ]);
	return findResult
}
//查看当前用户已经对该贴的哪些投过票了
async function getUserVoteToPost(post_id,user){
  let findResult = await Model.find({
    post_id:mongoose.Types.ObjectId(post_id),
    vote_users:{
      $elemMatch:{
        user:mongoose.Types.ObjectId(user)
      }
    }
  })
  let resultArr=[]
  if(findResult.length>0){
    findResult.forEach(e=>{
      resultArr.push(e._id)
    })
  }
  return resultArr
}
//投票
async function store(data) {
  let {_id,user}=data;
  //先判断是否已经投过票
  let findResult = await Model.findOne({
    _id:mongoose.Types.ObjectId(_id),
    vote_users:{
      $elemMatch:{
        user:mongoose.Types.ObjectId(user)
      }
    }
  })
  if(!findResult){
    let saveResult = await Model.findOneAndUpdate({
      _id:mongoose.Types.ObjectId(_id)
    },{
      $push:{
        vote_users:{
          user
        }
      }
    })
    let data=await getUserVoteToPost(saveResult.post_id,user)
    return {
      code:200,
      msg:'投票成功',
      data:data
    }
  }
  return {
    code:400,
    msg:'不能重复投票'
  }
  
}
async function save(data) {
  let {_id,post_id,limit,time,user_upload,items}=data;
  let returnData={};  
  let [start_time,end_time]=time;
  //id存在则修改内容
  let findUpdateResult = await VoteRuleModel.findOneAndUpdate({
    post_id:post_id
  },{
    limit,user_upload,start_time,end_time
  },{
    upsert:true,
    new:true,
    setDefaultsOnInsert:true
    
  })
  if(items.length>0){
    items.forEach(async e=>{
      let data={
        imgs:e.imgs,
        description:e.description,
        provider:e.provider,
        status:+e.status
      }
      if(e._id){
        await Model.findByIdAndUpdate(e._id,data)
      }else{
        data['post_id']=e.post_id;
        await Model.create(data)
      }
    })
  }
  returnData['code']=200
  returnData['msg']='保存成功'
  returnData['data']=findUpdateResult
  return returnData
}
async function detail(data) {
	let { post_id } = data
  //获取投票规则
	let result = await VoteRuleModel.findOne({
    post_id:mongoose.Types.ObjectId(post_id)
  })
  //获取已存在的投票条目
  let voteItems = await Model.aggregate([
    {$match:{post_id:mongoose.Types.ObjectId(post_id)}},
    {$lookup:{
      from:'users',
      localField:'provider',
      foreignField:'_id',
      as:'user'
    }},
    {$unwind:'$user'}
  ])
  let tempData=[];
  if(voteItems.length>0){
    voteItems.forEach(e=>{
      tempData.push({
        description:e.description,
        provider:e.provider,
        status:e.status,
        imgs:e.imgs,
        _id:e._id,
        vote_users:e.vote_users.map(e=>e.user),
        vote_number:e.vote_users.length,
        user:e.user.username,
      })
    })
  }

	return {
		code: 200,
		data: result,
    items:tempData
	}
}
//用户自己上传
async function upload(data,img){
  let {post_id,description,provider,status}=data;
  let imgUrl;
  if(img.img.length>0){
    imgUrl = await UploadService.singleUpload(img.img[0])
  }
  let saveResult = await Model.create({
    post_id,description,provider,status,imgs:imgUrl
  })
  return {
    code:200,
    msg:'投票项目上传成功，等待后台审核通过后，内容便会展示',
    data:saveResult
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
  store,
  getUserVoteToPost,
  upload
}
