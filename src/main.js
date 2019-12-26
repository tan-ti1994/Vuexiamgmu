import Vue from 'vue'
import App from './App.vue'
import '@/styles/reste.css'
import {
  Toast,
  Uploader,
  Dialog,
  Field,
  Picker,
  Icon,
  Tab,
  Tabs,
  List,
  PullRefresh
  , Search } from 'vant'

import router from '@/router/index'

// 将会在Vue实例上挂载成员，以$开头，如下面的use,将来可以this.$toast来使用
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Search)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
