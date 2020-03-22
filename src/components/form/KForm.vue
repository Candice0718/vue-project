<template>
  <div>
    <!-- 指定数据、校验规则 -->
    <!-- 1.插槽 -->
    <slot></slot>
    <!-- 2.数据的传递 provide传递KFormItem这个实例-->
    <!-- 3.提供全局校验方法 -->
  </div>
</template>

<script>
  export default {
    // 传递KForm这个实例，方便item获取校验规则
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      rules: Object
    },
    methods: {
      validate(cb) {
        // 表单的全局校验方法

        // 1. 遍历所有FormItem,执行他们的validate方法
        // tasks是Promise数组
        const tasks = this.$children
                        .filter(item => item.prop) // 只有KFormItem存在prop属性才进行校验
                        .map(item => item.validate());
        
        Promise.all(tasks)
          .then(() => cb(true))
          .catch(() => cb(false));
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>