<template>
  <nav class="dash-nav vh-100">
    <ul class="px-0">
      <template v-for="item in items">
        <li class="p-3 text-white d-flex justify-content-between align-items-center" style="cursor:pointer;" :key="item.id" @click="toggleMenu(item)">

          <template v-if="item.children">
            <span>{{item.title}}</span>
            <font-awesome-icon class="" v-if="item.children" :icon="item.open ? 'caret-up' : 'caret-down'"/>
          </template>

          <template v-else>
            <router-link class="text-decoration-none" :to="item.link">
              {{item.title}}
            </router-link>
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
