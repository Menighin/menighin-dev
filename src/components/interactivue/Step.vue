<template>
    <div>
    </div>
</template>

<script>
export default {
    name: 'Step',
    props: {
        component: {
            required: true,
            type: Object
        },
        target: {
            required: true,
            type: Number
        },
        props: {
            default: () => {},
            type: Object
        },
        action: {
            default: 'show',
            type: String
        },
    }
}
</script>

<style>

</style>
