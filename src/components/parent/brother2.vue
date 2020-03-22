<template>
  <div>
    <el-button @click="sayHi">打招呼</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      sayHi() {
        // this.$parent派发, 
        // this.$parent为VueComponent
        // this.$root为Vue可以实现同样的通信效果
        console.log(this.$parent);
        console.log(this.$root);
        this.$parent.$emit('foo', 'say hi from brother1');
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>