import View from './view';
import Link from './link';
/**
 *  router的实现目标：
 * 
 *  1. 创建VueRouter类和install方法
 *  2. 实现两个全局组件：router-link用于跳转，router-view用于匹配组件内容
 *  3. 监控url变化：监听hashchange或popstate事件
 *  4. 响应最新的url: 创建一个响应式的属性current，当它改变时获取对应组件并显示
 */

let Vue; 
class VueRouter {
  // 实例化VueRouter时，将路由表的配置信息传入
  constructor(options = {}) {
    this.$options = options;
    // 当前数据定义响应式, 如果默认值为“/”，屏幕会出现闪屏
    // Vue.util.defineReactive(this, 'current', '/');

    // 定义响应式的属性current
    // const initial = window.location.hash.slice(1) || '/';
    // Vue.util.defineReactive(this, 'current', initial);

    this.current = window.location.hash.slice(1) || '/';
    // 实现路由表的children，需有有一个响应式match[]
    Vue.util.defineReactive(this, 'matched', []);
    this.match();

    // 监听hashChange事件
    window.addEventListener('hashchange', this.onHashChange.bind(this)); // bind(this)是防止onHashChange内部的this指向改变
    // 第一次页面加载的时候也需要监听事件
    window.addEventListener('load', this.onHashChange.bind(this));

    // 提前处理路由表，以空间换时间, 有了children之后，需要将路由信息放在matched[]中，下面代码废弃
    // this.sourceMap = {};
    // options.routes.forEach(route=> {
    //   this.sourceMap[route.path] = route;
    // })
  }
  onHashChange() {
    // current就是#后面的字符串 /about
    this.current = window.location.hash.slice(1);
    // hashChange改变需要更新matched[]
    this.matched = [];
    this.match();
  }
  match(routes = this.$options.routes) {
    for(let route of routes) {
      // 默认‘/’没有子路由
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route);
        return
      }
      if(route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route);
        if (route.children) {
          // 递归调用match
          this.match(route.children)
        }
        return
      }
    }
  }
}

// 插件： 实现install方法，并注册$router
VueRouter.install = function(_vue) {
  Vue = _vue; // 引用构造函数，VueRouter中要使用
  // 为什么运用混入，因为use()在前，Router实例创建在后，而install又需要该实例
  // 任务1: 挂载$router
  Vue.mixin({
    beforeCreate() {
      // 只有根组件拥有router选项
      if(this.$options.router) {
        // this.$router是一个VueRouter实例
        Vue.prototype.$router = this.$options.router; // 这里的this.$options是根实例的配置信息 new Vue({router})
      }
    },
  });
  // 任务2: 实现两个全局组件View, Link
  Vue.component('routerView', View);
  Vue.component('routerLink', Link);

};
export default VueRouter;