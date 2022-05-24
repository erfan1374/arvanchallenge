<template>
  <b-container fluid class="px-0">
    <b-row>
      <b-col cols="12">
        <div class="w-100 bg-white conver-photo">
          <b-container fluid>
            <b-row class="justify-content-center">
              <b-col cols="12" class="mb-3 mb-md-0">
                <base-info :value="value" @updateImage="updateImage" @deleteImage="deleteImage" :progressing="progressing" ref="baseInfo"/>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import baseInfo from "./baseInfo";
  export default {
    name: "index",
    components: {
      baseInfo
    },
    props: {
      value: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    data () {
      return {
        progressing: false
      }
    },
    computed: {
      coverPhotoUrl () {
        return this.$config.files.baseurlimage + this.value.CoverPhoto
      }
    },
    methods: {
      updateImage ({image, fileName}) {
        const splitedImage = image.split(',')[1]
        const model = {
          UserID: localStorage.getItem("userID"),
          RestaurantID: this.$store.state.selectedRestaurantId,
          uploadLogoStr: splitedImage,
          FileName: fileName
        }
        this.progressing = true
        return this.$api.getRestaurant.UploadLogoPhoto(model).then((res) => {
          this.progressing = false
          if (res.success) {
            this.$emit('refresh')
            this.$refs.baseInfo.closeModal()
          } else {
            this.$showError(res.message)
          }
        }).catch(() => {
          this.progressing = false
          this.$showError('error in upload image')
        })
      },
      deleteImage () {
        const model = {
          UserID: localStorage.getItem("userID"),
          RestaurantID: this.$store.state.selectedRestaurantId,
          FolderID: this.value.FolderId,
        };
        this.progressing = true
        return this.$api.getRestaurant.DeleteLogoImage(model).then((res) => {
          this.progressing = false
          if (res.success) {
            this.$emit('refresh')
            this.$refs.baseInfo.closeModal()
          } else {
            this.$showError(res.message)
          }
        })
      },
      updateCover ({image, fileName}) {
        const splitedImage = image.split(',')[1]
        const model = {
          UserID: localStorage.getItem("userID"),
          RestaurantID: this.$store.state.selectedRestaurantId,
          uploadCoverPhotoStr: splitedImage,
          FileName: fileName
        }
        this.progressing = true
        return this.$api.getRestaurant.UploadCoverPhoto(model).then((res) => {
          this.progressing = false
          if (res.success) {
            this.$emit('refresh')
            this.$refs.coverImage.closeModal()
          } else {
            this.$showError(res.message)
          }
        }).catch(() => {
          this.progressing = false
          this.$showError('error in upload image')
        })
      },
      deleteCover () {
        const model = {
          UserID: localStorage.getItem("userID"),
          RestaurantID: this.$store.state.selectedRestaurantId,
          FolderID: this.value.FolderId,
        };
        this.progressing = true
        return this.$api.getRestaurant.DeleteCoverImage(model).then((res) => {
          this.progressing = false
          if (res.success) {
            this.$emit('refresh')
            this.$refs.coverImage.closeModal()
          } else {
            this.$showError(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .conver-photo{
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
</style>
