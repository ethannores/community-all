import request from '../util/http'

export function fetchList(query){
  return request({
    url: '/post/list',
    method: 'get',
    params: query,
  })
}
export function fetchDetail(id){
  return request({
    url: '/post/detail',
    method: 'get',
    params: {_id:id},
  })
}
