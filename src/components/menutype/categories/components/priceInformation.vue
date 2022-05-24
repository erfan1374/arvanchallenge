<template>
  <b-popover custom-class="custom-popover small" :target="target" triggers="hover" placement="Bottom">
    <b-table-simple class="table-sm mb-0" borderless no-border-collapse>
      <b-tbody>
        <b-tr v-for="(item, index) in getItems" :key="`item${index}`">
<!--          <b-td></b-td>-->
          <b-td class="text-success">
            <span v-if="item.comment != '-1'">
              {{item.comment}}
            </span>
          </b-td>
          <b-td class="text-center text-success">
            <span v-if="item.price > 0">
              <currency-display :value="item.price"/>
            </span>
          </b-td>
          <b-td class="text-center text-danger">
            <span v-if="item.calorie > 0">{{item.calorie}} Cal</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-popover>
</template>

<script>
  import CurrencyDisplay from "../../../shared/currencyDisplay";
  export default {
    name: "priceInformation",
    components: {CurrencyDisplay},
    props: {
      food: {
        required: true,
        default: () => {}
      },
      target: {
        required: true,
        type: String
      }
    },
    computed: {
      getItems () {
        const items = [
          {price: this.food.Price, comment: this.food.PriceComment, calorie: this.food.Calories},
          {price: this.food.Price1, comment: this.food.Price1Comment, calorie: this.food.Calories1},
          {price: this.food.Price2, comment: this.food.Price2Comment, calorie: this.food.Calories2},
          {price: this.food.Price3, comment: this.food.Price3Comment, calorie: this.food.Calories3},
          {price: this.food.Price4, comment: this.food.Price4Comment, calorie: this.food.Calories4},
        ]
        return items.filter(item => item.price && item.price > 0)
      }
    }
  }
</script>

<style scoped>
  .custom-popover{
    max-width: unset !important;
  }
</style>
