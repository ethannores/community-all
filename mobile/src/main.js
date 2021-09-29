import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import http from './util/http'

import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  Icon,
  Image as VanImage,
  NavBar,
  Popup,
  Row,
  Col,
  Field,
  Toast,
  List,
  PullRefresh,
} from 'vant'
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$toast = Toast
//定义全局filter
import * as filters from './util/filters.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})
//引入全局工具js
import { LS } from './util/tools'
Vue.prototype.$LS = LS
Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(Icon)
  .use(VanImage)
  .use(NavBar)
  .use(Popup)
  .use(Row)
  .use(Col)
  .use(Field)
  .use(List)
  .use(PullRefresh)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
