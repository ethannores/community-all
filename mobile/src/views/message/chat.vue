<template>
  <div>
    <!-- 聊天顶部 -->
    <top-nav>
      <template #title='{data}'>
        <div class="user_header">
          <van-image round width="1.8rem" height="1.8rem" fit="cover" :src="otherUser.avatar" />
          <span class="username">{{otherUser.username}} {{data.age}}</span>
          <!-- <span class="status">在线</span> -->
        </div>
      </template>
    </top-nav>
    <!-- 聊天信息主体 -->
    <div class="chat_main">
      <chat-item v-for="i in chatList" :key="i._id" :data="i"></chat-item>
    </div>
    <!-- 回复框 -->
    <div class="reply_area">
      <div class="left">
        <van-icon name="smile-o" />
      </div>
      <div class="center">
        <input type="text" class="text_input" v-model="content">
      </div>
      <div class="right">
        <van-button size="mini" type="primary" @click="sendHandle">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue"
import ChatItem from "./components/chat-item.vue"
import { fetchChatList,chatRead } from "@/api/user"
export default {
  components: {
    TopNav,
    ChatItem,
  },
  data() {
    return {
      content: "11",
      chat_id: this.$route.params.id,
      reciever_id: this.$route.params.receiver,
      otherUser: {},
      user_id: this.$store.state.user_info._id,
      chatList: [],
    }
  },
  created() {
    this.getChat()
    this.readHandle()
  },
  mounted() {
    this.$io.on("message", data => {
      let temp = {
        sender: {},
      }
      for (let k in data) {
        if (k != "sender") {
          temp[k] = data[k]
        }
      }
      temp.sender._id = data.sender
      this.chatList.push(temp)
      this.readHandle()
    })
  },
  methods: {
    //聊天记录变为已读
    readHandle(){
      chatRead({receiver:this.user_id,chat_id:this.chat_id}).then(res=>{
        console.log(res)
      })
    },
    //获取聊天内容事件
    getChat() {
      fetchChatList({ chat_id: this.chat_id }).then(res => {
        console.log(res)
        // 对方不存在时添加对方数据
        if (!this.otherUser.username) {
          let temp = res.data[0]
          this.otherUser =
            this.user_id == temp.sender._id
              ? temp.receiver
              : temp.sender
        }
        this.chatList = [...res.data]
      })
    },
    //点击发送事件
    sendHandle() {
      if (!this.content) {
        this.$toast("未录入需要发送的内容，请录入后再发送")
        return
      }
      this.$io.emit("sendMsg", {
        receiver: this.reciever_id,
        chat_id: this.chat_id,
        content: this.content,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.user_header {
  display: flex;
  align-items: center;

  .username {
    margin-left: 10px;
  }
  .status {
    font-size: 12px;
    margin-left: 10px;
    color: green;
  }
}
.chat_main {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  padding-bottom: 120px;
}
.reply_area {
  width: 100%;
  background-color: white;
  height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row nowrap;
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    display: flex;
    align-items: center;
    .van-icon {
      font-size: 24px;
    }
  }
  .center {
    flex: 1;
    margin: 0 20px;
    .text_input {
      width: 100%;
      height: 60px;
      border: none;
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 50px;
      padding-left: 20px;
      font-size: 24px;
    }
  }
}
</style>