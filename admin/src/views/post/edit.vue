<template>
  <div>
    <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
      <n-upload-dragger>
        <div style="margin-bottom: 12px;">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px;">点击或者拖动文件到该区域来上传封面图</n-text>
        <n-p depth="3" style="margin: 8px 0 0 0;">不强制要求封面图必传</n-p>
      </n-upload-dragger>
    </n-upload>
    <n-form inline :label-width="80" :model="formValue" size="large" ref="formRef">
      <n-form-item label="标题">
        <n-input v-model:value="formValue.title" placeholder="帖子标题" />
      </n-form-item>
      <n-form-item label="上级分类" path="user.name">
        <n-cascader v-model:value="formValue.category" placeholder="选择帖子所属分类" :expand-trigger="'click'"
          :options="treeData" :cascade="true" :leaf-only="false" :show-path="true" :filterable="true" />
      </n-form-item>
      <n-form-item label="帖子类型">
        <n-space>
          <n-radio @change="handlePostTypeChange" :checked="formValue.type == 1" :value="1">普通</n-radio>
          <n-radio @change="handlePostTypeChange" :checked="formValue.type == 2" :value="2">投票</n-radio>
        </n-space>
      </n-form-item>
      <n-form-item label="投票来源" v-show="formValue.type==2">
        <n-space>
          <n-radio name="vote-source" @change="handleVoteSourceChange" :checked="formValue.vote_source == 1" :value="1">
            系统上传
          </n-radio>
          <n-radio name="vote-source" @change="handleVoteSourceChange" :checked="formValue.vote_source == 2" :value="2">
            接收用户上传</n-radio>
        </n-space>
      </n-form-item>
    </n-form>
    <!-- 内容详情录入框 -->
    <my-editor ref="editor" :value="formValue.content" @input="changeContent"></my-editor>

    <!-- 提交区域 -->
    <n-space>
      <n-button type="primary" @click="savePostHandle">提交</n-button>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5"
import { fetchTree } from "../../api/category"
import { savePost, fetchPost } from "../../api/post"
import router from "../../router"
import MyEditor from "@/components/MyEditor.vue"
export default defineComponent({
  components: { ArchiveIcon, MyEditor },
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
    const handlePostTypeChange = (e: any) => {
      formValue.value.type = e.target.value
      if (e.target.value == 1) {
        formValue.value.vote_source = 1
      }
      console.log(formValue.value)
    }
    const handleVoteSourceChange = (e: any) => {
      formValue.value.vote_source = e.target.value
    }
    const changeContent = (e: any) => {
      console.log(e)
      formValue.value.content = e
    }
    const savePostHandle = () => {
      console.log(formValue.value)
      savePost(formValue.value).then((res: any) => {
        console.log(res)
        if (res.code == 200) {
          ;(window as any).$message.success("保存成功")
          router.go(-1)
        }
      })
    }
    return {
      formValue,
      handlePostTypeChange,
      handleVoteSourceChange,
      treeData,
      savePostHandle,
      changeContent,
    }
  },
})
</script>

<style scoped>
</style>