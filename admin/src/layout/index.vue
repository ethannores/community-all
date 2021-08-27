<template>
  <div>
    <n-layout>
      <n-layout-header inverted bordered>
        <top-nav></top-nav>
      </n-layout-header>
      <n-layout-content class="main_content">
        <n-card class="main_card">
          <router-view></router-view>
        </n-card>
      </n-layout-content>
    </n-layout>
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
.main_content{
  background-color: #f8f8f8;
  height: calc(100vh - 50px);
  padding: 10px;
  .n-card__content{
    padding: 10px;
    padding-top: 5px;
  }
}
</style>