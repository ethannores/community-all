<template>
  <div>

  </div>
</template>

<script lang="ts">
import { useDialog } from "naive-ui"
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    ;(window as any).$confirm = useDialog()
    return {}
  },
})
</script>

<style scoped>
</style>