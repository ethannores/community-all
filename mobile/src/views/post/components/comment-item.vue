<template>
  <div class="comment-item">
    <van-cell v-if="commentItem.user">
      <template #icon>
        <van-image width="1.75rem" round height="1.75rem" fit="cover" :src="commentItem.user.avatar" />
      </template>
      <template #title>
        <div style="margin-top:4px;margin-left:4px">{{commentItem.user.username}}</div>
      </template>
      <template #label>
        <div class="content">{{commentItem.content}}</div>
        <div class="time">
          <span>{{commentItem.created_at | formatDateMDHM}}</span>
          <span class="reply_num" @click="replyHandle(commentItem)">回复 {{commentItem.childrens.length}}</span>
        </div>
        <children-comment :listData="commentItem.childrens" v-if="commentItem.childrens.length>0"></children-comment>
      </template>
      <template #right-icon>
          <div class="like" style="margin-top:4px;" @click="likeHandle(commentItem)">
            <van-icon :name="commentItem.likes.indexOf($store.state.user_info._id)>-1?'good-job':'good-job-o'" />
            <span>{{commentItem.likes.length}}</span>
          </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {likeComment} from '../../../api/post'
import ChildrenComment from './children-comment.vue'
export default {
  components:{
    ChildrenComment
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  inject:{
    mainVm:{
      default:()=>{}
    }
  },
  data(){
    return {
      commentItem:this.comment
    }
  },
  created() {
    
  },
  methods: {
    //回复
    replyHandle(item){
      this.mainVm.comment_reply=true;
      this.mainVm.replyTo=item;
    },
    //点赞
    likeHandle(item){
      let user = this.$store.state.user_info._id;
      if(!user)return;
      likeComment({_id:item._id,user}).then(res=>{
        if(res.data){
          item.likes.push(user)
        }else{
          item.likes.splice(item.likes.indexOf(user),1)
        }
      })
      // console.log(item)
    }
  },
}
</script>

<style lang="scss" scoped>
.comment-item {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  .content {
    color: black;
  }
  .reply_num {
    padding: 4px 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    color: #666;
    margin-left: 20px;
    border-radius: 4px;
  }
}
</style>