import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// 加上混入：只在客户端执行，让他们判断当前组件是否存在asyncData
// 客户端数据预取的第二种方式
// 2. 匹配要渲染的视图后，再获取数据 第一种方法见entry-server.js
// 此策略将客户端数据预取逻辑，放在视图组件的beforeMount函数中，当路由导航被触发时，可以立即切换视图。因此应用程序具有更快的响应速度
// Vue.mixin({
//   beforeMount() {
//     const { asyncData } = this.$options; 
//     if (asyncData) {
//     // 将获取数据操作分配给 promise
//     // 以便在组件中，我们可以在数据准备就绪后
//     // 通过运行 `this.dataPromise.then(...)` 来执行其他任务 
//     this.dataPromise = asyncData({
//       route: this.$route,
//       store: this.$store
//     })
//     }
//   }
// })

export function createApp(context) {
  // 创建 router,store 实例
  const router = createRouter();
  // 创建 store 实例
  const store = createStore();

  // 同步路由状态（route state）到store
  sync(store, router);
  
  // 创建Vue实例
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App),
  })

  return {app, router, store}
}

