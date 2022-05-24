<template>
  <c-modal
    v-model="modal"
    size="md"
    centered
    :tag="false"
    title="Delete Category Confirmation"
    confirm-label="Yes, Delete Category"
    cancel-label="No, Never mind"
    :progressing="progressing"
    @submit="submit"
    >
    <template>
      Are you sure you want to delete {{category.CategoryDESC}} category with all its item?
    </template>
  </c-modal>
</template>

<script>
  import CModal from "../../../shared/Cmodal";
  export default {
    name: "DeleteConfirmation",
    components: {CModal},
    props: {
      progressing: {
        type: Boolean,
        default: false
      },
      value: {
        required: true
      },
      category: {
        required: true,
        type: Object,
        default: {}
      }
    },
    computed: {
      modal: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      submit () {
        this.$emit('refresh')
      }
    }
  }
</script>

<style scoped>

</style>
