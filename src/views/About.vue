<template>
	<div class="about">
		<interactivue :layout="layout">

			<change-grid :layout="layout" />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT1'}" :target="4" />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT2'}" :target="5" :trigger="Triggers.WITH_PREVIOUS"  />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT3'}" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :action="Actions.HIDE" :target="1" />

			<change-grid :layout="layout2" />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT3'}" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout3" />


		</interactivue>
	</div>
</template>

<script>

import Interactivue from '@/components/interactivue/Interactivue';
import ChangeGrid from '@/components/interactivue/ChangeGrid';
import Step from '@/components/interactivue/Step';
import Test from './Test';
import { Actions, Triggers, Components } from '@/components/interactivue/Constants';

export default {
	name: 'about',
	components: {
		Interactivue,
		ChangeGrid,
		Step,
		Test
	},
	data() {
		return {
			Actions,
			Triggers,
			Components,
			Test: Test,
			layout: [
				[1, 1, 2],
				[3, 4, 2],
				[5, 5, 2]
			],
			layout2: [
				[1, 1, 1],
				[3, 4, 2],
				[5, 5, 5]
			],
			layout3: [
				[1, 1, 1],
				[3, 4, 4],
				[5, 5, 5]
			],
		};
	}
}
</script>

<style>

.about {
	min-height: 600px;
}

</style>