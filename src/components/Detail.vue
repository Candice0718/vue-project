<template>
  <div>
    <el-button @click="$store.dispatch('fetchCounter')">{{counter}}ceshi1</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    // 数据预取
    asyncData({store}) { // 在路由组件中暴露出一个自定义静态函数asyncData
      // 此函数会在组件实例化之前调用，所以它无法访问this, 需要将route和store作为参数传进去
      return store.dispatch('fetchCounter')
    },
    computed: {
      // 从 store的state对象中获取item
      counter() {
        return this.$store.state.counter
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>