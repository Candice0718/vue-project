<template>
  <div>
    <!-- 执行校验(async-validator)、显示错误信息 -->
    <!-- 1. label的标签 -->
    <label v-if="label">{{label}}</label>
    <!-- 2. 插槽 -->
    <slot></slot>
    <!-- 3. 错误信息 -->
    <div v-if="error">{{error}}</div>
  
  </div>
</template>

<script>
  import Schema from 'async-validator';
  import emitter from '@/mixins/emitter.js';
  export default {
    componentName: 'KFormItem',
    inject: ['form'],
    mixins: [emitter],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: String // 校验的字段名称
    },
    data() {
      return {
        error: ''
      }
    },
    mounted () {
      this.$on('validate', () => {
        this.validate()
      });

      // 创建的时候，派发
      if(this.prop) {
        this.dispatch('KForm', 'kFormItem.addField', this);
      }
    },
    methods: {
      validate() {
        // 1. 获取校验规则和值
        const rules = this.form.rules[this.prop];
        const value = this.form.model[this.prop];

        // 2. 获取校验器，Schema参数，key是校验字段名，值为校验规则
        const validator = new Schema({[this.prop]: rules});

        // 3. 执行校验，参数1是校验目标, 参数2是回调函数
        return new Promise((resolve, reject) => {
          validator.validate({[this.prop]: value}, errors => {
            if(errors) {
              // 将错误信息数组中的第一条错误信息打印出来
              this.error = errors[0].message;
              reject();
            } else {
              // 校验成功之后将错误信息成功清空
              this.error = '';
              resolve();
            }
          });
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>