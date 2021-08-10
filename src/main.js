import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/element-variables.scss'
import './assets/css/public.css'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import '@/permission'
import store from './store'
import api from './api'
// import i18n from '@/language'

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //挂载在原型，组件内使用直接this.$echarts调用


Vue.prototype.$http = api;
Vue.prototype.$baseUrl = process.env.BASE_URL;
Vue.use(ElementUI,{
  size: 'medium' // set element-ui size  default medium small mini Cookies.get('size') || 'medium'
})

Vue.config.productionTip = false
new Vue({
  // i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
