<template>
    <div class="w-100 d-flex flex-column">
        <b-btn block class="mt-3 bg-dark d-flex flex-row justify-content-center align-items-center" @click="confirmModal=true">
            <span>
                Digital Wallet Pay
            </span>
            <span class="mx-2 align-middle">
                <img src="../../assets/apple.svg" width="20" height="20" class="align-middle" style="margin-bottom: 2px"/>
                <img src="../../assets/google.svg" class="mx-2" width="20" height="20" style="margin-bottom: 1px"/>
            </span>
        </b-btn>
        <b-modal centered v-model="confirmModal" hide-footer hide-header body-class="p-0">
            <confirm-apple-pay
                :date-info="orderInfo"
                :loading="loading"
                @cancelConfirmation="confirmModal = false"
                @createFinalyOrder="createFinalyOrder"
                :EnableScheduledPickup="EnableScheduledPickup"
                :PreparationTime="PreparationTime"
            />
            <div class="p-2">
                <div class="text-center w-100 mb-3" id="applePayBtn"></div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    /* eslint-disable */
    import ConfirmApplePay from "./confirmApplePay";
    import {PayOrder, UpdateOrderPickupTime, UpdateTransaction} from "../../api";
    import {stripeToken} from "../../config";
    export default {
        name: "applePay",
        components: {ConfirmApplePay},
        props: {
            EnableScheduledPickup: {required: true},
            PreparationTime: {required: true},
            orderInfo: {required: true},
            order: {required: true},
            paymentRequest: {required: true},
            ConnectedAccountID: {required: true},
        },
        data () {
            return {
                confirmModal: false,
                loading: false,
                confirmationData: this.orderInfo,
                wallet_payment_method: ''
            }
        },

        methods: {
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
                        console.log('go pay order')
                        this.payRequest()
                        // this.payOrder()
                    } else {
                        this.loading = false
                    }
                }).catch((err) => {
                    console.log(err)
                    this.loading = false
                })
            },
            payRequest () {
                var stripe = Stripe(stripeToken, {
                    stripeAccount: this.ConnectedAccountID
                })
                var paymentRequest = stripe.paymentRequest({
                    country: 'US',
                    currency: 'usd',
                    total: {
                        label: 'Tab ' + this.order.ORModel.TabNo,
                        amount: parseInt((parseFloat(this.order.ORModel.Total.replace("$","")).toFixed(2) * 100).toFixed(0)),
                    },
                    requestPayerName: true,
                    requestPayerEmail: true,
                });
                console.log('paymentRequest is: ', paymentRequest)

                var elements = stripe.elements();
                var prButton = elements.create('paymentRequestButton', {
                    paymentRequest
                })
                console.log('prButton is: ', prButton)
                paymentRequest.canMakePayment().then((result) => {
                    if (result) {
                        prButton.mount("#applePayBtn")
                        this.wallet_payment_method = result.applePay ? "Apple Pay" : "Google Pay"
                        console.log('wallet is: ', this.wallet_payment_method)
                        // paymentRequestButton = prButton
                        // console.log('paymentRequestButton is: ', paymentRequestButton)
                        paymentRequest.on('paymentmethod', (ev) => {

                            const model = {
                                UserID: -292,
                                RestaurantID: this.order.RestaurantID,
                                OrderID: this.order.OrderID,
                                phoneNumber:  this.order.PhoneNumber,
                                RestaurantName: this.order.ORModel.RestaurantName,
                                PaymentMethod: this.wallet_payment_method,
                                PaymentMethodID: ev.paymentMethod.id
                            }
                            PayOrder(model).then(res => {
                                if (res.data.success) {
                                    console.log('go confirm pay')
                                    this.confirmPay(res.data, stripe, ev)
                                } else {
                                    this.loading = false
                                }
                            }).catch(() => {
                                this.loading = false
                            })
                        })
                    } else {
                        alert('no available wallet payment method')
                    }
                })
            },
            confirmPay (info, stripeData, ev) {
                stripeData.confirmCardPayment(info.ClientSecret,
                    {
                        payment_method: ev.paymentMethod.id,
                    },
                    {handleActions: false}
                ).then((res) => {
                    if (res.error) {
                        console.log('error on stripe', res.error)
                        this.loading = false
                    } else {
                        this.createUpdateTransaction(res, info)
                        // stripeData.confirmCardPayment(info.ClientSecret).then((result) => {
                        //     if (result.error) {
                        //
                        //     } else {
                        //         console.log('go update transaction')
                        //         this.createUpdateTransaction(res, info)
                        //     }
                        // })
                    }
                }).catch((err) => {
                    console.log('error on confirmCardPayment', err)
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
                    PaymentMmethod: confirmPayData.paymentIntent.payment_method,
                }
                UpdateTransaction(model).then(res => {
                    this.loading = false
                    if (res.data.success) {
                        this.confirmModal = false
                        this.$emit('updatePaid')
                        location.reload()
                    } else {
                        console.log('error on update transaction')
                        this.loading = false
                    }
                }).catch(() => {})
            }

        }
    }
</script>

<style scoped>

</style>
