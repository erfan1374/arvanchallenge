<template>
  <div>
    <top-header @toggleMenu="showSideBar = !showSideBar"/>
    <div class="d-flex">
      <sidebar :items="items" :class="showSideBar ? 'open-side' : 'close-side'"/>
      <main class="p-3 w-100">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import TopHeader from "./core/topHeader";
  import Sidebar from "./core/sidebar";
  import _nav from "../../_nav";
  export default {
    name: "cp",
    components: {Sidebar, TopHeader},
    data () {
      return {
        items: _nav,
        showSideBar: true
      }
    },
    created() {
      const account = this.$store.state.$account
      if (!account) {
        let path = '/login'
        if (this.$route.path !== this.$config.homeUrl && this.$route.path !== "/login") {
          path = `/login?go=${this.$route.path}`
        }
        this.$router.replace(path)
      }
    }
  }
</script>

<style scoped>

</style>
