import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    $account: null,
    $offline: false,
  },
  actions,
  mutations,
})
