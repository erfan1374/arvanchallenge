<template>
    <b-card no-body class="m-0">
        <b-card-header v-if="!fromReport">
            <span>Add New Payment Method</span>
        </b-card-header>
        <b-card-body>
            <div>
                <div class="mb-3">
                    <label class="mb-0 font-weight-bold">Name On Card</label>
                    <b-input v-model="name" placeholder="Required"/>
                </div>
                <div>
                    <stripe-element-card
                            ref="elementRef"
                            :pk="pulishableKey"
                            @error="errorToken"
                            @token="tokenCreated"
                            hidePostalCode
                            @loading="v => progress = v"
                    />
                </div>
                <div class="mb-3 text-danger" v-if="errorMessage">
                    {{errorMessage}}
                </div>
                <div class="mb-3 text-success" v-if="successMessage">
                    Card was successfully added
                </div>
<!--                <div class="my-3">-->
<!--                    <label class="mb-0 font-weight-bold">Card Number <span class="small text-muted">(Required)</span></label>-->
<!--                    <div id="card-number" class="form-control"></div>-->
<!--                </div>-->
<!--                <div class="my-3">-->
<!--                    <label class="mb-0 font-weight-bold">Card Expiry <span class="small text-muted">(Required)</span></label>-->
<!--                    <div id="card-expiry" class="form-control"></div>-->
<!--                </div>-->
<!--                <div class="my-3">-->
<!--                    <label class="mb-0 font-weight-bold">Card CVC <span class="small text-muted">(Required)</span></label>-->
<!--                    <div id="card-cvc" class="form-control"></div>-->
<!--                </div>-->
<!--                <div class="">-->
<!--                    <label class="mb-0 font-weight-bold">Zip code <span class="small text-muted">(Required)</span></label>-->
<!--                    <b-input v-model="zipcode"/>-->
<!--                </div>-->
<!--                <div class="my-3">-->
<!--                    <div id="card-error" :class="token === null ? 'text-danger' : 'text-success'"></div>-->
<!--                </div>-->
                <button :disabled="progress || loading || !name" id="custom-button" class="btn font-weight-bold" style="background: orange" @click="createToken">
                    <b-spinner v-if="progress || loading" small></b-spinner>
                    Submit Card
                </button>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
    /* eslint-disable */
    import { StripeElementCard } from '@vue-stripe/vue-stripe';
    import {stripeToken} from "../../config";

    export default {
        name: "paymentForm",
        components: {
            StripeElementCard,
        },
        props: {fromReport: {default: false}, loading: {required: true}, customerName: {required: false, default: ''}},
        data () {
            return {
                token: null,
                cardNumber: null,
                cardExpiry: null,
                cardCvc: null,
                pulishableKey: stripeToken,
                progress: false,
                zipcode: '',
                name: this.customerName,
                errorMessage: null,
                successMessage: false,
            }
        },
        computed: {
            stripeElements () {
                return this.$stripe.elements();
            },
        },
        mounted() {
            // const style = {
            //     base: {
            //         color: 'black',
            //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            //         fontSmoothing: 'antialiased',
            //         fontSize: '14px',
            //         '::placeholder': {
            //             color: '#aab7c4',
            //         },
            //     },
            //     invalid: {
            //         color: '#fa755a',
            //         iconColor: '#fa755a',
            //     },
            // };
            // this.cardNumber = this.stripeElements.create('cardNumber', { style });
            // this.cardNumber.mount('#card-number');
            // this.cardExpiry = this.stripeElements.create('cardExpiry', { style });
            // this.cardExpiry.mount('#card-expiry');
            // this.cardCvc = this.stripeElements.create('cardCvc', { style });
            // this.cardCvc.mount('#card-cvc');
        },
        beforeDestroy () {
            // this.cardNumber.destroy();
            // this.cardExpiry.destroy();
            // this.cardCvc.destroy();
        },
        methods: {
            // async createToken () {
            //     this.progress = true
            //     this.$emit('load', true)
            //     const { token, error } = await this.$stripe.createToken(this.cardNumber);
            //     this.$emit('load', false)
            //     if (error) {
            //         this.progress = false
            //         if (this.name === '') {
            //             document.getElementById('card-error').innerHTML = 'Please enter name'
            //         } else if (this.zipcode === '') {
            //             document.getElementById('card-error').innerHTML = 'Please enter zipcode'
            //         } else {
            //             document.getElementById('card-error').innerHTML = error.message;
            //         }
            //         this.token = null
            //         this.$emit('generateToken', {
            //             token: null
            //         })
            //         return;
            //     } else {
            //         this.progress = false
            //         this.token = token
            //         document.getElementById('card-error').innerHTML = 'Card was successfully added'
            //         this.$emit('generateToken', {
            //             token: token.id,
            //             nameOnCard: this.name,
            //             zipcode: this.zipcode
            //         })
            //     }
            // },
            createToken () {
                // this will trigger the process
                this.progress = true
                this.errorMessage = null
                this.successMessage = false
                setTimeout(() => {
                    this.$refs.elementRef.submit()
                    this.$nextTick(() => {
                        this.progress = false
                    })
                }, 3000)
            },
            tokenCreated (token) {
                this.errorMessage = null
                this.successMessage = true
                this.token = token
                this.$emit('generateToken', {
                    token: token.id,
                    nameOnCard: this.getName,
                    zipcode: ''
                })
                // handle the token
                // send it to your server
            },
            errorToken (error) {
                this.errorMessage = error.message
                this.successMessage = false
                this.token = null
                this.$emit('generateToken', {
                    token: null
                })
            },
            cancelOperation () {
                this.$emit('cancelOperation')
            }
        }
    }
</script>

<style>
    .StripeElement{
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
    #stripe-element-errors{
        margin-top: 10px !important;
        color: red;
        display: none;
    }
    ::placeholder {
        color: #d3d3d3 !important;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #d3d3d3 !important;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #d3d3d3 !important;
    }
</style>
