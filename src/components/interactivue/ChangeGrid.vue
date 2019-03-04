<template>
</template>

<script>
export default {
    name: 'ChangeGrid',
    props: {
        layout: {
            required: true,
            type: Array
        }
    },
    mounted() {
        if (this.$parent.$options.name != 'Interactivue')
            throw "ChangeGrid component should be nested on an Interactivue component";
    }
}
</script>

<style>

</style>
