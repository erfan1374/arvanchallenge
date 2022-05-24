<template>
    <b-overlay :show="show" rounded="sm">
        <b-container class="py-4 min-vh-100" fluid>
            <b-row class="justify-content-center" v-if="!progressing">
                <b-col cols="12" md="7" lg="4">
                    <div class="p-4 rounded" :class="{'greenBg': order.ORModel.PaymentDate, 'whiteBg': !order.ORModel.PaymentDate}">
                        <div class="text-left">
                            <img src="./logo-full.png" width="200"/>
                        </div>
                        <div class="text-center mt-4">
                            <h1 class="font-weight-bold mb-0" v-if="!order.ORModel.PaymentDate">BILL PAY</h1>
                            <h1 class="font-weight-bold mb-0" v-else>BILL PAID</h1>
                        </div>
                        <hr/>
                        <div class="w-75 m-auto text-center">
                            <h6 class="text-center font-weight-bold">
                                {{order.ORModel.RestaurantName}}
                            </h6>
                            <p class="mb-0 text-muted">
                     <span>
                     {{order.Address + ',' + order.City}}
                     </span>
                                <br/>
                                <span>
                     {{order.State + ' ' + order.Zip}}
                     </span>
                            </p>
                            <p class="mb-0">
                                <a :href='`tel:${order.Phone}`' class="text-muted text-decoration-none">{{order.Phone}}</a>
                            </p>
                            <p class="mb-0 text-dark font-weight-bold mt-4">
                                Tab No {{order.ORModel.TabNo}}
                                <span v-if="order.ORModel.OrderType === 'Dine In'">
                                    - {{order.ORModel.TableNumber}}
                                </span>
                                {{order.ORModel.OrderType}}
                                <span v-if="order.ORModel.OrderType !== 'Dine In'">
                     <span v-if="order.ORModel.PickupTime">for</span>
                     <br/>
                     <span v-if="year == '1900'">
                     {{hour}}
                     </span>
                     <span v-else>
                     {{order.ORModel.PickupTime}}
                     </span>
                     </span>
                            </p>
                            <p class="mt-4 mb-0 text-muted">
                                Ordered on {{order.ORModel.OrderDate}}
                            </p>
                            <p class="mt-1 text-muted">
                                Name: {{order.ORModel.CustomerName}}
                            </p>
                        </div>
                        <div class="w-100" v-if="order.ORModel.OrderType !== 'Dine In'">
                            <p v-if="!order.ORModel.PaymentDate" class="text-danger font-weight-bold" style="font-weight: bold">
                                NOTE: Pay ASAP for on time
                                <span v-if="order.ORModel.OrderType === 'Delivery'">delivery.</span>
                                <span v-else>pickup.</span>
                                Late payment results in {{order.ORModel.OrderType && order.ORModel.OrderType.toLowerCase()}} delay or order cancellation.
                            </p>
                        </div>
                        <div class="text-center p-4" style="background: #c8c8c8">
                            <div v-if="!order.ORModel.PaymentDate">
                                <p class="mb-0 small">
                                    By payment I agree to <a href="https://www.menupoly.com/Home/Legal#termsofuse" target="_blank">MENUPOLY Terms of Use</a> and <a target="_blank" href="https://www.menupoly.com/Home/Legal#pp">Privacy Policy</a>
                                </p>
                                <div id="specialConfirmWalletBtn"></div>
                                <apple-pay
                                        class="w-100"
                                        ref="applePay"
                                        :EnableScheduledPickup="EnableScheduledPickup"
                                        :PreparationTime="PreparationTime"
                                        :order-info="confirmationData"
                                        :order="order"
                                        :paymentRequest="paymentRequest"
                                        :wallet_payment_method="wallet_payment_method"
                                        :ConnectedAccountID="ConnectedAccountID"
                                        @updatePaid="paidReceipt"
                                />
                                <b-btn variant="danger" block class="mt-3" @click="paymentForm = !paymentForm">
                                    Add Payment
                                </b-btn>
                            </div>
                            <div v-else>
                                <div v-if="!send">
                                    <p class="mb-0 font-weight-bold">Enter your Email address to get a receipt copy</p>
                                    <div class="mt-2">
                                        <b-input-group>
                                            <template v-slot:append>
                                                <b-btn class="text-decoration-none" variant="warning" @click="sendEmail" :disabled="!email">
                                                    <span>Send</span>
                                                </b-btn>
                                            </template>
                                            <b-input class="myFeild" v-model.trim="email" :name="'Email address'" placeholder="Email address"/>
                                        </b-input-group>
                                    </div>
                                </div>
                                <div v-else class="text-center">
                                    <p class="mb-0">
                                        Check your inbox please.
                                    </p>
                                    <p class="mb-0">
                                        <b-btn variant="link" @click="send = false">
                                            Wanna enter Email again?
                                        </b-btn>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="subTotal-section mt-3 p-2">
                            <div class="d-flex flex-row justify-content-between">
                     <span>
                     Subtotal <span @click="showDetails = !showDetails" class="cursor-pointer font-weight-bold" style="color: #595c87;cursor:pointer;">(See details)</span>
                     </span>
                                <span>{{order.ORModel.SubTotal}}</span>
                            </div>
                            <b-collapse v-model="showDetails" class="border-top border-secondary mt-2">
                                <div class="d-flex flex-row justify-content-between mt-2" v-for="(item, index) in order.ORModel.ListOfOrderDetails" :key="index">
                                    <p class="mb-0 d-flex flex-column">
                           <span>{{item.Quantity}}x {{item.ItemName}}
                           <span v-if="item.Alcoholic" style="color: blue">* ALC. VERIFY AGE *</span>
                           </span>
                                        <span class="mx-4" v-if="item.PriceComment !== ''">{{item.PriceComment}}</span>
                                        <span class="mx-4" v-if="item.Modifiers !== ''">{{item.Modifiers}}</span>
                                        <span class="mx-4" v-if="item.Description !== ''">{{item.Description}}</span>
                                    </p>
                                    <p class="mb-0">
                                        {{'$' + item.Price.toFixed(2)}}
                                    </p>
                                </div>
                            </b-collapse>
                        </div>
                        <div class="items p-2">
                            <div class="d-flex flex-row justify-content-between">
                     <span>
                     Tax
                     </span>
                                <span v-if="order.ORModel.Tax_Alc != '0'">
                     (Including {{order.ORModel.Tax_Alc}} Alcohol Tax)
                     </span>
                                <span>
                     {{order.ORModel.Tax}}
                     </span>
                            </div>
                            <div class="d-flex flex-row justify-content-between align-items-center">
                     <span>
                        Tip
                        <select :disabled="order.ORModel.PaymentDate !== ''" v-model="tipPercent" @change="updateTip">
                           <option value="0">0</option>
                           <option value="5">5%</option>
                           <option value="10">10%</option>
                           <option value="15">15%</option>
                           <option value="20">20%</option>
                           <option value="25">25%</option>
                           <option value="30">30%</option>
                           <option value="40">40%</option>
                           <option value="50">50%</option>
                        </select>
                     </span>
                                <span>
                     {{order.ORModel.Tip}}
                     </span>
                            </div>
                            <div class="d-flex flex-row justify-content-between"  v-if="order.ORModel.OrderType === 'Delivery'">
                     <span class="font-weight-bold">
                     Delivery Fee
                     </span>
                                <span>
                     {{'$' + order.ORModel.DeliveryFee}}
                     </span>
                            </div>
                            <div class="d-flex flex-row justify-content-between">
                     <span>
                     Tech Fee
                     </span>
                                <span>
                     {{order.ORModel.Fee}}
                     </span>
                            </div>
                            <hr/>
                            <div class="d-flex font-weight-bold flex-row justify-content-between">
                                <span v-if="order.ORModel.PaymentDate" class="font-weight-bold" style="font-weight: 600">Customer charged</span>
                                <span v-else class="font-weight-bold" style="font-weight: 600">Total</span>
                                <span>
                     {{order.ORModel.Total}}
                     </span>
                            </div>
                            <div v-if="!!order.ORModel.PaymentDate">
                                <div class="d-flex flex-row justify-content-between">
                                    <span class="">Card Transaction</span>
                                    <span v-if="!!order.ORModel.PaymentDate">{{convertDatePayment(order.ORModel.PaymentDate)}}</span>
                                </div>
                                <div class="d-flex flex-row justify-content-between">
                                    <span>{{order.ORModel.CardHolder}}</span>
                                </div>
                                <div class="d-flex flex-row justify-content-between">
                                    <span>{{order.ORModel.CardInfo}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col>
                </b-col>
            </b-row>
            <b-modal centered v-model="paymentForm" hide-footer hide-header body-class="p-0" :no-close-on-backdrop="loading" :no-close-on-esc="loading">
                <payment-form :customer-name="order.ORModel.CustomerName" @generateToken="generateToken" ref="paymentForm" :loading="loading" @load="setLoad"/>
            </b-modal>
            <b-modal centered v-model="dateForm" hide-footer hide-header body-class="p-0" :no-close-on-backdrop="loading" :no-close-on-esc="loading">
                <confirm-date
                        :date-info="confirmationData"
                        :loading="loading"
                        @cancelConfirmation="cancelConfirmation"
                        @createFinalyOrder="createFinalyOrder"
                        :EnableScheduledPickup="EnableScheduledPickup"
                        :PreparationTime="PreparationTime"
                />
            </b-modal>
        </b-container>
    </b-overlay>
</template>

<script>
/* eslint-disable */
import {
    AddPaymentMethod,
    DecryptBillPayUrl,
    GetOrderReceipt, GetRestaurantAllowance, GetRestaurantPreparationTime,
    PayOrder, SendEmailReceipt, UpdateOrderPickupTime,
    UpdateOrderTip,
    UpdateTransaction
} from "../../api";
import PaymentForm from "./paymentForm";
import {stripeToken} from "../../config";
import moment from 'moment'
import ConfirmDate from "./confirmDate";
import ApplePay from "./applePay";

export default {
  name: 'HelloWorld',
    components: {ApplePay, ConfirmDate, PaymentForm},
    data () {
    return {
        showApple: true,
        showDetails: false,
        order: {
            ORModel: {}
        },
        progressing: true,
        paymentForm: false,
        stripeToken: null,
        nameOnCard: null,
        zipcodeCard: null,
        loading: false,
        year: null,
        hour: null,
        date: null,
        tipPercent: 15,
        confirmationData: {
            orderType: '',
            time: null,
            date: null,
            special:false,
            RestaurantID: null,
            menuTypeId: null
        },
        dateForm: false,
        email: '',
        send: false,
        show: true,
        EnableScheduledPickup: false,
        PreparationTime: '',
        wallet_payment_method: '',
        paymentRequest: null,
        button: '',
        ConnectedAccountID: '',
        ORModel: {}
    }
  },
    mounted() {
      let {q} = this.$route.query
        if (q) {
            this.decript(q)
        } else {
            this.progressing = true
        }

    },
    methods: {
        decript(q) {
            DecryptBillPayUrl(q).then(res => {
                if (res.data.success) {
                    const {OrderID, PhoneNumber, RestaurantID} = res.data
                    const params = {
                        OrderID, PhoneNumber, RestaurantID, hasStrip: false
                    }
                    let object = {
                        RestaurantID,
                        UserID: -292
                    }
                    this.GetRestaurantAllowance(object)
                    this.GetRestaurantPreparationTime(object)

                    this.GetOrder(params).then(order => {
                        this.ORModel = order.ORModel
                        this.ConnectedAccountID = res.data.ConnectedAccountID
                        // this.loadAppleButton(res.data.ConnectedAccountID, order.ORModel)
                    })
                }
            }).catch(() => {
            })
        },

        GetRestaurantAllowance (data) {
            GetRestaurantAllowance(data).then(res => {
                if (res.data.success) {
                    this.EnableScheduledPickup = res.data.results.EnableScheduledPickup
                }
            })
        },
        GetRestaurantPreparationTime (data) {
            GetRestaurantPreparationTime(data).then(res => {
                if (res.data.success) {
                    this.PreparationTime = res.data.results
                }
            })
        },
        GetOrder (params) {
            return GetOrderReceipt(params).then(res => {
                if (res.data.success) {
                    this.order = res.data.results
                    if (res.data.results.ORModel.PaymentDate) {
                        this.showApple = false
                        this.paidReceipt()
                    }
                    else {
                        this.show = false
                        let date = this.order.ORModel.PickupTime
                        this.year = moment(date).format('YYYY')
                        this.hour = moment(date).format('h:mm A')
                        this.date = moment(date).format('YYYY-MM-DD')
                        let digitTip = this.order.ORModel.Tip.replace('$', '')
                        let subTotal = this.order.ORModel.SubTotal.replace('$', '')
                        let tipPercent = ((+digitTip / +subTotal) * 100).toFixed(0)

                        this.tipPercent = tipPercent
                        this.confirmationData = {
                            orderType: this.order.ORModel.OrderType,
                            time: this.hour,
                            date: this.date,
                            special: this.order.ORModel.MenuTypeId == '-1' ? false : true,
                            RestaurantID: this.order.RestaurantID,
                            menuTypeId: this.order.ORModel.MenuTypeId
                        }
                        this.progressing = false
                    }
                    return res.data.results
                }
            }).catch(() => {

            })
        },
        updateTip () {
            let value = this.tipPercent
            let model = {
                RestaurantID: this.order.RestaurantID,
                OrderID: this.order.OrderID,
                TipPercent: value + '.00'
            }
            UpdateOrderTip(model).then(res => {
                if (res.data.success) {
                    const params = {
                        OrderID: this.order.OrderID, PhoneNumber: this.order.PhoneNumber, RestaurantID: this.order.RestaurantID, hasStrip: false
                    }
                    this.GetOrder(params)
                }
            }).catch(() => {

            })
        },
        setLoad (data) {
          this.loading = data
        },
        generateToken (stripeToken) {
            if (stripeToken.token !== null) {
                this.stripeToken = stripeToken.token
                this.nameOnCard = stripeToken.nameOnCard
                this.zipcodeCard = stripeToken.zipcode
                const model = {
                    UserID: -292,
                    RestaurantID: this.order.RestaurantID,
                    OrderID: this.order.OrderID,
                    phoneNumber:  this.order.PhoneNumber,
                    nameOnCard: this.nameOnCard,
                    stripeToken: this.stripeToken
                }
                this.loading = true
                if (this.order.ORModel.OrderType === 'Dine In') {
                    this.addPaymentMethod(model)
                } else {
                    this.loading = false
                    this.dateForm = true
                }
            }
        },
        addPaymentMethod (model) {
            AddPaymentMethod(model).then(res => {

                if (res.data.success) {
                    const data = {
                        UserID: -292,
                        RestaurantID: this.order.RestaurantID,
                        OrderID: this.order.OrderID,
                        phoneNumber:  this.order.PhoneNumber,
                        PaymentMethod: 'Card'
                    }
                    this.createPayOrder(data)
                } else {
                    alert(res.data.message)
                    this.loading = false
                }
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        createPayOrder (model) {
            PayOrder(model).then(res => {

                if (res.data.success) {
                    this.confirmPay(res.data)
                } else {
                    alert(res.data.message)
                    this.loading = false
                }
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        },
        confirmPay (info) {
            var stripe = Stripe(stripeToken, {
                stripeAccount: info.ConnectedAccountID
            })
            stripe.confirmCardPayment(info.ClientSecret, {
                payment_method: info.PaymentMethod
            }).then(res => {
                this.createUpdateTransaction(res, info)
            }).catch(err => {
                this.$showError('error on confirm date: ' + err)
                this.loading = false
            })
        },
        createUpdateTransaction (confirmPayData, payOrderInfo) {
            let model = {
                UserID: -292,
                RestaurantID: this.order.RestaurantID,
                OrderID: this.order.OrderID,
                phoneNumber:  this.order.PhoneNumber,
                ReceiptNumber: confirmPayData.paymentIntent.created,
                PaymentMmethod: payOrderInfo.PaymentMethod
            }
            UpdateTransaction(model).then(res => {
                this.loading = false
                if (res.data.success) {
                    this.paymentForm = false
                    this.dateForm = false
                    this.paidReceipt()
                } else {
                    alert(res.data.message)
                    this.loading = false
                }
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        },
        cancelConfirmation (data) {
            this.dateForm = data
        },
        createFinalyOrder (data) {
            let getDate = this.confirmationData.special ? data.date + ' ' + data.time : data.time
            let model = {
                PickupTime: getDate,
                OrderID: this.order.OrderID,
                RestaurantID: this.order.RestaurantID,
            }
            this.loading = true
            UpdateOrderPickupTime(model).then(res => {
                if (res.data.success) {
                    const model = {
                        UserID: -292,
                        RestaurantID: this.order.RestaurantID,
                        OrderID: this.order.OrderID,
                        phoneNumber:  this.order.PhoneNumber,
                        nameOnCard: this.nameOnCard,
                        stripeToken: this.stripeToken
                    }
                    this.addPaymentMethod(model)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        sendEmail () {
            let model = {
                UserID: -292,
                RestaurantID: this.order.RestaurantID,
                OrderID: this.order.OrderID,
                phoneNumber:  this.order.PhoneNumber,
                CustomerEmail: this.email
            }
            SendEmailReceipt(model).then(res => {
                if (res.data.success) {
                    this.send = true
                    this.email = ''
                } else {
                    alert(res.data.message)
                }
            }).catch(err => {

            })
        },
        convertDatePayment (date) {
          return moment(date).format('MMM D, YYYY  hh:mm:ss A')
        },
        paidReceipt () {
            const params = {
                OrderID: this.order.OrderID, PhoneNumber: this.order.PhoneNumber, RestaurantID: this.order.RestaurantID, hasStrip: true
            }
            this.show = true
            GetOrderReceipt(params).then(res => {
                if (res.data.success) {
                    this.show = false
                    this.order = res.data.results
                    let date = this.order.ORModel.PickupTime
                    this.year = moment(date).format('YYYY')
                    this.hour = moment(date).format('h:mm A')
                    this.date = moment(date).format('YYYY-MM-DD')
                    let digitTip = this.order.ORModel.Tip.replace('$', '')
                    let subTotal = this.order.ORModel.SubTotal.replace('$', '')
                    let tipPercent = ((+digitTip / +subTotal) * 100).toFixed(0)

                    this.tipPercent = tipPercent
                    this.confirmationData = {
                        orderType: this.order.ORModel.OrderType,
                        time: this.hour,
                        date: this.date,
                        special: this.order.ORModel.MenuTypeId == '-1' ? false : true,
                        RestaurantID: this.order.RestaurantID,
                        menuTypeId: this.order.ORModel.MenuTypeId
                    }
                    this.progressing = false
                }
            }).catch(() => {

            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .subTotal-section{
    background: #ffffd3;
  }
  body{

  }
    .greenBg{
        background: #e8f5e9 !important;
    }
    .whiteBg{
        background: #fff;
    }
</style>
