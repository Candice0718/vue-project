<template>
  <div>
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="content"></slot>
    <!-- 作用域插槽 动态的值必须在挂载之后：(mounted）才能获取-->
    <slot name="title" :title="title"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: ''
      }
    },
    mounted() {
      this.title = "slotTemplate"
    }
  }
</script>

<style lang="scss" scoped>

</style>