<template>
  <div class="text-center">
    <h4 class="mt-5">
      Oops we have a problem !!!
    </h4>
    <p>
      the page you are looking for is temporary unavailable.
    </p>
    <c-button text="Retry to load page" @submit="retryLoadPage" variant="danger"/>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import CButton from "./CButton";
  export default {
    name: "page500",
    components: {CButton},
    methods: {
      retryLoadPage () {
        this.$store.commit(types.SET_OFFLINE, false)
      }
    }
  }
</script>

<style scoped>

</style>
