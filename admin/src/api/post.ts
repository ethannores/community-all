import request from '../util/http'

export function fetchList(query: any) {
  return request({
    url: '/post/list',
    method: 'get',
    params: query,
  })
}
export function fetchPost(_id: string) {
  return request({
    url: '/post/detail',
    method: 'get',
    params: { _id },
  })
}
export function savePost(data: any) {
  return request({
    url: '/post/save',
    method: 'post',
    data,
  })
}
export function saveVoteRule(data: any) {
  return request({
    url: '/vote/save',
    method: 'post',
    data,
  })
}
export function fetchVoteRule(params:object) {
  return request({
    url: '/vote/detail',
    method: 'get',
    params
  })
}
export function delPost(_id: string) {
  return request({
    url: '/post/del',
    method: 'post',
    data: { _id },
  })
}
