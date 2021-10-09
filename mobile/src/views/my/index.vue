<template>
  <div>
    <div class="info-main">
      <!-- 头像和用户名信息 -->
      <div class="top">
        <div class="left">
          <img :src="user.avatar" alt="">
        </div>
        <div class="right">
          <span class="username">{{user.username}}</span>
          <div class="info"><span>关注 {{user.follows}}</span> | <span>{{user.fans}} 粉丝</span></div>
        </div>
      </div>
      <!-- 帖子信息 -->
      <div class="follow_area">
        <div class="left">
          <div class="item">
            <span>{{user.posts}}</span>
            <span>发帖</span>
          </div>
          <div class="item">
            <span>{{user.likes}}</span>
            <span>点赞</span>
          </div>
          <div class="item">
            <span>{{user.collections}}</span>
            <span>收藏</span>
          </div>
        </div>
        <div class="right">
          <van-button type="primary" size="small">编辑资料</van-button>
        </div>
      </div>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from "../../components/FooterNav.vue"
import {fetchDetail} from '@/api/user'
export default {
  components: {
    FooterNav,
  },
  data() {
    return {
      user_id: this.$store.state.user_info._id,
      user:{}
    }
  },
  created() {
    if (!this.user_id) {
      this.$toast("未登录")
    }
    this.getDetail()
  },
  methods: {
    getDetail(){
      fetchDetail({_id:this.user_id}).then(res=>{
        console.log(res)
        this.user=res.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.info-main {
  width: 100%;
  padding: 20px;
  background-color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  .top {
    width: 100%;
    height: 200px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .left {
      width: 150px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .right {
      flex: 1;
      margin-left: 30px;
      display: flex;
      flex-flow: column nowrap;
      .username {
        font-size: 40px;
        font-weight: 550;
        color: #193c4d;
        margin-bottom: 10px;
      }
      .info {
        color: #999;
      }
    }
  }
  .follow_area {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      width: 50%;
      justify-content: space-around;
      .item {
        display: flex;
        flex-flow: column nowrap;
      }
    }
  }
}
</style>