import {createStore,Store} from 'vuex'
import {ComponentCustomProperties} from 'vue'
import {useMessage} from 'naive-ui'

import http from '../util/http'
declare module '@vue/runtime-core'{
  interface State{
    user:Object
  }
  interface ComponentCustomProperties{
    $store:Store<State>
  }
}

export default createStore({
  state:{
    user:{}
  },
  mutations:{
    LOGIN(state,payload){
      state.user = payload
    }
  },
  actions:{
    login({commit},data){
      let message = useMessage()
      http.post('/user/login',data).then(res=>{
        console.log(message);
        message.info(res.msg)
        commit('LOGIN',res.data)
      })
    }

  }
})