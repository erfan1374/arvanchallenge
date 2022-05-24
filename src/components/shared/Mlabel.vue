<template>
    <span class="mb-0">
        <span class="text-dark bold-text">{{title}}: </span>
        <span class="text-muted">
            <slot></slot>
        </span>
    </span>
</template>

<script>
    export default {
        name: "Mlabel",
        props: {
            title: {required: true, type: String, default: 'title'}
        }
    }
</script>

<style scoped>

</style>
