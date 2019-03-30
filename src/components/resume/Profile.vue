<template>
	<div class="profile">
		<div class="profile-picture">
			<img alt="Joao Menighin profile picture" src="../../assets/menighin.jpg">
		</div>
		<div class="profile-info">
			<transition name="slide-right" mode="out-in">
				<h2 v-if="showQuestion" class="name" key="question">Who am I?</h2>
				<h2 v-else-if="showName" class="name" key="name">João Menighin, {{ age }}</h2>
			</transition>
			<transition name="slide-right">
				<ul v-if="showInfo" class="info">
					<li><font-awesome-icon icon="envelope" /> joao.menighin@gmail.com</li>
					<li><font-awesome-icon icon="map-marker" /> Belo Horizonte, Brasil</li>
					<li><font-awesome-icon :icon="['fab', 'github']" /> Menighin</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showName: false,
			showInfo: false,
			showQuestion: false
		}
	},
	methods: {
		toggleShowQuestion(callback) { 
			this.showQuestion = !this.showQuestion;
			setTimeout(callback, 2000);
		},
		toggleShowName(callback) {
			this.showQuestion = false;
			this.showName = !this.showName;
			setTimeout(callback, 2000);
		},
		toggleShowInfo(callback) { 
			this.showInfo = !this.showInfo;
			setTimeout(callback, 2000);
		}
	},
	computed: {
		age() {
			return Math.floor((new Date().getTime() - new Date(1991, 5, 7).getTime()) / (1000 * 60 * 60 * 24 * 365));
		}
	}
}
</script>

<style lang="scss" scoped>

	@import '../interactivue/scss/animations.scss';	

	.profile {

		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-70%);
		text-align: center;

		.profile-picture {
			img {
				width: 100%;
				height: auto;
				max-width: 300px;
				border-radius: 50%;
			}
		}

		.profile-info {
			position: absolute;
			width: 100%;
			text-align: center;

			.name {
				display: inline-block;
				margin: 0 auto;
			}

			.info {
				list-style: none;
				padding: 0;
			}
		}
	}

</style>
