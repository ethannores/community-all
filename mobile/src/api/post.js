import request from '../util/http'

//帖子列表
export function fetchList(query){
  return request({
    url: '/post/list',
    method: 'get',
    params: query,
  })
}
//帖子详情
export function fetchDetail(data){
  return request({
    url: '/post/detail',
    method: 'get',
    params:data,
  })
}

//投票
export function voteStore(data){
  return request({
    url:'/vote/store',
    method:'post',
    data
  })
}
//投票
export function voteUpload(data){
  return request({
    url:'/vote/upload',
    method:'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
//获取当前用户针对该投票贴投票的情况
export function voteResult(data){
  return request({
    url:'/vote/vote_result',
    method:'get',
    params:data,
  })
}
//点赞帖子
export function likePost(data){
  return request({
    url:'/post/like',
    method:'post',
    data
  })
}
//收藏帖子
export function collectionPost(data){
  return request({
    url:'/post/collection',
    method:'post',
    data
  })
}
//评论帖子
export function postComment(data){
  return request({
    url:'/comment/save',
    method:'post',
    data
  })
}
//回复评论
export function replyComment(data){
  return request({
    url:'/comment/reply',
    method:'post',
    data
  })
}
//点赞评论
export function likeComment(data){
  return request({
    url:'/comment/like',
    method:'post',
    data
  })
}
//获取评论列表
export function fetchCommentList(query){
  return request({
    url:'/comment/list',
    method:'get',
    params:query
  })
}