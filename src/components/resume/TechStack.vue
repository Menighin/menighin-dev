<template>
	<div class="tech-stack" ref="tech-stack-root">
		<div class="header">
			<h2>Tech Love Stack</h2>
			<select v-model="filter">
				<option v-for="(o, i) in filterOptions" :key="`o-${i}`" :value="o.value">{{ o.name }}</option>
			</select>
		</div>
		<table ref="tech-stack-table">
			<transition-group name="fade" tag="tbody">
				<tr v-for="t in techStackFiltered" :key="t.name">
					<td class="name">{{ t.name }}</td>
					<td class="rating"><LoveRating :rating="t.love" /></td>
				</tr>
			</transition-group>
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
			filter: 'all',
			filterOptions: [
				{
					name: 'All',
					value: 'all'
				},
				{
					name: 'Languages',
					value: 'lang'
				},
				{
					name: 'Backend Frameworks',
					value: 'framework-back'
				},
				{
					name: 'Frontend Frameworks',
					value: 'framework-front'
				},
				{
					name: 'Databases',
					value: 'database'
				}
			],
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
					love: 3.5,
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
					name: 'Entity Framework',
					love: 5.0,
					type: 'framework-back'
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
					name: 'Express',
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
				{
					name: 'Electron',
					love: 5.0,
					type: 'framework-front'
				},

				{
					name: 'MongoDB',
					love: 5.0,
					type: 'database'
				},
				{
					name: 'MySQL',
					love: 5.0,
					type: 'database'
				},
				{
					name: 'SQL Server',
					love: 5.0,
					type: 'database'
				},
				{
					name: 'PostgreSQL',
					love: 4.0,
					type: 'database'
				},
				{
					name: 'Oracle 12c',
					love: 2.0,
					type: 'database'
				},

			]
		}
	},
	mounted() {
		const height = this.$refs['tech-stack-root'].clientHeight;
		this.$refs['tech-stack-table'].style.height = `${height - 50}px`;
	},
	computed: {
		techStackFiltered() {
			return this.techStack
				.filter(o => o.type === this.filter || this.filter === 'all')
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

<style lang="scss" scoped>

	.fade-enter-active, .fade-leave-active, .fade-move {
		transition: all 0.5s;
	}

	.fade-enter, .fade-leave-active {
		opacity: 0;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}

	.fade-leave-active {
		position: absolute;
	}

	.tech-stack {
		padding: 20px 0 20px 20px;
		overflow: hidden;
		height: 97%;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			h2 {
				padding: 0;
				margin: 0;
			}
			select {
				padding: 5px;
			}
		}

		table {

			// height: 300px;
			display: block;
			overflow-y: scroll;
			margin-top: 15px;

			&::-webkit-scrollbar {
				width: 5px;
			}

			&::-webkit-scrollbar-track {
				background: #f1f1f1; 
			}
			
			&::-webkit-scrollbar-thumb {
				background: #ccc; 
			}

			&::-webkit-scrollbar-thumb:hover {
				background: #555; 
			}

			tr {
				transition: all 1s;

				td.name {
					text-align: right;
					min-width: 120px;
				}
			}
		}
	}

</style>
