<template>
	<div class="about">
		<interactivue>

			<change-grid :layout="layout" />

			<step :component="Profile" :action="Actions.SHOW" :target="1" :trigger="Triggers.AFTER_PREVIOUS"/>
			<step method="toggleShowQuestion" :action="Actions.METHOD" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />
			<step method="toggleShowName" :action="Actions.METHOD" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />
			<step method="toggleShowInfo" :action="Actions.METHOD" :target="1" :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout2" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :component="Formation" :action="Actions.SHOW" :target="2" :trigger="Triggers.AFTER_PREVIOUS"/>
			<step method="toggleUfv" :action="Actions.METHOD" :target="2" :trigger="Triggers.AFTER_PREVIOUS" />
			<step method="toggleUp" :action="Actions.METHOD" :target="2" :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout3" :trigger="Triggers.AFTER_PREVIOUS" />

			<step :component="WorkedAt" :action="Actions.SHOW" :target="3" :trigger="Triggers.AFTER_PREVIOUS"/>
			<step method="toggleGapso" :action="Actions.METHOD" :target="3" :trigger="Triggers.AFTER_PREVIOUS" />
			<step method="toggleAccenture" :action="Actions.METHOD" :target="3" :trigger="Triggers.AFTER_PREVIOUS" />

			<change-grid :layout="layout4" :trigger="Triggers.AFTER_PREVIOUS" />
			<step :component="TechStack" :action="Actions.SHOW" :target="4" :trigger="Triggers.AFTER_PREVIOUS"/>

		</interactivue>
	</div>
</template>

<script>

import Interactivue from '@/components/interactivue/Interactivue';
import ChangeGrid from '@/components/interactivue/ChangeGrid';
import Step from '@/components/interactivue/Step';
import Profile from '@/components/resume/Profile';
import Formation from '@/components/resume/Formation';
import WorkedAt from '@/components/resume/WorkedAt';
import TechStack from '@/components/resume/TechStack';
import { Actions, Triggers, Components, Animations } from '@/components/interactivue/Constants';

export default {
	name: 'about',
	components: {
		Interactivue,
		ChangeGrid,
		Step,
		Profile,
		Formation,
		WorkedAt,
		TechStack
	},
	data() {
		return {
			Actions,
			Triggers,
			Components,
			Animations,
			Profile: Profile,
			Formation: Formation,
			WorkedAt: WorkedAt,
			TechStack: TechStack,
			layout: [
				[1]
			],
			layout2: [
				[1, 2, 2, 2, 2],
				[1, 2, 2, 2, 2],
				[1, 2, 2, 2, 2],
				[1, 2, 2, 2, 2],
				[1, 2, 2, 2, 2],
				[1, 2, 2, 2, 2],
			],
			layout3: [
				[1, 2, 2, 2, 2],
				[1, 3, 3, 3, 3],
				[1, 3, 3, 3, 3],
				[1, 3, 3, 3, 3],
				[1, 3, 3, 3, 3],
				[1, 3, 3, 3, 3],
			],
			layout4: [
				[1, 2, 2, 2, 2],
				[1, 3, 3, 3, 3],
				[1, 4, 4, 5, 5],
				[1, 4, 4, 5, 5],
				[1, 4, 4, 5, 5],
				[1, 4, 4, 5, 5],
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