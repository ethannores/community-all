<template>
  <div>
    <!-- 帖子条目 -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list v-model="isLoading" :finished="isFinish" finished-text="没有更多了" @load="onLoad">
        <post-item :postItems="list"></post-item>
      </van-list>
    </van-pull-refresh>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from "../components/FooterNav.vue"
import PostItem from "../components/PostItem.vue"
import listMixin from "../mixins/list"
import { fetchList } from "../api/post"
export default {
  components: {
    FooterNav,
    PostItem,
  },
  mixins: [listMixin],
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    //获取首页列表
    getList(){
      fetchList(this.params).then(res => {
        this.dealDataToList(res)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>