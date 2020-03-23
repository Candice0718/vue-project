import Vue from 'vue';
/**
 * 动态生成组件实例，并且挂载至body上
 * @param {*} Component 是组件配置对象
 * @param {*} props 
 */
export default function create(Component, props) {
  // 借用Vue构造函数来动态生成组件实例
  // 创建一个虚拟dom, new Vue获得一个根实例Vue。
  const vm = new Vue({
    render(h) {
      return h(Component, {props});
    }
  });

  // 生成真实dom, 执行过$mount后根实例上会有$el
  vm.$mount();

  // 通过$el属性获取真实的dom
  document.body.appendChild(vm.$el);

  // 根组件VueComponent为根实例Vue的$children
  const comp = vm.$children[0];

  // 组件销毁
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    comp.$destroy()
  }

  return comp;
  
}