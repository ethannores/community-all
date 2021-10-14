<template>
  <span class="tag" :class="type">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name:'selfTag',
    props:{
      type:'',
    }
  }
</script>

<style lang="scss" scoped>
.tag{
  padding: 6px 15px;
  background-color: #409EFF;
  color: white;
  border-radius: 4px;
  &.success{
    background-color: #67C23A;
  }
  &.info{
    background-color: #909399;
  }
  &.danger{
    background-color: #F56C6C;
  }
  &.warning{
    background-color: #E6A23C;
  }
}
</style>