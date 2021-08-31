<template>
  <div>
    <el-form ref="form" :model="formValue" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="formValue.title"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-cascader
          :options="treeData"
          v-model="formValue.category"
          :props="{ checkStrictly: true,label:'title',value:'_id'}"
          filterable
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="帖子类型">
        <el-radio v-model="formValue.type" :label="1">普通帖</el-radio>
        <el-radio v-model="formValue.type" :label="2">投票帖</el-radio>
      </el-form-item>
      <el-form-item label="投票来源" v-show="formValue.type==2">
        <el-radio v-model="formValue.vote_source" :label="1">系统上传</el-radio>
        <el-radio v-model="formValue.vote_source" :label="2">用户上传</el-radio>
      </el-form-item>
    </el-form>

    <!-- 内容详情录入框 -->
    <my-editor ref="editor" :value="formValue.content" @input="changeContent"></my-editor>

    <!-- 提交区域 -->
    <el-button type="primary" @click="savePostHandle">提交</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { fetchTree } from "../../api/category"
import { savePost, fetchPost } from "../../api/post"
import router from "../../router"
import MyEditor from "../../components/MyEditor.vue"
import {ElMessage} from "element-plus"
export default defineComponent({
  name:'PostEdit',
  components: { MyEditor },
  setup() {
    let formValue = ref({
      title: "",
      content: "",
      type: 1,
      vote_source: 1,
      category: null,
    })
    let treeData = ref([])
    let id = router.currentRoute.value.params.id
    //初始化页面
    const initPage = () => {
      //如果id存在的话，则通过接口获取页面数据
      if (id && id != "0") {
        fetchPost(id as any).then((res: any) => {
          if (res.data) formValue.value = res.data
        })
      }
    }
    initPage()
    //获取树形结构
    const getTree = () => {
      fetchTree().then((res: any) => {
        treeData.value = res
      })
    }
    getTree()
    watch(()=>formValue.value.type,(newVal:any)=>{
      newVal==1&&(formValue.value.vote_source = 1)
    })
    const changeContent = (e: any) => {
      formValue.value.content = e
    }
    const savePostHandle = () => {
      savePost(formValue.value).then((res: any) => {
        console.log(res)
        if (res.code == 200) {
          ElMessage.success("保存成功")
          router.go(-1)
        }
      })
    }
    return {
      formValue,
      treeData,
      savePostHandle,
      changeContent,
    }
  },
})
</script>

<style scoped>
</style>