import Vue from 'vue';

export default function create(Component, props){

  // 使用Vue.extend构造器创建一个子类构造函数
  const Ctor = Vue.extend(Component);

  // new Ctor()直接生成VueComponent
  const comp = new Ctor({
    propsData: props
  });

  // 生成真实dom,只有执行过$mount才会有$el
  comp.$mount();
  
  // 通过$el属性获取真实的dom
  document.body.appendChild(comp.$el);

  comp.remove = () => {
    // 组件销毁
    document.body.removeChild(comp.$el);
    comp.$destroy()
  }

  return comp;
}