<template>
  <div>
    <!-- 维护数据、实现数据的双向绑定 v-model = @input value-->
    <!-- v-bind=$attrs 解构父组件的属性-->
    <!-- #todo v-model在其他组件上实现 -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)

        // 实时校验，通知父组件监听 
        // 用$parent强关联，组件的耦合度太高，todo: 需要优化
        this.$parent.$emit('validate');
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>