<template>
  <div>
    <b-btn block variant="dark" @click="modal = true">
      <font-awesome-icon icon="camera" class="align-middle mx-1"/>
      Change cover photo
    </b-btn>
    <upload-photo
      :title="value.CoverPhoto ? 'Cover Photo Change' : 'Cover Photo Upload'"
      second-content="Resolution 1200 by 300 pixel looks best"
      v-model="modal"
      :has-photo="!!value.CoverPhoto"
      :ratio="4/1"
      @upload="upload"
      @delete="deletePhoto"
      :progressing="progressing"/>
  </div>
</template>

<script>
  import UploadPhoto from "../../../shared/UploadPhoto";
  export default {
    name: "coverImage",
    components: {UploadPhoto},
    props: {
      value: {
        required: true,
        type: Object,
        default: () => {}
      },
      progressing: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        modal: false
      }
    },
    methods: {
      upload (data) {
        this.$emit('updateImage', data)
      },
      deletePhoto () {
        this.$emit('deleteImage')
      },
      closeModal () {
        this.modal = false
      }
    }
  }
</script>

<style scoped>

</style>
