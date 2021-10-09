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