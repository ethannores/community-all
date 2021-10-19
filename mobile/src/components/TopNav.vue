<template>
  <div>
    <van-sticky>
      <div class="top_nav">
        <div class="left">
          <van-icon name="down" @click="$router.go(-1)" />
        </div>
        <div class="center">
          <slot name="title" :data="test"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        test: {
          name:'123',
          age:23
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.top_nav{
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: 0px 2px 2px rgba(0,0,0,0.1);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 20px;
  .left{
    margin-right: 20px;
    font-size: 32px;
    display: flex;
    align-items: center;
    .van-icon{
      transform: rotate(90deg);
    }
  }
}
</style>