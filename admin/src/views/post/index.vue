<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form inline v-model="params" label-width="80px">
        <el-form-item label="关键词">
          <el-input v-model="params.keyword" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchHandle">搜索</el-button>
          <el-button type="primary" @click="$router.push('/post/edit/0')">新增</el-button>
        </el-form-item>
    </el-form>
    <!-- 表格主体 -->
    <el-table :data="listData" border style="width: 100%">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="content" label="内容">
        <template #default="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="所属分类">
        <template #default="scope">
          <div>
            {{scope.row.categories.map(e=>e.title).join(' / ')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="帖子类型">
        <template #default="scope">
          <div>
            {{scope.row.type==1?'普通帖子':'投票贴'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button @click="$router.push(`/post/edit/${scope.row._id}`)" type="primary" size="mini">编辑</el-button>
          <el-button v-if="scope.row.type==2" @click="voteSetHandle(scope.row)" type="primary" size="mini">投票设置</el-button>
          <el-button @click="delPostHandle(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 投票管理弹框区域 -->
    <vote-dialog :voteShow="voteShow" :currData="currVoteData" @close="voteSetCloseHandle"></vote-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue"
import { fetchList } from "../../api/post"
import { isEmpty } from "lodash"
import router from "../../router"
import { ElMessageBox, ElMessage } from "element-plus"
import VoteDialog from './components/vote.vue'
export default defineComponent({
  components:{VoteDialog},
  setup() {
    let params = ref({
      page: 1,
      limit: 20,
      keyword: "",
    })
    let pagination = ref({
      limit: 20,
    })  
    let listData = ref([])
    let voteShow = ref(false)
    let currVoteData=ref({})
    //投票贴设置
    const voteSetHandle = (data:any)=>{
      currVoteData.value=data;
      voteShow.value=true;
    }
    //关闭投票贴设置
    const voteSetCloseHandle = ()=>{
      currVoteData.value={};
      voteShow.value=false;
    }
    //帖子删除事件
    const delPostHandle = (data: any): void => {
      ElMessageBox.confirm(`确认删除帖子：${data.title}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("确认")
        })
        .catch(() => {
          console.log("取消")
        })
    }
    // 获取帖子列表
    const getList = () => {
      fetchList(params.value).then((res: any) => {
        console.log(res)
        if (isEmpty(res.data)) {
          listData.value = []
        } else {
          listData.value = res.data
        }
      })
    }
    getList()
    const searchHandle = function () {
      console.log(params.value)
    }
    return {
      params,
      voteShow,
      currVoteData,
      searchHandle,
      voteSetHandle,
      listData,
      delPostHandle,
      voteSetCloseHandle
    }
  },
})
</script>

<style scoped>
</style>