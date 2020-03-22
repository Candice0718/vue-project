<template>
  <div>
    {{this.message}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: ''
      }
    },
    mounted () {
      // this.$parent监听
      this.$parent.$on('foo', msg => {
        this.message = msg
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>