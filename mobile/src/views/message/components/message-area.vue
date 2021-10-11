<template>
  <div>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list v-model="isLoading" :finished="isFinish" finished-text="没有更多了" @load="onLoad">
        <list-item v-for="i in list" :key="i.chat_id" :data="i"></list-item>
      </van-list>
    </van-pull-refresh>
    
  </div>
</template>

<script>
import ListItem from "./list-item.vue"
import {fetchMsgList} from '@/api/user'
import listMixin from '@/mixins/list'
export default {
  components: {
    ListItem,
  },
  mixins:[listMixin],
    data(){
      return{
        user_id:this.$store.state.user_info._id
      }
    },
  methods: {
    getList() {
        this.params['user_id']=this.user_id
        fetchMsgList(this.params).then(res=>{
          this.dealDataToList(res)
          
        })
      }
  },
}
</script>

<style lang="scss" scoped>
</style>