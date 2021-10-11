<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
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