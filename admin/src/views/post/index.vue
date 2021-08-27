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

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    let params = ref({
      page: 1,
      limit: 20,
      keyword: "",
    })
    const searchHandle = function () {
      console.log(params.value)
    }
    return { params, searchHandle }
  },
})
</script>

<style scoped>
</style>