const globalOptions = {
  showProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  position: 'rightTop',
  bodyMaxLength: 500,
  titleMaxLength: 100
}
const errorMsgOptions = {
  timeout: 3000,
  ...globalOptions
}

const successMsgOptions = {
  timeout: 1500,
  ...globalOptions
}
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        $showSuccess(body, title) {
          this.$snotify.success(body, title, successMsgOptions)
        },
        $showError(body, title) {
          this.$snotify.error(body, title, errorMsgOptions)
        },
        $success (successMessage, path) {
          this.$showSuccess(successMessage)
          this.progressing = false
          this.$goTo(path)
        },
        $goTo(path) {
          if (path) this.$router.push({path})
        },
        $fail (err) {
          // console.log(err.data.message = 'missing authorization credentials')
          // console.log(err)
          this.progressing = false
          this.$gloabalErrorHandler(err)
        },
        $gloabalErrorHandler(err) {
          if (err.data.errors) {
            const object = err.data.errors
            for(let property in object) {
              this.$showError(`${property}  ${object[property]}`)
            }
          } else if (err.data.message){
            this.$showError(err.data.message)
          }
        }
      }
    })
  }
}
