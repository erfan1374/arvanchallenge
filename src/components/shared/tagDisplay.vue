<template>
  <div>
    {{normalizeTagList}}
  </div>
</template>

<script>
  export default {
    name: "tagDisplay",
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      normalizeTagList () {
        return this.value.join(' , ')
      }
    }
  }
</script>

<style scoped>

</style>
