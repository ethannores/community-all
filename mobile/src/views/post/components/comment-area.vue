<template>
  <div class="comment-area">
    <div class="top">
      <span class="title">全部评论({{list.length}})</span>
      <span class="type" :class="{'active':!params.type}" @click="changeType('')">默认</span>
      <span class="type" :class="{'active':params.type=='new'}" @click="changeType('new')">最新</span>
      <span class="type" :class="{'active':params.type=='like'}" @click="changeType('like')">赞多</span>
      <span class="type" :class="{'active':params.type=='reply'}" @click="changeType('reply')">回复多</span>
    </div>
    <div class="main">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list v-model="isLoading" :finished="isFinish" finished-text="没有更多了" @load="onLoad">
          <comment-item v-for="item in list" :key="item._id" :comment="item"></comment-item>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 评论详情 -->
    <!-- <comment-detail></comment-detail> -->
  </div>
</template>

<script>
import { fetchCommentList } from "../../../api/post"
import listMixin from "../../../mixins/list"
import CommentItem from "./comment-item.vue"
import CommentDetail from "./comment-detail.vue"
export default {
  components: {
    CommentItem,CommentDetail
  },
  mixins: [listMixin],
  props: {
    post_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
    }
  },
  created() {
    this.params['type']='';
    this.params['post_id']=this.post_id;
  },
  methods: { 
    //列表排序
    changeType(type) {
      this.params.type = type
      this.onRefresh()
    },
    //获取列表
    getList() {
      fetchCommentList(this.params).then(res => {
        this.dealDataToList(res)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-area {
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 150px;
  .top {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 24px;

    span {
      margin-right: 30px;
      &.title {
        font-size: 32px;
      }
      &.type {
        position: relative;
        &.active {
          color: #1989fa;
          // font-weight: 600;
          font-size: 28px;
        }
      }
    }
  }
}
</style>