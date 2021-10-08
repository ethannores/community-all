<template>
  <div>
    <div class="main">
      <!-- 头像和用户名信息 -->
      <div class="top">
        <div class="left">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
        </div>
        <div class="right">
          <span class="username">admin</span>
          <span class="info">Level 6 | 1273 Answered</span>
        </div>
      </div>
      <!-- 关注和被关注信息 -->
      <div class="follow_area">
        <div class="item">
            <span>16</span>
            <span>发帖</span>
          </div>
          <div class="item">
            <span>16</span>
            <span>关注</span>
          </div>
          <div class="item">
            <span>5</span>
            <span>粉丝</span>
          </div>
      </div>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '../../components/FooterNav.vue'
  export default {
    components:{
      FooterNav
    },
    data(){
      return{
        user_id:this.$store.state.user_info._id
      }
    },
    created () {
      if(!this.user_id){
        this.$toast('未登录')
      }
    },
    
  }
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  padding: 20px;
  .top{
    width: 100%;
    height: 200px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .left{
      width: 150px;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.1);
      }
    }
    .right{
      flex: 1;
      margin-left: 30px;
      display: flex;
      flex-flow: column nowrap;
      .username{
        font-size: 40px;
        font-weight: 550;
        color: #193c4d;
        margin-bottom: 10px;
      }
      .info{
        color: #999;
      }
    }
  }
  .follow_area{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    .item{
      display: flex;
      flex-flow: column nowrap;
    }
  }
}
</style>