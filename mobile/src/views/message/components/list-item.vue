<template>
  <div>
    <div class="item">
      <div class="left">
        <img :src="user_id==data.sender_id?data.receiver_avatar:data.sender_avatar" alt="">
      </div>
      <div class="center">
        <div class="username">
          <span>{{user_id==data.sender_id?data.receiver:data.sender}}</span>
          <span class="time">{{data.created_at | formatDateMDHM}}</span>
        </div>
        <div class="content">
          <span class="main">{{data.content}}</span>
          <span class="unread">10</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      user_id:this.$store.state.user_info_id
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  .left {
    width: 100px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .center {
    display: flex;
    flex-flow: column nowrap;
    margin-left: 10px;
    flex: 1;
    .username {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .content {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .main {
        flex: 1;
        max-width: 550px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
      }
      .unread{
        background-color: #e4393c;
        color: white;
        padding: 2px 6px;
        font-size: 16px;
        border-radius: 4px;
      }
    }
  }
}
</style>