<template>
  <div>
    <pub v-if="isPublic"></pub>
    <cp v-else/>
  </div>
</template>

<script>
  import pub from './public'
  import cp from "./cp";
  export default {
    name: "layout",
    components: {pub, cp},
    computed: {
      isPublic () {
        return this.$route.meta && this.$route.meta.public
      }
    },
    metaInfo () {
      return {
        title: this.$route.meta && this.$route.meta.title
      }
    }
  }
</script>

