<template>
  <div>
    <!-- 顶部搜索栏 -->
    <n-form inline :label-width="80" :model="params" size="small" ref="formRef">
      <n-form-item label="关键词" path="user.name">
        <n-input v-model:value="params.keyword" placeholder="输入关键词" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button @click="searchHandle" attr-type="button">搜索</n-button>
          <n-button @click="$router.push('/post/edit/0')" type="primary">新建</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <!-- 表格主体 -->
    <el-table :data="listData" border style="width: 100%">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="content" label="内容">
        <template #default="scope">
          <div v-html="scope.row.content"></div>
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
          <el-button v-if="scope.row.type==2" type="primary" size="mini">投票设置</el-button>
          <el-button @click="delPostHandle(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue"
import { fetchList } from "../../api/post"
import { isEmpty } from "lodash"
import router from "../../router"
import { ElMessageBox, ElMessage } from "element-plus"
export default defineComponent({
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
      searchHandle,
      listData,
      delPostHandle,
    }
  },
})
</script>

<style scoped>
</style>