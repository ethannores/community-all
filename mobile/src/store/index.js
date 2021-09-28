import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_info: {},
    reply_object: {},
    unread_number: 0,
  },
  mutations: {
    //增加未读数
    ADD_NUM(state, payload) {
      state.unread_number += payload || 0
    },
    //减少未读数
    REDUCE_NUM(state, payload) {
      state.unread_number -= payload || 0
    },
    //设置未读数
    SET_UNREAD(state, payload) {
      state.unread_number = payload || 0
    },
    //设置用户信息
    SET_USER_INFO(state, data) {
      if (data?.username) {
        state.user_info = data
      }
    },
    // 设置恢复对象信息
    SET_REPLY_OBJECT(state, data) {
      state.reply_object = data
    },
  },
  actions: {
  },
  modules: {
  }
})
