<template>
    <div>
    </div>
</template>

<script>

import { Actions, Triggers, Components, Animations } from './Constants';

export default {
    name: Components.STEP,
    props: {
        component: {
            default: () => null,
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
            default: Actions.SHOW,
            type: String
        },
        trigger: {
            default: Triggers.ON_INTERACT,
            type: String
		},
		animation: {
			default: Animations.FADE,
			type: String
		},
		method: {
			default: null,
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
