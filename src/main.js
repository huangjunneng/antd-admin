import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import './registerServiceWorker'

import router from './router'
import axios from 'axios'
import store from './store'

Vue.prototype.$axios = axios
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
