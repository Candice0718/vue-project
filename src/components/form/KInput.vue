<template>
  <div>
    <!-- 维护数据、实现数据的双向绑定 v-model = @input value-->
    <!-- v-bind=$attrs 解构父组件的属性-->
    <!-- #todo v-model在其他组件上实现 -->
    <input :value="value" @input="onInput" v-bind="$attrs"/>
  </div>
</template>

<script>
  import emitter from '@/mixins/emitter.js';
  export default {
    inheritAttrs: false,
    mixins: [emitter],
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
        // 用$parent强关联，组件的耦合度太高
        // this.$parent.$emit('validate');

        // 优化方案：mixins一个工具库，迭代的查找父组件并与参数componentName做匹配
        this.dispatch('KFormItem', 'validate');
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>