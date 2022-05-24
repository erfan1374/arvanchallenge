<template>
  <c-modal v-model="modal" :tag="false" size="lg" hide-footer hide-header>
    <template>
      <div class="text-center mb-3" style="color: #FF6F00; font-weight: bold">
        {{item.Name}}
      </div>
      <div v-if="item.Photo1">
        <b-img fluid-grow :src="getPhoto"/>
      </div>
      <div class="text-center font-weight-bold d-flex align-items-center justify-content-center" style="background: #c8ced3!important;height: 300px; color: #a7a7a7" v-else>
        No Photo Available
      </div>
    </template>
  </c-modal>
</template>

<script>
  import CModal from "../../../shared/Cmodal";
  import {fileUrl} from "../../../../config";

  export default {
    name: "showImage",
    components: {CModal},
    props: {
      value: {
        required: true,
        type: Boolean,
        default: false
      },
      item: {
        required: true,
        default: () => {}
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
      },
      getPhoto () {
        return fileUrl + `/UserUpload/User_${localStorage.getItem('restaurantProfile')}/` + this.item.Photo1
      }
    }
  }
</script>

<style scoped>

</style>
