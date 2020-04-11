// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  // 每个用户之间应该是独立的实例，这样数据才不会污染
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'About',
        component: () => import('@/components/About'),
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/components/Detail'),
      },
    ]
  })
}