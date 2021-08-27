<template>
  <div>

  </div>
</template>

<script lang="ts">
import { useMessage } from "naive-ui"
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    ;(window as any).$message = useMessage()
    return {}
  },
})
</script>

<style scoped>
</style>