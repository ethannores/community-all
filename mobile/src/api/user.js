import request from '../util/http'

//关注
export function followHandle(data){
  return request({
    url: '/user/follow',
    method: 'post',
    data,
  })
}
//获取个人信息
export function fetchDetail(data){
  return request({
    url: '/user/detail',
    method: 'post',
    data,
  })
}