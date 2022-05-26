<template>
  <b-btn v-bind="$attrs" :disabled="loading" @click="submit">
    {{text}}
    <slot></slot>
    <font-awesome-icon v-if="loading" spin icon="circle-notch" class="align-middle"/>
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
      loading: {
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
