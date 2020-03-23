export default {
  methods: {
    dispatch(componentName, eventName, params) {
      // 类型于冒泡，一直向上找夫组件，没有则找根组件
      var parent = this.$parent || this.$root;
      // 获取父｜根组件的componentName
      var name = parent.$options.componentName;
      // 迭代 查找name等于参数componentName的父组件
      while (parent && (!name || name !== componentName)) {
        // 有父组件、componentName不相等，继续向上查找父组件
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 父组件派发事件
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};