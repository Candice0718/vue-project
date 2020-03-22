<template>
  <div>
    <el-button @click="emitMessage">派发事件</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'emitBus1'
      }
    },
    methods: {
      emitMessage() {
        this.$bus.$emit('init',`message from ${this.name}`);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>