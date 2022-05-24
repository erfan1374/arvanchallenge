<template>
    <div>
        <b-container fluid class="px-0">
            <div class="bg-light mb-3 sticky-footer p-2">
                <b-row>
                    <b-col cols="12" md="6">
                        <b-input-group prepend="Category">
                            <b-form-select class="form-select" :options="getCats" v-model="category" @change="changeCategory" text-field="CategoryDESC" value-field="CategoryID"/>
                        </b-input-group>
                    </b-col>
                </b-row>
            </div>
            <b-row>
                <b-col cols="12" v-for="(category, key) in items" :id="'category-' + category.CategoryID" :key="`cat${key}`">
                    <div class="mb-3 category-box">
                        <div class="category-title position-relative p-3"
                            :class="category.categoryClass"
                        >
                            <div class="position-absolute px-2 menu-type-badge" style="top: -3px; left: 15px">
                                {{currentMenuType.MenuType}}
                            </div>
                            <b-container class="px-0" fluid>
                                <b-row class="align-items-center justify-content-between">
                                    <b-col cols="auto" class="d-flex justify-content-center justify-content-md-start pb-3 pb-md-0">
                                    </b-col>
                                    <b-col cols="8" lg="auto" class="text-center pb-3 pb-md-0 h5 font-weight-bold text-white mb-0 cursor-pointer" @click="showCategory(category)">
                                        <div class="bold-text">
                                            {{category.CategoryDESC}}
                                        </div>
                                        <div v-if="category.CategoryComment" class="font-weight-normal small" style="font-style: italic">
                                            {{category.CategoryComment}}
                                        </div>
                                    </b-col>
                                    <b-col cols="auto" class="d-flex justify-content-end">
                                        <b-btn @click="showFood(category)" variant="transparent">
                                            <font-awesome-icon class="align-middle text-dark" :icon="category.open ? 'chevron-up' : 'chevron-down'"/>
                                        </b-btn>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                        <b-collapse v-model="category.open">
                            <div class="category-body bg-white" :class="category.foods.length ? 'px-2 pt-2' : ''">
                                <b-container fluid class="px-0">
                                    <b-row v-if="category.foods.length" class="no-gutters">
                                        <b-col class="p-1" v-for="(food, key) in category.foods" cols="12" md="6" :key="`food${key}`">
                                            <div class="p-2 h-100"
                                                 :class="foodBoxColor(food)"
                                                 style="border: 1px solid #e4e7ea">
                                                <food-item
                                                    :value="food"
                                                    :foods="category.foods"
                                                    :edible-type="edibleType"
                                                    :category="category"
                                                    :AllowSecondLang="AllowSecondLang"
                                                    :kds="''"
                                                    :display="''"
                                                />
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row v-else>
                                        <b-col cols="12">
                                            <no-item title="No item available"/>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </div>
                        </b-collapse>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
    import FoodItem from "./components/foodItem";
    import NoItem from "../../shared/noItem";
    export default {
        name: "categories",
        components: {NoItem, FoodItem},
        props: {
            firstCat: {
                required: false
            },
            items: {
                required: true,
                default: () => [],
                type: Array
            },
            kdsList: {
                required: true,
                default: () => [],
                type: Array
            },
            printStationList: {
                required: true,
                default: () => [],
                type: Array
            },
            currentMenuType: {
                required: true
            },
            edibleType: {required: true, type: String},
            AllowSecondLang: {required: true, type: Boolean, default: false},
        },
        watch: {
            'firstCat': {
                handler: function (newVal) {
                    this.category = newVal
                }
            }
        },
        data () {
            return {
                addModal: false,
                editModal: false,
                currentCategory: {},
                addFoodModal: false,
                category: this.firstCat,
                loadingFood: false
            }
        },
        computed: {
            getCats () {
                return [{CategoryDESC: 'Select category here...', CategoryID: ''}, ...this.items]
            },
        },
        methods: {
            showCategory (category) {
                this.currentCategory = category
                this.$nextTick(() => {
                    this.editModal = true
                })
            },
            scrollToCategory (categoryId) {
                this.$nextTick(() => {
                    const headerOffset = 50
                    const el = document.getElementById(`${categoryId}`)
                    if (el) {
                        const bodyPosition = el.getBoundingClientRect().top
                        const offsetPosition = bodyPosition + window.pageYOffset - headerOffset
                        window.scrollTo({top: offsetPosition, behavior: 'smooth'})
                    } else {
                        this.$showError('Tag Not Found!!!!')
                    }
                })
            },
            changeCategory (cat) {
                if (cat) {
                    this.scrollToCategory(`category-${cat}`)
                    // const findCategory = this.items.find(item => item.CategoryID === cat)
                    // if (findCategory) {
                    //     this.showFood(findCategory)
                    // }
                }
            },
            showFood (category) {
                this.items.forEach(item => {
                    if (item.CategoryID === category.CategoryID) {
                        if (category.open) {
                            item.open = false
                        } else {
                            item.open = true
                            // this.getCategoryFoods(category)
                        }
                    }
                })
                // this.$emit('openCategory', category)
            },
            getCategoryStatus (category) {
                const findNew = category.foods.find(item => item.IsAvailable)
                return findNew ? true : false
            },
            getActiveFood (category) {
                const findActiveItem = category.foods.find(item => item.IsAvailable)
                return !!findActiveItem
            },
            foodBoxColor (food) {
                if (!food.IsAvailable) {
                    return 'deactive-food'
                } else {
                    if (!this.currentMenuType.IsVisible) {
                        return 'hidden-food'
                    } else {
                        return 'bg-white'
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .sticky-footer{
        position: sticky;
        top: 0;
        z-index: 950;
    }
</style>
