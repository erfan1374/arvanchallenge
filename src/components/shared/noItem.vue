<template>
    <b-card class="mb-0 border-0">
        <div class="text-center">
            {{title}}
        </div>
    </b-card>
</template>

<script>
    export default {
        name: "noItem",
        props: {
            title: {
                required: false,
                type: String,
                default: 'No item available'
            }
        }
    }
</script>

<style scoped>

</style>
