<template>
  <div>
    <!-- 聊天顶部 -->
    <top-nav>
      <template #title>
        <div class="user_header">
          <span class="username">Van</span>
          <!-- <span class="status">在线</span> -->
        </div>
      </template>
    </top-nav>
    <!-- 聊天信息主体 -->
    <div class="chat_main">
      <chat-item v-for="i in 20" :key="i" :data="i"></chat-item>
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
import TopNav from '@/components/TopNav.vue'
import ChatItem from './components/chat-item.vue'
  export default {
    components:{
      TopNav,ChatItem
    },
    data() {
      return {
        content: '11',
        receiver:this.$route.params.id
      }
    },
    mounted () {
      this.$io.on('message',data=>{
        console.log('jieshou ',data)
      });
    },
    methods: {
      sendHandle(){
        if(!this.content){
          this.$toast('未录入需要发送的内容，请录入后再发送');
          return
        }
        this.$io.emit('sendMsg',{
          receiver:this.receiver,
          content:this.content
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.user_header{
  display: flex;
  align-items: flex-end;
  .status{
    font-size: 12px;
    margin-left: 10px;
    color: green;
  }
}
.chat_main{
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  padding-bottom: 120px;
}
.reply_area{
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
  border-top: 1px solid rgba(0,0,0,0.1);
  .left{
    display: flex;
    align-items: center;
    .van-icon{
      font-size: 24px;
    }
  }
  .center{
    flex: 1;
    margin: 0 20px;
    .text_input{
      width: 100%;
      height: 60px;
      border: none;
      border: 1px solid rgba(0,0,0,0.25);
      border-radius: 50px;
      padding-left: 20px;
      font-size: 24px;
    }
  }
}
</style>