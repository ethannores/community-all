<template>
  <div>
    <router-view></router-view>
    <n-message-provider>
      <Message></Message>
    </n-message-provider>
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
</script>

<style>
</style>
