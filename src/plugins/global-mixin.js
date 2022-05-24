export default {
  install(Vue) {
    Vue.mixin({
      data () {
        return {
          progressing: false
        }
      },
      methods: {
        $fail (err) {
          this.progressing = false
          console.log('run fail in global mixin : ' + err)
        },
        // $showSuccess (variant = null) {
        //   this.$bvToast.toast('Toast body content', {
        //     title: `Variant ${variant || 'default'}`,
        //     variant: variant,
        //     solid: true
        //   })
        // }
      }
    })
  }
}
