<template>
  <b-container fluid class="mt-2">
    <b-overlay :show="initializing" rounded="sm">
      <information
        class="mb-3"
        :value="headerData"
        @refresh="getProfile"
      />
    </b-overlay>
    <menuTypes
      :items="allMenuTypes"
      :edible-type="EdibleType"
      @refreshMenuType="(EdibleType) => GetMenuTypes(EdibleType)"
      :progressing="menuTypeLoading"
      :has-category="false"
      :profile="profile"
      @getCategories="getCategories"
    />
    <categories
      v-if="allMenuTypes.length"
      ref="categories"
      :items="allCategories"
      :kds-list="KDSs"
      :print-station-list="PrintStations"
      :current-menu-type="currentMenuType"
      :edible-type="EdibleType"
      @getCategories="getCategories"
      :AllowSecondLang="AllowSecondLang"
      :first-cat="firstCat"
    />
    <footer class="text-center py-2">
      Powered by MENUPOLY, Inc. © 2022 All Rights Reserved.
    </footer>
  </b-container>
</template>

<script>
  import menuTypes from './menuTypes'
  import Categories from "./categories/index";
  import information from './information'

  export default {
    name: "index",
    components: {
      menuTypes,
      Categories,
      information
    },
    props: ['id'],
    data () {
      return {
        attrs: {},
        headerData: {},
        initializing: true,
        allMenuTypes: [],
        EdibleType: 'Food',
        menuTypeLoading: false,
        headerLoading: false,
        AllowSecondLang: false,
        allCategories: [],
        profile: {},
        KDSs: [],
        PrintStations: [],
        firstCat: ''
      }
    },

    mounted() {
      Promise.all([
        this.GetMenuTypes(this.EdibleType),
        this.getProfile(),
        this.getRestaurantId()
      ]).then(() => {

      })
    },
    computed: {
      currentMenuType () {
        return this.allMenuTypes.find(item => item.selected)
      }
    },
    methods: {
      getProfile () {
        const model = {
          RestaurantID: this.id,
        }
        this.initializing = true
        return this.$api.publicApi.GetRestaurantInfo(model).then(res => {
          this.initializing = false
          if (res.success) {
            this.profile = res.results
            this.headerData = res.results
          }
        })
      },
      GetMenuTypes (EdibleType) {
        let model = {
          RestaurantID: this.id,
          EdibleType
        };
        this.EdibleType = EdibleType
        this.menuTypeLoading = true
        return this.$api.menuType.list(model).then((res) => {
          this.menuTypeLoading = false
          this.allMenuTypes = res.data.menuTypes.filter(item => item.IsVisible && item.CanMenuTypeBeShown)
          if (this.allMenuTypes.length) {
            this.allMenuTypes.forEach((item, index) => {
              if (index === 0) {
                this.$set(item, 'selected', true)
                this.getCategories(item)
              } else {
                this.$set(item, 'selected', false)
              }
            })
          } else {
            this.allCategories = []
          }
        }).catch((err => {
          this.allMenuTypes = []
          this.allCategories = []
          console.log(err)
        }))
      },

      getCategories (menuType) {
        const {MenuTypeID} = menuType
        const params = {
          MenuTypeID,
          EdibleType: this.EdibleType,
          RestaurantID: this.id,
          UserID: 498
        }
        return this.$api.category.GetCategoryWithFoodDrink(params).then(res => {
          res.data.categories.forEach((item, index) => {
            item.categoryClass = this.EdibleType === 'Food' ? 'food-category' : 'drink-category'
            this.$set(item, 'open', true)
            item.foods = item.FoodDrinks
            if (index === 0) {
              this.firstCat = item.CategoryID
            }
          })
          this.allCategories = res.data.categories
        }).catch(() => {

        })
      },
      getRestaurantId () {
        const model = {
          RestaurantID: this.id
        }
        return this.$api.publicApi.GetRestaurantRestauranteurID(model).then(res => {
          if (res.success) {
            localStorage.setItem('restaurantProfile', res.results)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .category-box{
  .category-title{
  .menu-type-badge{
    background: #FF6F00;
    color: #fff;
    font-style: italic;
  &:before{
     content: "";
     display: block;
     position: absolute;
     top: -4px;
     width: 0;
     height: 0;
     border: 4px solid transparent;
     border-bottom-color: #aa4900;
     border-left-width: 0;
     right: -4px;
   }
  }
  }
  .food-category{
    background: #FFB300;
  }
  .drink-category{
    background: #FF7143;
  }
  .category-body{
    background: #fff;
  }
  }
  .deactive-food{
    background: #e4e4e4;
  }

  .not-available-tag{
    transform: rotate(25deg);
    border: 2px solid #b71c1c !important;
    color: #b71c1c !important;
  }
  .hidden-food{
    background: rgba(231, 76, 60, 0.2);
  }

</style>
