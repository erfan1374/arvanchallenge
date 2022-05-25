<template>
  <header class="main-header text-white p-3 d-flex flex-row justify-content-between align-items-center">
    <div>
      <span class="h6 mb-0">Arvan Challenge</span>
      <span class="px-2">Current user name</span>
    </div>
    <c-button text="Logout" :progressing="progressing" variant="outline-info" size="sm" @submit="logout"/>
  </header>
</template>

<script>
  import CButton from "../../shared/CButton";
  import * as types from '@/store/types'
  export default {
    name: "topHeader",
    components: {CButton},
    data () {
      return {
        progressing: false
      }
    },
    methods: {
      logout () {
        this.$store.commit(types.LOGOUT)
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
