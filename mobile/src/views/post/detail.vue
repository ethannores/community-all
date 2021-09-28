<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar :title="`详情`"></nav-bar>
    <div class="detail" v-if="detailData.title">
      <!-- 封面图 -->
      <div class="face_img"></div>
      <!-- 顶部用户信息 -->
      <div class="userinfo">
        <div class="left">
          <van-image width="1.75rem" round height="1.75rem" fit="cover" :src="detailData.author.avatar" />
          <span>{{detailData.author.username}}</span>
        </div>
        <div class="right">
          <van-button type="primary" size="mini">关注</van-button>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="main">
        <span class="category">{{detailData.created_at | formatDateMDHM}}
          {{detailData.category.map(e=>e.title).join(' / ')}}</span>
        <h2 class="title">{{detailData.title}} </h2>
        <div class="content" v-html="detailData.content"></div>
      </div>
    </div>
    <!-- 评论容器 -->
    <comment-area :post_id="id"></comment-area>
    <!-- 底部评论点赞收藏 -->
    <div class="bottom-controller" v-if="detailData.collections">
      <div class="comment" @click="comment_reply=true">不来评论一下嘛？</div>
      <div class="collection" @click="collectionHandle">
        <van-icon :name="detailData.isCollection?'star':'star-o'" />
        <span>{{detailData.collections.length}}</span>
      </div>
      <div class="like" @click="likeHandle">
        <van-icon :name="detailData.isLike?'good-job':'good-job-o'" />
        <span>{{detailData.likes.length}}</span>
      </div>
    </div>
    <!-- 评论帖子 -->
    <van-popup v-model="comment_reply" position="bottom" get-container="body"><post-comment :post_id="id"></post-comment></van-popup>
    
  </div>
</template>

<script>
import { fetchDetail,likePost,collectionPost } from "../../api/post"
import NavBar from "../../components/NavBar.vue"
import PostComment from './components/post-comment.vue'
import CommentArea from './components/comment-area.vue'
export default {
  components: {
    NavBar,PostComment,CommentArea
  },
  data() {
    return {
      id: this.$route.params.id,
      detailData: {},
      comment_reply: false,
    }
  },
  created() {
    fetchDetail({_id:this.id,user:this.$store.state.user_info._id||''}).then(res => {
      console.log(res)
      this.detailData = res.data
    })
  },
  methods: {
    //点赞
    likeHandle(){
      likePost({_id:this.id,user:this.$store.state.user_info._id}).then(res=>{
        console.log(res)
        this.detailData.isLike=res.data;
        if(res.data){
          this.detailData.likes.push(1)
        }else{
          this.detailData.likes.pop()
        }
      })
    },
    //收藏
    collectionHandle(){
      collectionPost({_id:this.id,user:this.$store.state.user_info._id}).then(res=>{
        console.log(res)
        this.detailData.isCollection=res.data
        if(res.data){
          this.detailData.collections.push(1)
        }else{
          this.detailData.collections.pop()
        }
      })
    },
    
  },
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  padding: 20px;
  .userinfo {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
  }
  .main {
    .content {
      margin-top: 10px;
    }
    .category {
      font-size: 14px;
      color: #999;
    }
  }
}
.bottom-controller {
  display: flex;
  background-color: white;
  height: 100px;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  align-items: center;
  .comment {
    padding: 10px 0 10px 30px;
    color: #999;
    font-size: 24px;
    background-color: #eee;
    border-radius: 50px;
    width: 500px;
  }
  .collection,
  .like {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}
</style>