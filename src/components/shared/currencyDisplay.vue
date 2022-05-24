<template>
    <span>
        ${{getValue}}
    </span>
</template>

<script>
    export default {
        name: "currencyDisplay",
        props: {
            value: {
                required: true
            }
        },
        computed: {
            getValue () {
                return this.value === 0 ? '0.00' : this.value.toFixed(2)
            }
        }
    }
</script>

<style scoped>

</style>
