// 服务端入口
// 1. 导航至首屏
// 2. 
import { createApp } from './main'

export default context => {

  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 设置服务器端 router 的首屏位置
    router.push(context.url)

    // 导航可能是异步组件，等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 1. 获取匹配的组件
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 遍历这些组件，看看有没有asyncData选项
      // 对所有匹配的路由组件调用asyncData()
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({route: router.currentRoute, store})
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。 
        context.state = store.state
         // Promise 应该 resolve 应用程序实例，以便它可以渲染
         // 就绪后可能有异步数据请求
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}