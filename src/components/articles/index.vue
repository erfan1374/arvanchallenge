<template>
  <div>
    <c-loading v-if="initializing"/>
    <div v-else>
      <h2 class="mb-3">All Posts</h2>
      <b-table
        ref="table"
        show-empty
        stacked="md"
        :items="items"
        head-variant="bg-table"
        :fields="fields"
        sort-icon-left
        :empty-text="'No Records'"
        :empty-filtered-text="'NoRecords'"
        :current-page="page"
        :per-page="size"
        :busy.sync="progressing"
        sort-by="Submitted"
        sort-desc
      >
        <template v-slot:cell(author)="{item}">
          @{{item.author.username}}
        </template>
        <template v-slot:cell(tagList)="{item}">
          <tag-display :value="item.tagList"/>
        </template>
        <template v-slot:cell(body)="{item}">
          <body-display :value="item.body"/>
        </template>
        <template v-slot:cell(createdAt)="{item}">
            <date-display :value="item.createdAt"/>
        </template>
        <template v-slot:cell(actions)="{item}">
            <b-dropdown size="sm" dropleft variant="info" no-caret>
              <template #button-content>
                <font-awesome-icon icon="ellipsis-h" class="mx-1 align-middle text-white" />
              </template>

              <b-dropdown-item
                :to="`/dashboard/articles/edit/${item.slug}`"
              >
                <font-awesome-icon
                  icon="pencil-alt"
                  class="align-middle text-info"
                />
                Edit
              </b-dropdown-item>

              <c-modal
                centered
                class="w-100"
                title="Delete Article"
                tag="b-dropdown-item"
                label="Delete"
                icon="trash"
                icon-class="align-middle text-info"
                @submit="(funcs) => deleteArticle(funcs, item)"
                :loading="progressing"
              >
                <template>
                  Are you sure to delete <span class="fw-bold">{{item.title}}</span> Article ?
                </template>
              </c-modal>
            </b-dropdown>
        </template>
      </b-table>
      <div class="d-flex justify-content-center">
        <b-pagination
          v-model="page"
          :total-rows="total"
          :per-page="size"
          @change="changePage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import CLoading from "../shared/CLoading";
  import TagDisplay from "../shared/tagDisplay";
  import BodyDisplay from "../shared/bodyDisplay";
  import DateDisplay from "../shared/dateDisplay";
  import CModal from "../shared/Cmodal";
  export default {
    name: "index",
    components: {CModal, DateDisplay, BodyDisplay, TagDisplay, CLoading},
    data () {
      return {
        items: [],
        total: 0,
        initializing: true,
        progressing: false,
        size: 10,
        page: 1,
        fields: [
          { key: 'title', label: 'Title', class: 'align-middle'},
          { key: 'author', label: 'Author', class: 'align-middle'},
          { key: 'tagList', label: 'Tags', class: 'align-middle'},
          { key: 'body', label: 'Excerpt', class: 'align-middle'},
          { key: 'createdAt', label: 'Created', class: 'align-middle'},
          { key: 'actions', label: '', class: 'align-middle'},
        ]
      }
    },
    mounted() {
      const {page} = this.$route.params
      if (page) this.page = page
      this.getAll()
    },
    methods: {
      getAll () {
        return this.$api.articles.getAll().then(res => {
          this.items = res.articles || []
          this.total = res.articlesCount
          this.initializing = false
        }).catch(this.$fail)
      },
      changePage (page) {
        if (page !== 1) {
          this.$router.push(`/dashboard/articles/page/${page}`)
          this.page = page
        } else {
          this.$router.push('/dashboard/articles')
        }
      },
      deleteArticle (cModalFunctions, {slug}) {
        this.progressing = true
        return this.$api.articles.delete(slug).then(() => {
          this.progressing = false
          cModalFunctions.hide()
          this.getAll()
        }).catch(this.$fail)
      }
    }
  }
</script>

<style scoped>

</style>
