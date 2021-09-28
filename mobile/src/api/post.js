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

//点赞/收藏帖子
export function likePost(data){
  return request({
    url:'/post/like',
    method:'post',
    data
  })
}
//点赞/收藏帖子
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