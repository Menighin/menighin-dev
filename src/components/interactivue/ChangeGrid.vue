<template>
</template>

<script>

import { Triggers, Components } from './Constants';

export default {
    name: 'ChangeGrid',
    props: {
        layout: {
            required: true,
            type: Array
        },
        trigger: { 
            default: Triggers.ON_INTERACT,
            type: String
        }
    },
    mounted() {
        if (this.$parent.$options.name != Components.INTERACTIVUE)
            throw "ChangeGrid component should be nested on an Interactivue component";
    }
}
</script>

<style>

</style>
