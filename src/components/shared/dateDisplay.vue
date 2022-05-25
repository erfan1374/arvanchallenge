<template>
  <div>
    {{normalizeDate}}
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "dateDisplay",
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    computed: {
      normalizeDate () {
        if (!this.value) return ''
        return moment(this.value).format('MMM D , YYYY')
      }
    }
  }
</script>

<style scoped>

</style>
