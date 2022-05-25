<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div>
          <h2>New Article</h2>
        </div>
      </b-col>
      <b-col cols="10" md="8">
        <b-form>
          <b-form-group
            class="mb-3"
            label="Title"
            label-for="Title"
            :label-class="{'mb-2': true, 'invalid-label': errors.collect('Title')[0]}"
          >
            <b-form-input
              id="Title"
              :class="{'invalid-input': errors.collect('Title')[0]}"
              name="Title"
              v-model="model.article.title"
              v-validate="'required'"
            ></b-form-input>

            <b-form-invalid-feedback class="mt-2" :state="!errors.has('Title') && null">
              {{ errors.collect('Title')[0] }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Description"
            label-for="Description"
            :label-class="{'mb-2': true, 'invalid-label': errors.collect('Description')[0]}"
          >
            <b-form-input
              id="Description"
              :class="{'invalid-input': errors.collect('Description')[0]}"
              name="Description"
              v-model="model.article.description"
              v-validate="'required'"
            ></b-form-input>

            <b-form-invalid-feedback class="mt-2" :state="!errors.has('Description') && null">
              {{ errors.collect('Description')[0] }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            class="mb-3"
            label="Body"
            label-for="Body"
            :label-class="{'mb-2': true, 'invalid-label': errors.collect('Body')[0]}"
          >
            <b-textarea
              id="Body"
              :class="{'invalid-input': errors.collect('Body')[0]}"
              name="Body"
              v-model="model.article.body"
              v-validate="'required'"
            ></b-textarea>

            <b-form-invalid-feedback class="mt-2" :state="!errors.has('Body') && null">
              {{ errors.collect('Body')[0] }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group>
            <c-button text="Submit" variant="primary" :loading="progressing" @submit="submit"/>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="2" md="4">
        <b-form-group
          class="mb-3"
          label="Tags"
          label-for="Tags"
          label-class="mb-2"
        >
          <b-form-input
            id="Tags"
            placeholder="New tag"
            name="Tags"
          ></b-form-input>
        </b-form-group>
        <b-card body-class="pb-0">
          <c-loading class="mb-3" v-if="initializing"/>
          <b-form-group v-else v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="tags-groups"
              v-model="model.article.tagList"
              :aria-describedby="ariaDescribedby"
              name="tags"
            >
              <b-form-checkbox class="mb-4" v-for="tag in tags" :key="tag" :value="tag">
                <span class="mx-2 h6">{{tag}}</span>
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import modelForm from "./modelForm";
  import CButton from "../shared/CButton";
  import CLoading from "../shared/CLoading";
  export default {
    name: "create",
    components: {CLoading, CButton},
    mixins: [modelForm],
    mounted() {
      this.getAllTags().then(() => {
        this.initializing = false
      })
    },
    methods: {
      submit () {
        this.$validator.validateAll().then(proceed => {
          if (proceed) {
            this.progressing = true
            return this.$api.articles.create(this.model).then(() => {
              this.$success('Well done!! Article created successfully', '/dashboard/articles')
            }).catch(this.$fail)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
