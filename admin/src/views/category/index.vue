<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form inline v-model="params" label-width="80px">
        <el-form-item label="关键词">
          <el-input v-model="params.keyword" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchHandle">搜索</el-button>
          <el-button type="primary" @click="showModal=true">新增</el-button>
        </el-form-item>
    </el-form>
     <!-- 表格主体 -->
    <el-table :data="listData" border style="width: 100%">
      <el-table-column prop="title" label="分类名">
      </el-table-column>
      <el-table-column prop="pid" label="上级分类">
        <template #default="scope">
          {{scope.row.parent[0]?scope.row.parent[0]:'无'}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="分类描述">
        <template #default="scope">
          {{scope.row.description?scope.row.description:'无'}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button @click="openEditHandle(scope.row)" type="primary" size="mini">编辑</el-button>
          <!-- <el-button v-if="scope.row.type==2" type="primary" size="mini">投票设置</el-button>
          <el-button @click="delPostHandle(scope.row)" type="danger" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  <!-- 新增和编辑弹框 -->
    <el-dialog
      title="新增/编辑分类"
      v-model="showModal"
      width="400px">
      <el-form v-model="editParams" label-width="80px">
        <el-form-item label="分类名">
          <el-input v-model="editParams.title" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-cascader
          :options="treeData"
          v-model="editParams.pid"
          :props="{ checkStrictly: true,label:'title',value:'_id'}"
          filterable
          placeholder="不选则为顶级分类"
          clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" v-model="editParams.description" placeholder="请输入分类名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showModal = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditSubmit">保 存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, h } from "vue"
import { isEmpty } from "lodash"
import {
  fetchList,
  fetchTree,
  saveCategory,
} from "../../api/category"
export default defineComponent({
  setup() {
    let showModal = ref(false)
    let listData = ref([])
    let params = ref({
      keyword: "",
      page: 1,
      limit: 20,
    })
    let editParams = ref({
      title: "",
      pid: null,
      description: "",
      _id: "",
    })
    let treeData = ref([])
    //获取列表数据
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
    //获取树形结构
    const getTree = () => {
      fetchTree().then((res: any) => {
        treeData.value = res
      })
    }
    getTree()
    getList()
    //定义编辑
    const openEditHandle = (data: any) => {
      editParams.value.title = data.title
      editParams.value.pid = data.pid
      editParams.value._id = data._id
      editParams.value.description = data.description
      showModal.value = true
    }
    watch(
      () => showModal.value,
      (newVal, oldVal) => {
        if (!newVal) {
          editParams.value = {
            title: "",
            pid: null,
            description: "",
            _id: "",
          }
        }
      }
    )

    let searchHandle = () => {
      params.value.page=1;
      getList()
    }
    //点击用户提交
    let addOrEditSubmit = () => {
      console.log(editParams.value)
      if (!editParams.value.title) {
        ;(window as any).$message.error("分类名必填！")
        return
      }
      saveCategory(editParams.value).then((res: any) => {
        if (res.code == 200) {
          ;(window as any).$message.success(res.msg)
          editParams.value = {
            title: "",
            pid: null,
            description: "",
            _id: "",
          }
          showModal.value = false
          getList()
          getTree()
        }
        console.log(res)
      })
    }
    return {
      openEditHandle,
      listData,
      treeData,
      showModal,
      params,
      searchHandle,
      editParams,
      addOrEditSubmit,
    }
  },
})
</script>

<style scoped>
</style>