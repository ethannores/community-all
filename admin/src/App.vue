<template>
  <div>
    <router-view></router-view>
    <n-message-provider>
      <Message></Message>
    </n-message-provider>
    <!-- App.vue -->
    <n-dialog-provider>
      <Confirm />
    </n-dialog-provider>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "App",
})
</script>

<script lang="ts" setup>
import { defineComponent } from "vue"
import Message from "./components/Message.vue"
import Confirm from "./components/Confirm.vue"
</script>

<style>
</style>
