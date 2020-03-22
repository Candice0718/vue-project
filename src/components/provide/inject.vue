<template>
  <div>
    {{foo}}
    {{app.$options.msg}}
  </div>
</template>

<script>
  export default { 
    /** 
    * 另一种写法可以解决组件内变量名冲突
    * inject: {
    *   foo: foo,
    *   app: app
    * }
    */
    inject: ['foo', ['app']],
    mounted () {
      console.log(this.app.$options);
    },
  }
</script>

<style lang="scss" scoped>

</style>