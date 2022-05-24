<template>
    <b-card no-body class="m-0">
        <b-card-header>
            <span>
                Confirmation
            </span>
        </b-card-header>
        <b-card-body v-if="dateInfo.orderType === 'Dine In'">
            <div class="mb-2">
                Proceed with payment?
            </div>
            <div>
                <b-btn class="processBtnModal" style="background: orange" @click="cancel">
                    <span>Yes</span>
                </b-btn>
            </div>
        </b-card-body>
        <b-card-body v-else>
            <div v-if="times.length">
                <div class="text-dark mb-2 h6">
                <span v-if="dateInfo.orderType === 'Pickup'">
                    Please confirm pickup time.
                </span>
                    <span v-else>
                    Please confirm delivery time.
                </span>
                </div>
                <div v-if="dateInfo.orderType === 'Pickup'">
                    <div v-if="EnableScheduledPickup">
                        <div class="mb-3" v-if="dateInfo.special">
                            <b-input-group :prepend="dateInfo.orderType === 'Pickup' ? 'Pickup Date' : 'Delivery Date'">
                                <b-form-select class="form-select" :name="dateInfo.orderType === 'Pickup' ? 'Pickup Date' : 'Delivery Date'" @change="changeDate" :options="dates" v-model="date"/>
                            </b-input-group>
                        </div>
                        <div :class="dateInfo.special ? 'mt-3' : 'mb-3'">
                            <b-input-group :prepend="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'">
                                <b-form-select class="form-select" :name="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'" :options="times" v-model="time"/>
                            </b-input-group>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="dateInfo.special">
                            <div class="mb-3" v-if="dateInfo.special">
                                <b-input-group :prepend="dateInfo.orderType === 'Pickup' ? 'Pickup Date' : 'Delivery Date'">
                                    <b-form-select class="form-select" :name="dateInfo.orderType === 'Pickup' ? 'Pickup Date' : 'Delivery Date'" @change="changeDate" :options="dates" v-model="date"/>
                                </b-input-group>
                            </div>
                            <div :class="dateInfo.special ? 'mt-3' : 'mb-3'">
                                <b-input-group :prepend="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'">
                                    <b-form-select class="form-select" :name="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'" :options="times" v-model="time"/>
                                </b-input-group>
                            </div>
                        </div>
                        <div v-else>
                            <p>{{getCurrentHour()}}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div>
                        <b-input-group :prepend="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'">
                            <b-form-select class="form-select" :name="dateInfo.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'" :options="times" v-model="time"/>
                        </b-input-group>
                    </div>
                </div>

                <div class="d-flex flex-row mt-3 justify-content-between" v-if="EnableScheduledPickup">
                    <b-btn v-if="dateInfo.special" class="cancelBtnModal" style="background: orange" :disabled="loading || disablePaySpecial" @click="create">
                        <b-spinner v-if="loading" small></b-spinner>
                        Charge Card
                    </b-btn>
                    <b-btn v-else class="cancelBtnModal" style="background: orange" :disabled="loading || disablePay" @click="create">
                        <b-spinner v-if="loading" small></b-spinner>
                        Charge Card
                    </b-btn>
                    <b-btn class="processBtnModal" style="background: orange" @click="cancel" :disabled="loading">
                        <span>Cancel</span>
                    </b-btn>
                </div>
                <div class="d-flex flex-row mt-3 justify-content-between" v-else>
                    <b-btn class="cancelBtnModal" style="background: orange" :disabled="loading" @click="create">
                        <b-spinner v-if="loading" small></b-spinner>
                        Charge Card
                    </b-btn>
                    <b-btn class="processBtnModal" style="background: orange" @click="cancel" :disabled="loading">
                        <span>Cancel</span>
                    </b-btn>
                </div>
            </div>
            <div v-else>
                <div class="mb-2">
                    No available {{dateInfo.orderType}} time exist anymore.
                    <br/>
                    Payment cannot be made.
                </div>
                <div class="text-center d-flex flex-row justify-content-center">
                    <b-btn variant="warning" @click="cancel">Ok</b-btn>
                </div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
    import {getAllDeliveryTime, getAllPickUpTime, GetPickupDateByMenu, GetPickupTimes_Event} from "../../api";
    import moment from "moment";

    export default {
        name: "confirmDate",
        props: {
            dateInfo: {required: true},
            loading: {required: true},
            EnableScheduledPickup: {required: false},
            PreparationTime: {required: false}
        },
        data () {
            return {
                date: null,
                time: null,
                dates: [],
                times: [],
                availableTime: false,
                availableDate: false,

            }
        },
        computed: {
            disablePaySpecial () {
              return this.date === null || this.time === null
          },
            disablePay () {
                return this.time === null
            }
        },
        mounted() {
            if (this.dateInfo.orderType === 'Delivery') {
                this.getAllDeliveryTimes()
            } else {
                if (this.EnableScheduledPickup) {
                    if (this.dateInfo.special) {
                        this.getDates()
                    } else {
                        this.getAllPickUpTimes()
                    }
                }
            }
        },
        methods: {
            validDate (date) {
                moment.locale('en-ca');
                return moment(date).format('D MMM YY')
            },
            getAllPickUpTimes () {
                getAllPickUpTime(this.dateInfo.RestaurantID).then(res => {
                    if (res.data.success) {
                        let array = []
                        res.data.times.forEach((item, index) => {
                            array.push({
                                text: index === 0 ? item + ' (ASAP) ' : item,
                                value: item
                            })
                        })
                        this.times = [...array]
                        let findSelectedTime = this.times.find(i => i.text == this.dateInfo.time)
                        if (findSelectedTime) {
                            this.time = findSelectedTime.value
                        } else {
                            this.time = this.times[0].value
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getAllDeliveryTimes () {
                getAllDeliveryTime(this.dateInfo.RestaurantID).then(res => {
                    if (res.data.success) {
                        let array = []
                        res.data.listOfRestaurantDeliveryPeriod.forEach((item, index) => {
                            array.push({
                                text: index === 0 ? item.PickupTime + ' (ASAP) ' : item.PickupTime,
                                value: item.PickupTime
                            })
                        })
                        this.times = [...array]
                        let findSelectedTime = this.times.find(i => i.text == this.dateInfo.time)
                        if (findSelectedTime) {
                            this.time = findSelectedTime.value

                        } else {
                            this.time = this.times[0].value
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getDates () {
                GetPickupDateByMenu(this.dateInfo.RestaurantID, this.dateInfo.menuTypeId).then(res => {
                    if (res.data.success) {
                        let array = []
                        res.data.dates.forEach(item => {
                            array.push({
                                text: this.validDate(item),
                                value: item
                            })
                        })
                        this.dates = [ ...array]
                        let findSelectedDate = this.dates.find(i => i.value == this.dateInfo.date)
                        if (findSelectedDate) {
                            this.date = findSelectedDate.value
                            this.GetPickupTimes_Event(this.dateInfo.RestaurantID, this.dateInfo.menuTypeId, this.date, false)
                            this.availableDate = true
                        } else {
                            this.date = this.dates[0].value
                            this.GetPickupTimes_Event(this.dateInfo.RestaurantID, this.dateInfo.menuTypeId, this.date, false)
                            this.availableDate = false
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })

            },
            changeDate (date) {
                if (date === null) {
                    this.times = []
                    this.time = null
                } else {
                    this.GetPickupTimes_Event(this.dateInfo.RestaurantID, this.dateInfo.menuTypeId, date, true)
                }
            },
            GetPickupTimes_Event (RestaurantID, MenuTypeID, SelectedDate, changed) {
                GetPickupTimes_Event(RestaurantID, MenuTypeID, SelectedDate).then(res => {
                    if (res.data.success) {
                        let array = []
                        res.data.times.forEach((item, index) => {
                            array.push({
                                text: index === 0 ? item + ' (ASAP) ' : item,
                                value: item
                            })
                        })
                        this.times = [...array]
                        if (changed) {
                            this.time = null
                        } else {
                            let findSelectedTime = this.times.find(i => i.text == this.dateInfo.time)
                            if (findSelectedTime) {
                                this.time = findSelectedTime.value
                            } else {
                                this.time = this.times[0].value
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            cancel () {
                this.$emit('cancelConfirmation', false)
            },
            create () {
                if (this.dateInfo.orderType === 'Pickup') {
                    if (this.dateInfo.special) {
                        this.$emit('createFinalyOrder', {
                            date: this.date,
                            time: this.time
                        })
                    } else {
                        if (this.EnableScheduledPickup) {
                            this.$emit('createFinalyOrder', {
                                date: this.date,
                                time: this.time
                            })
                        } else {
                            this.$emit('createFinalyOrder', {
                                date: this.date,
                                time: this.getCurrentHour()
                            })
                        }
                    }
                }
                else {
                    this.$emit('createFinalyOrder', {
                        date: this.date,
                        time: this.time
                    })
                }

            },
            getCurrentHour () {
                const currentTime = moment().locale('en').add(this.PreparationTime, 'minutes').format('hh:mm A')
                return currentTime
            }
        }
    }
</script>

<style scoped>
    .cancelBtnModal{
        background: darkorange;
        border: 1px solid darkorange;
    }
</style>
