<template>
  <nav class="dash-nav vh-100">
    <ul class="px-0">
      <template v-for="item in items">
        <li class="text-white d-flex" style="cursor:pointer;" :key="item.id" @click="toggleMenu(item)">
          <template v-if="item.children">
            <div class="p-3 w-100 d-flex justify-content-between align-items-center">
              {{item.title}}
              <font-awesome-icon v-if="item.children" :icon="item.open ? 'caret-up' : 'caret-down'"/>
            </div>
          </template>

          <template v-else>
            <b-link active-class="active-link" exact class="text-decoration-none p-3 w-100" :to="item.link">
              {{item.title}}
            </b-link>
          </template>

        </li>
        <b-collapse v-model="item.open" :key="item.title">
          <sidebar v-if="item.children && item.open" :items="item.children"/>
        </b-collapse>
      </template>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "sidebar",
    props: {
      items: {
        required: true,
        type: Array,
        default: () => []
      }
    },
    mounted() {
      this.items.forEach(item => {
        this.$set(item, 'open', true)
      })
    },
    methods: {
      toggleMenu (item) {
        item.open = !item.open
      }
    }
  }
</script>

<style scoped>

</style>
