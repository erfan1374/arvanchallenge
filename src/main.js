import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Api from './plugins/api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas as solid } from '@fortawesome/free-solid-svg-icons'
// Make BootstrapVue available throughout your project
library.add(solid)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import router from './router'
import App from './App'
import Meta from 'vue-meta'

import { StripePlugin } from '@vue-stripe/vue-stripe';
import {stripeToken} from "./config";
const options = {
  pk: stripeToken
};
Vue.config.productionTip = false
Vue.use(StripePlugin, options);
Vue.use(Api)
Vue.use(Meta)

// router.beforeEach((to, from, next) => {
//   next('/ext/billPay')
// })
//
// function hasQueryParams(route) {
//   return !!Object.keys(route.query).length
// }
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
