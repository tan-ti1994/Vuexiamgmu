// 路由模块
// 1. 引入vue
import Vue from 'vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import bianji from '@/views/bianji.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/index.vue'
import xianqingye from '../views/xianqingye.vue'
// 3.use
Vue.use(VueRouter)
// 4创建路由对象,进行路由配置
var router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    }, {
      name: 'default',
      path: '/',
      // 重定向
      redirect: { name: 'Index' }

    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },

    {
      name: 'Register',
      path: '/register',
      component: Register
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
    },
    {
      name: 'bixianqingyeanji',
      path: '/xianqingye/:id',
      component: xianqingye
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
