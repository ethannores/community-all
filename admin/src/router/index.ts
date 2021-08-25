import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

let router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
