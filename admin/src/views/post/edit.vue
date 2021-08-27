<template>
  <div>
    <quill-editor></quill-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuillEditor from '../../components/Editor.vue'
export default defineComponent({
  components:{QuillEditor},
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>