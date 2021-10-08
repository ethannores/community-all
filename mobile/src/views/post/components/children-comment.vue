<template>
  <div class="children-comment-area">
    <div class="item" v-for="item in listData" :key="item._id">
      <div class="title" v-if="item.user&&item.reply_user">
        <span class="username"><b>{{item.user.username}}</b> 回复 <b>{{item.reply_user.username}}</b></span>
      </div>
      <div class="content">
        <span>{{item.content}}</span>
      </div>
      <div class="controller">
        <span>{{item.created_at | formatDateMDHM}}</span>
        <div class="btn">
          <span @click="replyHandle(item)">回复</span>
          <span class="like_area" @click="likeHandle(item)">
            <van-icon :name="item.likes.indexOf($store.state.user_info._id)>-1?'good-job':'good-job-o'" />
            {{item.likes.length}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { likeComment } from "../../../api/post"
export default {
  inject: {
    mainVm: {
      default: () => {},
    },
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    // console.log(this.mainVm)
  },
  methods: {
    //回复
    replyHandle(item) {
      this.mainVm.comment_reply = true
      this.mainVm.replyTo = item
    },
    //点赞
    likeHandle(item) {
      let user = this.$store.state.user_info._id
      if (!user) return
      likeComment({ _id: item._id, user }).then(res => {
        if (res.data) {
          item.likes.push(user)
        } else {
          item.likes.splice(item.likes.indexOf(user), 1)
        }
      })
      // console.log(item)
    },
  },
}
</script>

<style lang="scss" scoped>
.children-comment-area {
  width: 100%;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: black;
  margin-top: 10px;
  .item {
    .username {
      b {
        color: #1989fa;
        font-weight: 0;
        font-style: normal;
      }
    }
    .controller {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .btn {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        span {
          margin-left: 15px;
        }
        .like_area {
          display: flex;
          align-items: center;
        }
      }
    }
    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
}
</style>