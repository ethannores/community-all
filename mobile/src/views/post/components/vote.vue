<template>
  <div class="vote-main">
    <div class="vote-upload" v-if="vote.data.user_upload==2">
      <h3>用户上传</h3>
      <p>该贴允许用户提供投票项目，上传后待后台审核通过才会展示</p>
      <van-button type="info" size="mini">上传</van-button>
    </div>
    <div class="vote-rule" v-if="vote.data">
      <h3>投票规则</h3>
      <span class="limit">限定：一项一票，每人总共最多投 <b style="font-size:16px">{{vote.data.limit}}</b> 票，投票后不能变更与取消</span>
    </div>
    <div class="vote-area" v-if="isComplated">
      <template v-for="i in vote.items">
        <div class="item" :key="i._id" v-if="i.status == 1">
          <span class="voted_flag" v-if="voteResult.indexOf(i._id)>-1">已投票</span>
          <div class="img"></div>
          <div class="desc">描述：{{ i.description }}</div>
          <div v-if="voteResult.length>=vote.data.limit"></div>
          <div v-else>
            <van-button disabled type="default" size="mini" v-if="voteResult.indexOf(i._id)>-1">已投票</van-button>
            <van-button type="info" size="mini" @click="voteHandle(i)" v-else>投票</van-button>
          </div>
          <div class="result">{{ i.vote_number }} 人已投</div>
        </div>
      </template>
    </div>
  </div>

</template>

<script>
import { voteStore, voteResult } from "../../../api/post"
export default {
  props: {
    vote: {
      type: Object,
      default: () => {},
    },
    post_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isComplated: false,
      voteResult: [],
    }
  },
  mounted() {
    this.getVoteResult()
  },
  methods: {
    //用户上传投票条目
    uploadVote() {},
    //获取当前用户针对该投票贴投票的相关结果
    getVoteResult() {
      this.isComplated = true
      if (!this.$store.state.user_info._id) {
        return
      }
      voteResult({
        post_id: this.post_id,
        user: this.$store.state.user_info._id,
      }).then(res => {
        this.voteResult = res
      })
    },
    //投票事件
    voteHandle(item) {
      // if (!this.$store.state.user_info._id) {
      //   return
      // }
      voteStore({
        _id: item._id,
        user: this.$store.state.user_info._id,
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.voteResult = res.data
          item.vote_number++
        }
        console.log(res)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.vote-main {
  margin-top: 50px;
  font-size: 24px;
  .vote-upload {
    margin-bottom: 20px;
    p {
      margin: 5px 0;
    }
  }
  .vote-rule {
    display: flex;
    flex-flow: column nowrap;
    .limit {
      margin: 10px 0;
    }
  }
}
.vote-area {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  column-gap: 20px;
  .item {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    font-size: 24px;
    border-radius: 4px;
    & > div {
      margin-bottom: 4px;
    }
    position: relative;
    .voted_flag {
      position: absolute;
      top: 0;
      right: -1px;
      z-index: 999;
      background-color: #2b7a3a;
      padding: 2px 6px;
      color: white;
    }
  }
}
</style>
