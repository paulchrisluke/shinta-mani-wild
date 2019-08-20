import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.gridBreakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
