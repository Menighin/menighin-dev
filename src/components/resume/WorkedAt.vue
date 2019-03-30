<template>
	<div class="worked-at">
		
		<div class="item">
			<transition name="grow-shrink">
				<div class="content" v-if="showGapso">
					<div class="logo">
						<img alt="Gapso Logo" src="../../assets/gapso.png">
					</div>
					<div class="info">
						<div class="course">Software Developer</div>
						<div class="issuer">Gapso Analytics</div>
						<div class="period">2013-2015</div>
					</div>
				</div>
			</transition>
		</div>
		
		<div class="item">
			<transition name="grow-shrink">
				<div class="content" v-if="showAccenture">
					<div class="logo">
						<img alt="Accenture Logo" src="../../assets/accenture.png">
					</div>
					<div class="info">
						<div class="course">IT Consultant</div>
						<div class="issuer">Accenture Digital</div>
						<div class="period">2015-Now</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showGapso: false,
			showAccenture: false
		}
	},
	methods: {
		toggleGapso(callback) {
			this.showGapso = !this.showGapso;
			setTimeout(callback, 500);
		},
		toggleAccenture(callback) {
			this.showAccenture = !this.showAccenture;
			setTimeout(callback, 1000);
		}
	}
}
</script>

<style scoped lang="scss">

	@import '../interactivue/scss/animations.scss';	

	.worked-at {
		display: flex;
		align-items: center;
		overflow: hidden;
		height: 100%;

		.item {
			flex: 1;
			display: flex;
			align-items: center;

			&:not(:first-child) {
				border-left: 1px solid #ccc;
			}

			.content {
				
				flex: 1;
				display: flex;
				align-items: center;

				.logo {
					padding: 20px;
					flex: 1;
					max-width: 96px;
					height: auto;
					img {
						width: 100%;
						height: auto;
					}
				}

				.info {
					flex: 1;
					text-align: left;
					
					.course {
						font-size: 24px;
					}

					.issuer {
						font-weight: bold;
						color: #777;
					}

					.period {
						font-size: 12px;
					}
				}
			}
		}
	}

</style>
