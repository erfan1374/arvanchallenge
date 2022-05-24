<template>
  <b-container fluid class="px-0 position-relative">
    <deactive-food v-if="!value.IsAvailable" class="position-absolute p-2 font-weight-bold" style="top: 20px; right: 20px"/>
    <b-row class="mb-4 h-100">
      <b-col class="h-100">
        <div class="d-flex flex-row justify-content-between">
          <section class="d-flex">
            <div @click="photoModal = true" class="position-relative food-image-item" style="width: 140px">
              <div v-if="value.IsNew" class="new-tag text-white bold-text">
                New
              </div>
              <b-img @click="photoModal = true" style="cursor: pointer" :src="getImage(value.Photo1)" height="100" width="140"/>
            </div>
            <div class="px-3">
              <p class="mb-0 cursor-pointer bold-text" @click="openEdit">{{value.Name}}
              </p>
              <p v-if="value.Name_SecondLang && AllowSecondLang" @click="openEdit" class="mb-0 font-weight-bold cursor-pointer">{{value.Name_SecondLang}}</p>
              <p v-if="value.Price > 0" class="mb-0 d-flex cursor-pointer" @click="openEdit">
                <currency-display :id="`${value.ID}_food`" class="bold-text" v-model="value.Price" style="cursor: pointer"/>
                <span v-if="isMultiPrice(value)"
                  style="cursor:pointer;"
                >
                  +
                </span>

                <price-information v-if="isMultiPrice(value)" :target="`${value.ID}_food`" :food="value"/>


                <span class="font-weight-normal text-nowrap mx-3" v-if="showCalorie(value).hasCalorie">
                  {{showCalorie(value).minCalorie}}{{showCalorie(value).multiCalorie ? '+' : ''}}
                  Cal
                </span>
                <template name="options">
                  <span class="d-none d-lg-block bold-text" style="margin-left: 10px;">
                    <item-options :value="getOptions"/>
                  </span>
                  <span class="small font-weight-normal ml-2" style="font-size: 12px; margin-top: 3px" v-if="value.ABV && value.ABV >= 0">ABV: {{value.ABV}}%</span>
                </template>
              </p>
              <p class="mb-0 small d-none d-lg-block" style="font-style: italic">
                {{value.Desc}}
              </p>
            </div>
          </section>
        </div>
      </b-col>
    </b-row>
    <div class="d-block d-lg-none">
      <div class="bold-text mb-2">
        <item-options :value="getOptions"/>
      </div>
      <p class="mb-2 small" style="font-style: italic">
        {{value.Desc}}
      </p>
    </div>
    <b-row>
      <b-col cols="12">
        <div class="mb-2" v-if="value.ModifierCategories && value.ModifierCategories.length">
          <Mlabel title="Modifiers">
            <span style="white-space: normal;word-wrap: break-word;">
              {{getModifierName(value)}}
            </span>
          </Mlabel>
        </div>
      </b-col>
    </b-row>
    <show-image v-model="photoModal" :item="value"/>
  </b-container>
</template>

