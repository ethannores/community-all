import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store/index'
import {LS} from '../util/tools'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/index.vue')
  },
  {
    path: '/post/detail/:id',
    name: 'PostDetail',
    component: () => import(/* webpackChunkName: "postDetail" */ '../views/post/detail.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "community" */ '../views/community/index.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/my/index.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "message" */ '../views/message/index.vue')
  },
]

const router = new VueRouter({
  mode:'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.user_info._id) {
    store.commit('SET_USER_INFO', LS.get('user_info'))
  }
  if (store.state.reply_object?.post_id) {
    store.commit('SET_REPLY_OBJECT', {})
  }
  next()
})
export default router
