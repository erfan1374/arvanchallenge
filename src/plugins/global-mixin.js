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
          // console.log(err.data.message = 'missing authorization credentials')
          console.log(err)
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
