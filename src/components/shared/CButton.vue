<template>
  <b-btn v-bind="$attrs" :disabled="progressing" @click="submit">
    {{text}}
    <font-awesome-icon v-if="progressing" spin icon="circle-notch" class="align-middle"/>
  </b-btn>
</template>

<script>
  export default {
    name: "CButton",
    props: {
      text: {
        type: String,
        default: 'Submit'
      },
      progressing: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      submit () {
        this.$emit('submit')
      }
    }
  }
</script>

<style scoped>

</style>
