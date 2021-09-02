<template>
  <div>
    <el-container>
      <el-header height="40px">
        <top-nav></top-nav>
      </el-header>
      <el-main style="padding:10px;background-color:#f8f8f8;">
        <el-card body-style="padding:10px">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from './topNav.vue'

export default defineComponent({
  components:{TopNav},
  setup() {
    return {

    };
  },
});
</script>

<style lang="scss">
.el-header{
  background-color: #456781;
}
</style>