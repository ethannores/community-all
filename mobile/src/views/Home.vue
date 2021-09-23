<template>
  <div>
    首页
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '../components/FooterNav.vue'
import {fetchList} from '../api/post'
  export default {
    components:{
      FooterNav
    },
    created(){
      fetchList({page:1,limit:20}).then(res=>{
        console.log(12312)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>