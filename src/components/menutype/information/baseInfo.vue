<template>
  <b-card body-class="mb-0" class="mb-0 text-dark" style="border: none !important">
    <b-row class="">
<!--      <b-col cols="auto">-->
<!--        <div class="restaurant-image bg-dark position-relative" :style="`background: url(${photo})`">-->
<!--        </div>-->
<!--      </b-col>-->
      <b-col cols="auto">
        <div class="font-weight-bold text-dark h5">
          {{value.RestaurantName}}
        </div>
        <div class="mb-2 detail-info">
          {{ value.Cuisine }}
          <span v-if="value.RestaurantType">
            ({{
            value.RestaurantType
            }})
          </span>
        </div>
      </b-col>
      <b-col cols="auto">
        <section class="detail-info">
          <div class="" v-if="value.Address1">
            {{value.Address1 + ', '}}{{value.City + ', ' + value.State + ' ' + value.ZIP}}
          </div>
          <div>
<!--            href="tel: '${this.value.Phone1}'"-->
            <a>
              {{value.Phone1}}
            </a>
          </div>
          <div v-if="value.Phone2">
<!--            href="tel: '${this.value.Phone2}'"-->
            <a>
              {{value.Phone2}}
            </a>
          </div>
        </section>
      </b-col>
      <b-col cols="auto">
        <section class="detail-info">
          <div v-if="value.RestaurantWorkingHoursToday && value.RestaurantWorkingHoursToday.length">
            {{
            value.RestaurantWorkingHoursToday &&
            value.RestaurantWorkingHoursToday[0].StartTime
            }}
            -
            {{
            value.RestaurantWorkingHoursToday &&
            value.RestaurantWorkingHoursToday[0].EndTime
            }}
            <i>(Today)</i>
          </div>
          <div v-if="value.PreparationTime_Minutes">
            Order Preparation Time: Approx.
            {{ value.PreparationTime_Minutes }} min
          </div>
        </section>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import {fileUrl} from "../../../config";

  export default {
    name: "baseInfo",
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
    computed: {
      photo () {
        return fileUrl + this.value.LogoImage
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
