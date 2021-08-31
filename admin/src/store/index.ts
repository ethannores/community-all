import { createStore, Store } from 'vuex'
import { ComponentCustomProperties } from 'vue'
import {ElMessage} from 'element-plus'
import http from '../util/http'
declare module '@vue/runtime-core' {
  interface State {
    user: Object
  }
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload
    },
    CLEAR_USER(state){
      state.user={}
    }
  },
  actions: {
    login({ commit }, data) {
      http.post('/user/login', data).then((res: any) => {
        if (res.code == 200) {
          ElMessage.success(res.msg)
          commit('LOGIN', res.data);
          localStorage.setItem('expTime',new Date().getTime()+43200000+'')
          localStorage.setItem('token',res.token)
          localStorage.setItem('user',JSON.stringify(res.data))
        } else {
          ElMessage.info(res.msg)
        }
      })
    },
  },
})
