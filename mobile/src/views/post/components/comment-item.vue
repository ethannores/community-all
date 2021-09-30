<template>
  <div class="comment-item">
    <van-cell v-if="comment.user">
      <template #icon>
        <van-image width="1.75rem" round height="1.75rem" fit="cover" :src="comment.user.avatar" />
      </template>
      <template #title>
        <div style="margin-top:4px;margin-left:4px">{{comment.user.username}}</div>
      </template>
      <template #label>
        <div class="content">{{comment.content}}</div>
        <div class="time">
          <span>{{comment.created_at | formatDateMDHM}}</span>
          <span class="reply_num">回复 0</span>
        </div>
      </template>
      <template #right-icon>
          <div class="like" style="margin-top:4px;" @click="likeHandle(comment)">
            <van-icon :name="comment.likes.indexOf($store.state.user_info._id)>-1?'good-job':'good-job-o'" />
            <span>{{comment.likes.length}}</span>
          </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {likeComment} from '../../../api/post'
export default {
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
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