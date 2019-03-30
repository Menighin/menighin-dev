<template>
	<div class="tech-stack">
		<h2>Tech Love Stack</h2>
		<table>
			<tbody>
				<tr v-for="t in techStackFiltered" :key="t.name">
					<td>{{ t.name }}</td>
					<td><LoveRating :rating="t.love" /></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>

import LoveRating from './LoveRating';

export default {
	components: {
		LoveRating,
	},
	data() {
		return {
			filter: 'lang',
			techStack: [
				{
					name: 'JavaScript',
					love: 5.0,
					type: 'lang'
				},
				{
					name: 'C#',
					love: 5.0,
					type: 'lang'
				},
				{
					name: 'Java',
					love: 4.5,
					type: 'lang'
				},
				{
					name: 'Kotlin',
					love: 5.0,
					type: 'lang'
				},
				{
					name: 'C++',
					love: 2.5,
					type: 'lang'
				},
				{
					name: 'Python 3',
					love: 3.5,
					type: 'lang'
				},
				{
					name: 'TypeScript',
					love: 3.5,
					type: 'lang'
				},

				{
					name: '.NET Core',
					love: 5.0,
					type: 'framework-back'
				},
				{
					name: '.NET',
					love: 4.0,
					type: 'framework-back'
				},
				{
					name: 'Spring Boot',
					love: 5.0,
					type: 'framework-back'
				},
				{
					name: 'Entity Framework-back',
					love: 5.0,
					type: 'framework'
				},
				{
					name: 'Dapper',
					love: 3.0,
					type: 'framework-back'
				},
				{
					name: 'NodeJS',
					love: 4.5,
					type: 'framework-back'
				},
				{
					name: 'Django',
					love: 2.0,
					type: 'framework-back'
				},


				{
					name: 'VueJS',
					love: 5.0,
					type: 'framework-front'
				},
				{
					name: 'Angular',
					love: 3.5,
					type: 'framework-front'
				},
				{
					name: 'React',
					love: 2.0,
					type: 'framework-front'
				},

			]
		}
	},
	computed: {
		techStackFiltered() {
			return this.techStack
				//.filter(o => o.type === this.filter)
				.sort((a, b) => { 
					let diff = b.love - a.love;
					if (diff !== 0) return diff;

					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
		}
	}
}
</script>

<style>

</style>
