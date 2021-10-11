<template>
  <div class="item" :class="{'right':user_id==data.sender._id}">
    <div class="content">
      <span class="text">{{data.content}}</span>
    </div> 
    <div class="time">{{data.created_at|formatDateMDHM}}</div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default:()=>{}
    },
  },
  data(){
    return{
      user_id:this.$store.state.user_info._id
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
  display: flex;
  .time{
    font-size: 12px;
    color: #999;
    align-self: flex-end;
    margin-bottom: 5px;
    margin-left: 10px;
  }
  .content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 90%;
    .text{
      word-break: break-all;
    }
    .time {
      color: #eee;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  &.right {
    .time{
      margin-left: 0;
      margin-right: 10px;
    }
    .content {
      background-color: #9eea6a;
    }
    flex-flow: row-reverse;
  }
}
</style>