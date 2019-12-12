// 路由模块
// 1. 引入vue
import Vue from 'Vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
// 3.use
Vue.use(VueRouter)
// 4创建路由对象,进行路由配置
var router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: 'Login',
      component: Login
    }
  ]
})
export default router
