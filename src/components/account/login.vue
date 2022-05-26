<template>
  <div class="min-vh-100 d-flex flex-row justify-content-center align-items-center">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="6" lg="4">
          <b-form class="account-form p-3">
            <div class="form-title text-center py-4 h1">LOGIN</div>
            <b-form-group
              class="mb-3"
              label="Email"
              label-for="email"
              :label-class="{'mb-2': true, 'invalid-label': errors.collect('email')[0]}"
            >
              <b-form-input
                id="email"
                :class="{'invalid-input': errors.collect('email')[0]}"
                name="email"
                v-model="model.user.email"
                v-validate="'required|email'"
              ></b-form-input>

              <b-form-invalid-feedback class="mt-2" :state="!errors.has('email') && null">
                {{ errors.collect('email')[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              class="mb-3"
              label="Password"
              label-for="password"
              :label-class="{'mb-2': true, 'invalid-label': errors.collect('password')[0]}"
            >
              <b-form-input
                :class="{'invalid-input': errors.collect('password')[0]}"
                id="password"
                type="password"
                name="password"
                v-model="model.user.password"
                v-validate="'required'"
              ></b-form-input>

              <b-form-invalid-feedback class="mt-2" :state="!errors.has('password') && null">
                {{ errors.collect('password')[0] }}
              </b-form-invalid-feedback>
            </b-form-group>


            <c-button :loading="progressing" variant="primary" text="Login" class="w-100 mb-3" @submit="submit"/>

            <b-link to="/register" class="text-decoration-none text-dark">
              Don't have account ? <span class="fw-bold">Register Now</span>
            </b-link>

          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import CButton from "../shared/CButton";
  import * as types from '@/store/types'
  export default {
    name: "login",
    components: {CButton},
    data () {
      return {
        progressing: false,
        model: {
          user: {
            email: null,
            password: null
          }
        }
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(proceed => {
          if (proceed) {
            this.progressing = true
            return this.$api.users.login(this.model).then(res => {
              this.progressing = false
              this.$store.commit(types.SET_ACCOUNT, res.user)
              let go = this.$route.query.go || this.$config.homeUrl
              this.$router.replace(go)
            }).catch(this.$fail)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
