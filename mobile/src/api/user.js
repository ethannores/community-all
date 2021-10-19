import request from '../util/http'

//获取关注列表和粉丝列表
export function followList(data){
  return request({
    url: '/follow/list',
    method: 'get',
    params:data,
  })
}
//关注
export function followHandle(data){
  return request({
    url: '/follow/store',
    method: 'post',
    data,
  })
}
//取消关注
export function cancelFollowHandle(data){
  return request({
    url: '/follow/cancel',
    method: 'post',
    data,
  })
}
//获取个人信息
export function fetchDetail(data){
  return request({
    url: '/user/detail',
    method: 'get',
    params:data,
  })
}
//获取个人聊天列表
export function fetchMsgList(data){
  return request({
    url: '/message/list',
    method: 'get',
    params:data,
  })
}
//获取两个人的聊天内容
export function fetchChatList(data){
  return request({
    url: '/message/chat',
    method: 'get',
    params:data,
  })
}
//获取两个人的聊天内容
export function chatRead(data){
  return request({
    url: '/message/read',
    method: 'post',
    data,
  })
}