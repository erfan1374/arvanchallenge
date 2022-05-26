<script>
  export default {
    name: "modelForm",
    data () {
      return {
        progressing: false,
        initializing: true,
        tags: [],
        model: {
          article: {
            title: null,
            description: null,
            body: null,
            tagList: []
          }
        }
      }
    },
    methods: {
      getAllTags () {
        return this.$api.tags.getAll().then(res => {
          this.tags = this.sortTagsAlphabetically(res.tags)
        }).catch(this.$fail)
      },
      getArticle(slug) {
        return this.$api.articles.getBySlug(slug).then(res => {
          this.model.article = res.article
        }).catch(this.$fail)
      },
      sortTagsAlphabetically (tags) {
        return tags.sort((a, b) => {
          if (a < b) return -1
          if (a > b) return 1
          return 0
        })
      }
    }
  }
</script>

<style scoped>

</style>
