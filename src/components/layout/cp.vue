<template>
  <div>
    <top-header/>
    <div class="d-flex">
      <sidebar :items="items"/>
      <main class="p-2">
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
        items: _nav
      }
    }
  }
</script>

<style scoped>

</style>
