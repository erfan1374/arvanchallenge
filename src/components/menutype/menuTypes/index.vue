<template>
  <div>
    <b-card no-body class="mb-3">
      <b-card-header>
        <b-container fluid class="px-0">
          <b-row class="align-items-center">
            <b-col class="mb-3 mb-md-0" cols="12" offset-md="4" md="4">
              <div class="h5 mb-0 w-100 font-weight-bold">
                <b-button-group class="w-100">
                  <b-button
                    class="px-5"
                    :class="edibleType === 'Food' ? 'activeBtn' : 'deactiveBtn' "
                    @click="changeMenuType('Food')"
                  >Food</b-button>
                  <b-button
                    class="px-5"
                    :class="edibleType === 'Drink' ? 'activeBtn' : 'deactiveBtn' "
                    @click="changeMenuType('Drink')"
                  >Drink</b-button>
                </b-button-group>
              </div>
            </b-col>
          </b-row>
        </b-container>

      </b-card-header>
      <b-overlay :show="progressing" rounded="sm">
        <div v-if="items.length" class="overflow-auto">
          <ul class="list-style-none menutypes bg-white p-0 mb-0 d-flex">
            <li style="min-width: 170px" class="d-inline-block position-relative menu-type py-2 px-3 d-flex align-content-center justify-content-center flex-column"
                :class="[
                    {
                        'special-menu-type': item.IsSpecial,
                        'invisible-menu-type': !item.IsVisible,
                        'is-not-available': !item.IsAvailableNow
                    }]
                "
                @click="selectMenuType(item)"
                v-for="(item, key) in items"
                :key="`menuType${key}`"
            >
              <div v-if="item.selected"
                   class="position-absolute w-100 h-100 active-menu-type"
                   style="right: 0;top: 0; z-index: 1"></div>
              <div class="position-relative" style="z-index: 2">
                <div>
                  <span :class="item.selected ? 'bold-text' : ''">
                  {{item.MenuType}}
                  </span>
                  <span class="small" v-if="!item.IsVisible">(Hidden)</span>
                </div>
                <template v-if="!item.IsTimeBased && profile.RestaurantWorkingHoursToday.length">
                  <div>
                    <span class="small">
                        {{profile.RestaurantWorkingHoursToday[0].StartTime}}<span v-if="profile.RestaurantWorkingHoursToday[0].EndTime">
                            {{'-' + profile.RestaurantWorkingHoursToday[0].EndTime}}
                        </span>
                    </span>
                  </div>
                </template>
                <template v-else>
                  <template v-if="item.IsSpecial">
                    <span class="small" v-if="item.StartDate !== item.EndDate">
                        {{specialDate(item.StartDate)}}-{{specialDate(item.EndDate)}}
                    </span>
                    <span class="small" v-else>
                        {{specialDate(item.StartDate)}}
                    </span>
                  </template>
                  <template v-else>
                    <div v-if="item.RestaurantMenuTypeHoursToday && item.RestaurantMenuTypeHoursToday.length">
                        <span class="small">
                          {{item.RestaurantMenuTypeHoursToday[0].StartTime}}
                          <span v-if="item.RestaurantMenuTypeHoursToday[0].EndTime">
                              {{'-' + item.RestaurantMenuTypeHoursToday[0].EndTime}}
                          </span>
                      </span>
                    </div>
                  </template>
                </template>
              </div>
            </li>

          </ul>
        </div>
        <no-item title="No menu type available" v-else/>
      </b-overlay>
    </b-card>
    <div v-if="!currentMenuTypeModel.IsAvailableNow" class="not-served-box p-5 bold-text">
      <h5 class="mb-0 font-weight-bold bold-text text-center">
        This menu is not served right now.
      </h5>
    </div>
    <b-row class="justify-content-center mb-3" v-if="currentMenuTypeModel && currentMenuTypeModel.MenuTypeComment">
      <b-col cols="12" lg="auto">
        <div class="p-2 text-center" style="color: #607d8b;border-bottom: 1px solid #607d8b;border-top: 1px solid #607d8b">
          {{currentMenuTypeModel.MenuTypeComment}}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import moment from 'moment'
  import noItem from "../../shared/noItem";
  export default {
    name: "index",
    components: {noItem},
    props: {
      items: {
        required: true,
        type: Array
      },
      edibleType: {
        required: true,
        type: [String, Number]
      },
      profile: {
        required: true
      },
      progressing: {type: Boolean, default: false},
      hasCategory: {
        type: Boolean, default: false
      }
    },
    data () {
      return {
        createModal: false,
        editModal: false,
        currentMenuType: {}
      }
    },
    computed: {
      currentMenuTypeModel () {
        return this.items.find(item => item.selected)
      }
    },
    methods: {
      specialDate (date) {
        moment.locale('en-ca');
        if (!date) return ''
        return moment(date).format('D MMM')
      },
      selectMenuType (item) {
        this.items.forEach(each => {
          each.selected = false
        })
        item.selected = true
        this.$emit('getCategories', item)
      },
      getSelectedMenuType(menu) {
        this.currentMenuType = menu
        this.$nextTick(() => {
          this.editModal = true
        })
      },
      changeMenuType (menuType) {
        this.$emit('refreshMenuType', menuType)
      }
    }
  }
</script>

<style scoped lang="scss">
  .menutypes{
    li.menu-type{
      border-bottom: 2px solid #37474f;
      &:hover{
        background-color: #e5e5e5;
        border-bottom: 2px solid yellow;
        cursor: pointer;
        color: black;
      }
    }

    li.special-menu-type{
      background-color: yellow;
      border-bottom: 2px solid #37474f;
    }
    li.invisible-menu-type{
      background-color: black;
      border-bottom: 2px solid black;
      color: #fff;
    }
  }
  .activeBtn {
    background: #f5c31d !important;
    border-color: #c8ced3 !important;
    font-weight: bold;
  }
  .deactiveBtn {
    background: #fff !important;
    border-color: #c8ced3 !important;
    color: #c8ced3 !important;
    font-weight: bold;
  }
  .active-menu-type{
    background-color: #ffe0b2 !important;
    border-bottom: 2px solid orange !important;
    color: black !important;
    opacity: 0.7;
  }
  .bold-text{
    font-weight: bold !important;
  }
  .is-not-available{
    background-image: repeating-linear-gradient(45deg, #78909c 0, #78909c 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
    background-color: #ffffff;
  }
</style>
