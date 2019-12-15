// 路由模块
// 1. 引入vue
import Vue from 'vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import bianji from '@/views/bianji.vue'
// 3.use
Vue.use(VueRouter)
// 4创建路由对象,进行路由配置
var router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'bianji',
      path: '/edit_profile/:id',
      component: bianji
    }
  ]
})
// 添加导航守卫
// to:目标路由对象
router.beforeEach((to, from, next) => {
  // 只有访问那些需要授权的api的时候，才需要进行守卫
  if (to.path.indexOf('/personal/') === 0) {
    // 判断当前用户是否登陆过
    let token = localStorage.getItem('heima-token')
    if (token) { // 如果有token数据，说明登陆过了
      next()
    } else { // 否则，没有登陆则重新云登陆--重定向
      next({ name: 'login' })
    }
  } else { // 如果访问不需要授权的页面，则自由访问
    next()
  }
})

// 暴露
export default router
