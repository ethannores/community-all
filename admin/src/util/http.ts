import axios from 'axios'
import router from '../router/index'
let http = axios.create({
  timeout:5000,
  baseURL:'',
  headers: {
		'content-type': 'application/json',
	},
})

//请求拦截器
http.interceptors.request.use((config)=>{
  if(localStorage.getItem('token')){
    config.headers['token']=localStorage.getItem('token')
  }
  return config
})

//请求回复拦截器
http.interceptors.response.use(res=>{
  if(res.status){
    return res.data
  }
},err=>{
  if(err.response&&err.response.status){

  }
})

export default http