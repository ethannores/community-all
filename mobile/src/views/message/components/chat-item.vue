<template>
  <div class="item" :class="{'right':data%2==0}">
    <div class="content">
      <span class="text">xfvas</span>
    </div> 
    <div class="time">{{'2021-10-10 10:50'|formatDateMDHM}}</div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Number,
    },
  },
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