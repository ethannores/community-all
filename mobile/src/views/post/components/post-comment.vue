<template>
  <div>
    <van-row class="post-comment" type="flex" align="center">
      <van-col span="20">
        <van-field ref="post-input" rows="2" v-model.trim="content" autosize type="textarea" maxlength="50"
          :placeholder="inputPlaceholder" show-word-limit />
      </van-col>
      <van-col class="post-btn" span="4" :style="{ color: content.length ? '#4a8ecf' : '#666' }" @click="onPostComment">
        发布</van-col>
    </van-row>
  </div>
</template>

<script>
import { postComment } from "../../../api/post"
export default {
  props: {
    post_id: {
      type: String,
      default: "",
    },
    reply_to: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { content: "" }
  },
  inject: {
    mainVm: {
      default: () => {},
    },
  },
  computed: {
    inputPlaceholder() {
      const replyTo = this.reply_to
      return replyTo.user
        ? `回复 ${replyTo.user.username}`
        : "优质评论将会被优先展示"
    },
  },
  methods: {
    async onPostComment() {
      if (!this.content) {
        this.$toast("没有填写内容不能发布！")
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "发布中",
      })
      try {
        let result = await postComment({
          post_id: this.post_id,
          user: this.$store.state.user_info._id,
          reply_to: this.reply_to._id ? this.reply_to._id : "",
          content: this.content,
        })
        if (result.code == 200) {
          this.$toast.success("发布成功")
          this.content = ""
          this.mainVm.closeReplyHandle();
        }

        console.log(result)
      } catch (err) {
        console.log("发布失败", err)
        this.$toast.fail("发布失败")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.post-comment {
  padding: 12px;
}

.van-cell {
  background-color: #f5f7f9;
}

.post-btn {
  font-size: 15px;
  text-align: center;
}
</style>