import request from '../util/http'

//获取关注列表和粉丝列表
export function uploadImages(data){
  return request({
    url: '/upload/image/multer',
    method: 'post',
    headers:{

    },
    data
  })
}