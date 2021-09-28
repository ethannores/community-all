<template>
  <div class="comment-area">
    <div class="top">
      <span class="title">全部评论({{list.length}})</span>
      <span class="type active">默认</span>
      <span class="type">最新</span>
      <span class="type">赞多</span>
      <span class="type">回复多</span>
    </div>
    <div class="main">
      <comment-item v-for="item in list" :key="item._id" :comment="item"></comment-item>
    </div>
  </div>
</template>

<script>
  import {fetchCommentList} from '../../../api/post'
  import CommentItem from './comment-item.vue'
  export default {
    components:{
      CommentItem
    },
    
    props:{
      post_id:{
        type:String,
        default:""
      }
    },
    data(){
      return{
        params:{
          page:1,
          limit:10,
          type:'new',
          post_id:this.post_id
        },
        list:[]
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        fetchCommentList(this.params).then(res=>{
          this.list=[...this.list,...res.data]
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.comment-area{
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 150px;
  .top{
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    font-size: 24px;
    
    span{
      margin-right: 30px;
      &.title{
        font-size: 32px;
      }
      &.type{
        position: relative;
        &.active{
          color:#1989fa;
          // font-weight: 600;  
          font-size: 28px;
        }
      }
    }
  }
}
</style>