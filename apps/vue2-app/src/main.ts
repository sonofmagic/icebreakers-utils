import router from '@/router'
import elTableSticky from '@icebreakers/el-table-sticky-vue2'
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
// import elTableSticky from './directives'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
// production mode
// import '@icebreakers/el-table-sticky-vue2/index.css'
// import elTableSticky from '../dist/el-table-sticky.umd.js'

Vue.use(ElementUI)
Vue.use(elTableSticky)
Vue.config.productionTip = false
Vue.prototype.$fullRouter = router
Vue.prototype.$homeRoute = router.options.routes?.find(route => route.name === 'home')

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
