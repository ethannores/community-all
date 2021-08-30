<template>
  <div>
    <n-form :label-width="80" :model="formValue" size="large" ref="formRef">
      <n-form-item label="封面图">
        <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
          <n-upload-dragger>
            <div style="margin-bottom: 12px;">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px;">点击或者拖动文件到该区域来上传</n-text>
            <n-p depth="3" style="margin: 8px 0 0 0;">不强制要求封面图必传</n-p>
          </n-upload-dragger>
        </n-upload>
      </n-form-item>
      <n-form-item label="标题">
        <n-input v-model:value="formValue.title" placeholder="帖子标题" />
      </n-form-item>
      <n-form-item label="帖子类型">
        <n-space>
          <n-radio @change="handlePostTypeChange" :checked="formValue.type == 1" :value="1">普通帖子
          </n-radio>
          <n-radio @change="handlePostTypeChange" :checked="formValue.type == 2" :value="2">投票</n-radio>
        </n-space>
      </n-form-item>
      <n-form-item label="投票来源">
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
    <quill-editor :content="formValue.content"></quill-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import QuillEditor from "../../components/Editor.vue"
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5"
export default defineComponent({
  components: { QuillEditor, ArchiveIcon },
  setup() {
    let formValue = ref({
      title: "",
      content: "",
      type: 1,
      vote_source: 1,
    })
    const handlePostTypeChange = (e: any) => {
      formValue.value.type = e.target.value
    }
    const handleVoteSourceChange = (e: any) => {
      formValue.value.vote_source = e.target.value
    }
    return { formValue, handlePostTypeChange, handleVoteSourceChange }
  },
})
</script>

<style scoped>
</style>