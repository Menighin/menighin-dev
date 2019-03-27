<template>
	<div class="about">
		<interactivue>

			<change-grid :layout="layout" />

			<step :component="Profile" :action="Actions.SHOW" :target="1" :trigger="Triggers.AFTER_PREVIOUS"/>

			<step method="toggleShowName" :action="Actions.METHOD" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />

			<step method="toggleShowInfo" :action="Actions.METHOD" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout2" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :component="Formation" :action="Actions.SHOW" :target="2" :trigger="Triggers.AFTER_PREVIOUS"/>

			<change-grid :layout="layout3" :trigger="Triggers.AFTER_PREVIOUS" />

			<!-- <step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT2'}" :target="5" :trigger="Triggers.WITH_PREVIOUS"  />

			<step :component="Test" method="sayHi" :action="Actions.METHOD" :props="{msg: 'WAT2'}" :target="4" />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT3'}" :target="1" :animation="Animations.SLIDE_LEFT" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :action="Actions.HIDE" :target="1" />

			<change-grid :layout="layout2" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :component="Test" :action="Actions.SHOW" :props="{msg: 'WAT3'}" :target="1" :animation="Animations.SLIDE_LEFT"  :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout3" /> -->


		</interactivue>
	</div>
</template>

<script>

import Interactivue from '@/components/interactivue/Interactivue';
import ChangeGrid from '@/components/interactivue/ChangeGrid';
import Step from '@/components/interactivue/Step';
import Profile from '@/components/resume/Profile';
import Formation from '@/components/resume/Formation';
import Test from './Test';
import { Actions, Triggers, Components, Animations } from '@/components/interactivue/Constants';

export default {
	name: 'about',
	components: {
		Interactivue,
		ChangeGrid,
		Step,
		Profile,
		Formation,
		Test
	},
	data() {
		return {
			Actions,
			Triggers,
			Components,
			Animations,
			Test: Test,
			Profile: Profile,
			Formation: Formation,
			layout: [
				[1]
			],
			layout2: [
				[1, 2, 2, 2],
				[1, 2, 2, 2],
				[1, 2, 2, 2],
				[1, 2, 2, 2]
			],
			layout3: [
				[1, 2, 2, 2],
				[1, 3, 3, 3],
				[1, 3, 3, 3],
				[1, 3, 3, 3]
			],
		};
	}
}
</script>

<style>

.about {
	min-height: 800px;
}

</style>