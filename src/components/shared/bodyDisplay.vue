<template>
  <div>
    {{bodySummary}}
  </div>
</template>

<script>
  export default {
    name: "bodyDisplay",
    props: {
      value: {
        type: String,
        default: ''
      },
      limitChars: {
        type: [Number, String],
        default: 20
      }
    },
    computed: {
      bodySummary () {
        if (!this.value) return ''
        else if (this.value.length < this.limitChars) return this.value
        return this.value.substring(0, this.limitChars) + ' ...'
      }
    }
  }
</script>

<style scoped>

</style>
