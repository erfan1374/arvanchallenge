<template>
  <section>
    <span v-for="(op, index) in value.withUpon" :class="op.class" :key="`with${index}`">
      {{op.item}}
      <span v-if="index < value.withUpon.length - 1">/</span>
    </span>
    <span v-if="value.withUpon.length" class="greenText">
      Upon Request<template class="greenText" v-if="value.withUpon.length && value.withOutUpon.length">,</template>
    </span>
    <span v-for="(op, index) in value.withOutUpon" :class="op.class" :key="`without${index}`">
      {{op.text}}<span v-if="index < value.withOutUpon.length - 1">,</span>
    </span>
  </section>
</template>

<script>
  export default {
    name: "itemOptions",
    props: {
      value: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>
  .greenText{
    color: #388e3c
  }
</style>
