import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../layout/index.vue'
import store from '../store/index'
import {isEmpty} from 'lodash'
let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/',
    component:Layout,
    redirect: '/dashboard',
    children:[{
      path:'dashboard',
      name:'Dashboard',
      component:()=>import('../views/dashboard.vue')
    }]
  },
  {
    path:'/settings',
    component:Layout,
    children:[{
      path:'index',
      name:'Settings',
      component:()=>import('../views/settings/index.vue')
    }]
  },
  {
    path:'/post',
    component:Layout,
    children:[{
      path:'index',
      name:'PostIndex',
      component:()=>import('../views/post/index.vue')
    },{
      path:'edit/:id',
      name:'PostEdit',
      component:()=>import('../views/post/edit.vue')
    }]
  },
  
]

let router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to,from,next)=>{
  if(to.path!='/login'){
    if(!localStorage.getItem('expTime')|| localStorage.getItem('expTime') as any < new Date().getTime()){
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
    if(isEmpty(store.state.user)&&localStorage.getItem('user')){
      store.commit('LOGIN',JSON.parse(localStorage.getItem('user') as any))
    }
    next();
  }else{
    next()
  }
})


export default router