<script>
  import Mlabel from "../../../shared/Mlabel";
  import CurrencyDisplay from "../../../shared/currencyDisplay";
  import {fileUrl} from "../../../../config";
  import DeactiveFood from "./deactiveFood";
  import ItemOptions from "./itemOptions";
  import ShowImage from "./showImage";
  import PriceInformation from "./priceInformation";
  export default {
    name: "foodItem",
    components: {
      PriceInformation,
      ShowImage,
      ItemOptions, DeactiveFood, CurrencyDisplay, Mlabel},
    props: {
      value: {required: true, type: Object},
      edibleType: {
        required: true,
        type: String
      },
      category: {
        required: true,
        type: Object
      },
      AllowSecondLang: {
        required: true,
        type: Boolean,
        default: false
      },
      foods: {
        required: true,
        type: Array,
        default: () => []
      },
      kds: {
        required: true,
        type: String,
        default: ''
      },
      display: {
        required: true,
        type: String,
        default: ''
      }
    },
    data () {
      return {
        deleteModal: false,
        deleteLoading: false,
        editModal: false,
        photoModal: false,
        CreditName: false,
        CopyrightName: false,
        progressing: false,
        currentPhotoItemModal: false
      }
    },
    computed: {
      getOptions () {
        const options = [
          {text: 'Vegan', has: this.value.Vegan, class: 'greenText'},
          {text: 'Vegan Upon Request', has: this.value.VeganRequest, class: 'greenText'},
          {text: 'Veggie', has: this.value.Vegeterian, class: 'greenText'},
          {text: 'Veggie Upon Request', has: this.value.VegeterianRequest, class: 'greenText'},
          {text: 'Hot/Spicy', has: this.value.Hot, class: 'greenText'},
          {text: 'Hot/Spicy Upon Request', has: this.value.HotRequest, class: 'greenText'},
          {text: 'Gluten Free', has: this.value.GlutenFree, class: 'greenText'},
          {text: 'Gluten Free Upon Request', has: this.value.GlutenFreeRequest, class: 'greenText'},
          {text: 'Halal', has: this.value.Halal, class: 'greenText'},
          {text: 'Kosher', has: this.value.Kosher, class: 'greenText'},
          {text: 'Alcoholic', has: this.value.Alcoholic, class: 'text-danger'},
        ]
        const withUpon = options.filter(item => item.text.includes('Upon Request') && item.has)
        const withOutUpon = options.filter(item => !item.text.includes('Upon Request') && item.has)
        const splitUpon = withUpon.map(item => {
          return {
            item: item.text.replace(' Upon Request', ''),
            class: item.class
          }
        })
        const finalOptions = {
          withUpon: splitUpon,
          withOutUpon
        }
        return finalOptions
      },
      getPhoto () {
        return fileUrl + `/UserUpload/User_${localStorage.getItem('restaurantProfile')}/` + this.value.Photo1
      },
      priceCommentsList () {
        return [
          {text: 'Price', value: this.value.PriceComment},
          {text: 'Price', value: this.value.Price1Comment},
          {text: 'Price', value: this.value.Price2Comment},
          {text: 'Price', value: this.value.Price3Comment},
          {text: 'Price', value: this.value.Price4Comment},
        ].filter(item => item.value)
      },
      ShowPhotoFor: {
        get () {
          return this.priceCommentsList[0].value
        },
        set(val) {
          // this.$emit('input', val)
          console.log(val)
          // this.test = val
        }
      }
    },
    methods: {
      getModifierName (value) {
        return value.ModifierCategories.map(item => item.ModifierCategory).join(', ')
      },
      getImage (photo) {
        if (photo) {
          return fileUrl + `/UserUpload/User_${localStorage.getItem('restaurantProfile')}/` + photo
        } else {
          return fileUrl + '/Images/thumb_empty.png'
        }
      },
      isMultiPrice (food) {
        const prices = [food.Price, food.Price1, food.Price2, food.Price3, food.Price4]
        return prices.filter(item => item >= 0).length > 1 ? true : false
      },
      showCalorie (food) {
        let colories = [food.Calories, food.Calories1, food.Calories2, food.Calories3, food.Calories4]
        let nonZiroColories = colories.filter(i => i > 0)
        return {
          hasCalorie: colories.filter(i => i > 0).length ? true : false,
          minCalorie: Math.min(...nonZiroColories),
          multiCalorie: colories.filter(i => i > 0).length > 1 ? true : false
        }
      },
      openEdit () {
        this.editModal = true
      }
    }
  }
</script>
<style scoped>
  .greenText{
    color: #388e3c
  }
  .food-image-item{
    cursor: pointer;
  }
  .new-tag{
    background-image: none;
    position: absolute;
    position: absolute;
    left: -17px;
    top: 5px;
    transform: rotate(-45deg);
    height: 15px;
    z-index: 1;
    font-size: 0.90em;
    border-bottom: 21px solid red;
    border-left: 21px solid transparent;
    border-right: 21px solid transparent;
  }
</style>

