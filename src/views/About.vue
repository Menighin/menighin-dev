<template>
	<div class="about">
		<interactivue :layout="layout">

			<change-grid :layout="layout" />

			<step :component="Test" :props="{msg: 'WAT'}" :target="4" />

			<change-grid :layout="layout2" />

			<change-grid :layout="layout3" />


		</interactivue>
	</div>
</template>

<script>

import Interactivue from '@/components/interactivue/Interactivue';
import ChangeGrid from '@/components/interactivue/ChangeGrid';
import Step from '@/components/interactivue/Step';
import Test from './Test';

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
	min-height: 1000px;
}

</style>