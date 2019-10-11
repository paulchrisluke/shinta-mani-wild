import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/connection/init'
import './mixins.global'
import './filters.global'
import './directives.global'
// @ts-ignore
import VueContentPlaceholders from 'vue-content-placeholders'
import 'vue-content-placeholders/src/styles.scss'

Vue.config.productionTip = false
Vue.prototype.gridBreakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1920 }
// NOTE: order matters
Vue.prototype.gridBreakpointsArray = [576, 768, 992, 1200, 1920]
// @ts-ignore
Vue.use(VueContentPlaceholders)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
