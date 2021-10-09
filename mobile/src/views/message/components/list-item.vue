<template>
  <div>
    <div class="item" v-for="(item,index) in list" :key="index">
      <div class="left">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
      </div>
      <div class="center">
        <div class="username">
          <span>admin</span>
          <span class="time">{{'2021-09-10 15:58' | formatDateMDHM}}</span>
        </div>
        <div class="content">
          <span class="main">这是一条消息鸭这是一条消息鸭这是一条消息鸭这是一条消息鸭这是一条消息鸭这是一条消息鸭</span>
          <span class="unread">10</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      list: Array(10).fill(1),
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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