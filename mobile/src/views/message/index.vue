<template>
  <div>
    <div class="main">
      <!-- 搜索区域 -->
      <div class="search_area">

      </div>
      <!-- 列表区域 -->
      <div class="list_area">
        <message-area></message-area>
      </div>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue'
import MessageArea from './components/message-area.vue'
  export default {
    components:{
      FooterNav,MessageArea
    }
  }
</script>

<style lang="scss" scoped>
.main{
  padding-bottom: 150px;
}
</style>