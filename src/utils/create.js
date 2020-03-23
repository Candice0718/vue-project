import Vue from 'vue';

export default function create(Component, props){
  // 1. 使用构造器创建一个子类
  // 2. 通过子类实例创建一个虚拟dom
   const vm = new(Vue.extend(Component))({
    propsData: {
      ...props
    }
   });
    // 生成真实dom
  vm.$mount();

  // 通过$el属性获取真实的dom
  document.body.appendChild(vm.$el);

  // 组件实例返回
  const comp = vm.$root;
  // 组件销毁
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    comp.$destroy()
  }

  return comp;
}