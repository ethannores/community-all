<template>
  <div class="login_page">
    <n-card title="登录" class="login-card">
      <el-form :model="model" ref="formRef" label-width="80px">
        <el-form-item path="username" label="用户名">
          <el-input v-model="model.username"/>
        </el-form-item>
        <el-form-item path="password" label="密码">
          <el-input v-model="model.password" type="password"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="loginHandle()">登录</el-button>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { useStore } from "vuex"
import router from '../router/index'
export default defineComponent({
  setup() {
    const modelRef = ref({
      username: "admin",
      password: "admin.1",
    })
    const store = useStore();
    watch(()=>store.state.user,(newVal,oldVal)=>{
      if(newVal.username){
        let path=router.currentRoute.value.query?.redirct?router.currentRoute.value.query.redirct:'/';
        router.push(path as any)
      }
    })
    const loginHandle = function () {
      store.dispatch('login',modelRef.value)
    }
    return {
      model: modelRef,
      loginHandle,
    }
  },
})
</script>

<style lang="scss">
$bg-color: gray;
.login_page {
  background-image: linear-gradient(
    125deg,
    #e4ffcd,
    #6dd5fa,
    #2980b9,
    #e4ffcd
  );
  background-size: 600%;
  animation: bganimation 20s infinite;
  width: 100vw;
  height: 100vh;
  position: relative;
  .login-card {
    width: 400px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
}
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>