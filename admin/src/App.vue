<template>
  <div>
    <router-view></router-view>
    <n-message-provider></n-message-provider>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "App",
})
</script>

<script lang="ts" setup>
import { defineComponent } from "vue"
</script>

<style>
</style>
