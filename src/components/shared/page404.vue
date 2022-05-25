<template>
  <div>
    <div class="d-flex flex-row justify-content-center align-items-center pt-5 mb-3">
      <b-img src="/img/404.png"/>
    </div>
    <div class="text-center">
      <c-button text="Back to dashboard" variant="success" @submit="back"/>
    </div>
  </div>
</template>

<script>
  import CButton from "./CButton";
  export default {
    name: "page404",
    components: {CButton},
    methods: {
      back () {
        this.$router.push('/dashboard')
      }
    }
  }
</script>

<style scoped>

</style>
