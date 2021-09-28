<template>
  <div>
    <!-- 帖子条目 -->
    <post-item :postItems="postItems"></post-item>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
    
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue'
import PostItem from '../components/PostItem.vue'
import {fetchList} from '../api/post'
  export default {
    components:{
      FooterNav,PostItem
    },
    data(){
      return{
        postItems:[]
      }
    },
    created(){
      fetchList({page:1,limit:20}).then(res=>{
        this.postItems=res.data
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>