import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Api from './plugins/api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas as solid } from '@fortawesome/free-solid-svg-icons'
import VeeValidate from 'vee-validate'

// Make BootstrapVue available throughout your project
library.add(solid)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import router from './router'
import App from './App'
import Config from './plugins/config'

import Meta from 'vue-meta'
import Mixin from './plugins/global-mixin'
import store from './store'
import * as types from './store/types'
import {get as getData} from '@/lib/local-storage'

Vue.config.productionTip = false
Vue.use(Api)
Vue.use(Meta)
Vue.use(Mixin)
Vue.use(Config)
Vue.use(VeeValidate, {fieldsBagName: 'veeFields'})

let account = getData(types.ACCOUNT_COOKIE)
if (account) {
  store.commit(types.SET_ACCOUNT, account)
}


// router.beforeEach((to, from, next) => {
//   next('/ext/billPay')
// })
//
// function hasQueryParams(route) {
//   return !!Object.keys(route.query).length
// }
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
