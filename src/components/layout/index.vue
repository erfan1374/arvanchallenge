<template>
    <pub v-if="isPublic"></pub>
</template>

<script>
    import pub from './public'
    export default {
        name: "layout",
        components: {pub},
        computed: {
            isPublic () {
                return this.$route.meta && this.$route.meta.public
            }
        },
        metaInfo () {
            return {
                title: this.$route.meta && this.$route.meta.title
            }
        },
        created() {

            // const query = this.$route.query.q
            // this.$router.push(`/ext/billPay?q=${query}`)
        }
    }
</script>

<style>
    /*.subTotal-section{*/
    /*    background: #ffffd3;*/
    /*}*/
    /*body{*/
    /*    background: red !important;*/
    /*}*/
</style>
