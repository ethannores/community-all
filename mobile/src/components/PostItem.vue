<template>
  <div class="post_item_area">
    <div class="items" v-for="item in postItems" :key="item._id">
      <div class="top">
        <div class="left">
          <van-image width="1.75rem" round height="1.75rem" fit="cover" :src="item.author.avatar" />
          <span>{{item.author.username}}</span>
        </div>
        <div class="right">
          {{item.created_at|formatDateMDHM}}
        </div>
      </div>
      <div class="center" @click="goDetail(item._id)">
        <div class="title">{{item.title}}</div>
        <div class="category">
          <span>{{item.category.map(e=>e.title).join(' / ')}}</span>
          <!-- <span>投票贴</span> -->
          <span v-if="item.type==2">投票贴</span>
        </div>
      </div>
      <div class="down">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/post/detail/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.post_item_area {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20px;
  .items {
    width: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      .left{
        display: flex;
        align-items: center;
        span{
          margin-left: 10px;
        }
      }
      .right{
        font-size: 24px;
        color: #999;
      }
    }
    .center {
      font-size: 24px;
      .title {
        font-size: 26px;
        margin: 6px 0;
      }
      .category {
        color: #999;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>