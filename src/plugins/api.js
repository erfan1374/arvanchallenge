import api from '@/restApi'

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
      get () {
        return api(this.$store)
      }
    })
  }
}
