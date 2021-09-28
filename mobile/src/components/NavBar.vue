<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>