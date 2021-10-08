import axios from 'axios'
import router from '../router/index'
import {Toast} from 'vant'
import store from '../store/index'
let http = axios.create({
  timeout:5000,
  baseURL:'/api',
  headers: {
		'content-type': 'application/json',
	},
})

//请求拦截器
http.interceptors.request.use((config)=>{
  if(localStorage.getItem('token')){
    config.headers['token']=localStorage.getItem('token')
  }
  if(config.method!='get'&&!store.state.user_info._id&&router.currentRoute.path!='/login'){
    Toast('请先登录再进行操作！')
    router.replace({
      path:'/login',
      query:{
        redirect:router.currentRoute.fullPath
      }
    })
    return Promise.reject()
  }else{
    return config
  }
  
})

//请求回复拦截器
http.interceptors.response.use(res=>{
  if(res.status){
    if(res.data.msg){
      Toast(res.data.msg)
    }
    return res.data
  }
},err=>{
  if(err.response&&err.response.status==401){
    router.replace({
      path:'/login',
      query:{
        redirect:router.currentRoute.fullPath
      }
    })
  }
})

export default http