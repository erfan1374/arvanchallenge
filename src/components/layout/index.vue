<template>
  <page500 v-if="$offline"/>
  <div v-else>
    <notifications/>
    <pub v-if="isPublic"></pub>
    <cp v-else/>
  </div>
</template>

<script>
  import pub from './public'
  import cp from "./cp";
  import Notifications from "./core/notification";
  import {mapState} from 'vuex'
  import Page500 from "../shared/page500";
  export default {
    name: "layout",
    components: {Page500, Notifications, pub, cp},
    computed: {
      ...mapState(['$offline', '$account']),
      isPublic () {
        return this.$route.meta && this.$route.meta.public
      }
    },
    watch: {
      '$account': {
        handler: function (val) {
          if (!val) {
            let path = '/login'
            if (this.$route.path !== this.$config.homeUrl && this.$route.path !== "/login") {
              path = `/login?go=${this.$route.path}`
            }
            this.$router.replace(path)
          }
        },
        deep: true
      }
    },
    metaInfo () {
      return {
        title: this.$route.meta && this.$route.meta.title
      }
    }
  }
</script>

