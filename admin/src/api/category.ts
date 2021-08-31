import request from '../util/http'

export function fetchList(query:any){
  return request({
    url:'/category/list',
    method:'get',
    params:query
  })
}
export function fetchTree(query?:any){
  return request({
    url:'/category/tree',
    method:'get',
    params:query
  })
}
export function saveCategory(data:any){
  return request({
    url:'/category/save',
    method:'post',
    data
  })
}
export function delCategory(_id:string){
  return request({
    url:'/category/del',
    method:'post',
    data:{_id}
  })
}