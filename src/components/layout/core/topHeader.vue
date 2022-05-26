<template>
  <header class="main-header text-white position-sticky p-3 d-flex flex-row justify-content-between align-items-center" style="top: 0">
    <div>
      <c-button size="sm" variant="outline-secondary" text="" @submit="toggleMenu">
        <font-awesome-icon icon="bars" class="mx-1 align-middle"/>
      </c-button>
      <span class="h6 px-2 mb-0">Arvan Challenge</span>
      <span v-if="$account" class="px-2">
        Welcome {{$account.username}}
      </span>
    </div>
    <c-button text="Logout" :progressing="progressing" variant="outline-info" size="sm" @submit="logout"/>
  </header>
</template>

<script>
  import CButton from "../../shared/CButton";
  import * as types from '@/store/types'
  import {mapState} from 'vuex'

  export default {
    name: "topHeader",
    components: {CButton},
    data () {
      return {
        progressing: false
      }
    },
    computed: {
      ...mapState(['$account']),
    },
    methods: {
      logout () {
        this.$store.commit(types.LOGOUT)
        this.$router.push('/login')
      },
      toggleMenu () {
        this.$emit('toggleMenu')
      }
    }
  }
</script>

<style scoped>

</style>
