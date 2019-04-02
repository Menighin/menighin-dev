<template>
	<div class="formation">
		
		<div class="item">
			<transition name="grow-shrink">
				<div class="content" v-if="showUfv">
					<div class="logo">
						<img alt="UFV Logo" src="../../assets/imgs/ufv.png">
					</div>
					<div class="info">
						<div class="course">Computer Science</div>
						<div class="issuer">Universidade Federal de Viçosa / Brazil</div>
						<div class="period">2010-2015</div>
					</div>
				</div>
			</transition>
		</div>
		
		<div class="item">
			<transition name="grow-shrink">
				<div class="content" v-if="showUp">
					<div class="logo">
						<img alt="U Porto Logo" src="../../assets/imgs/uporto.jpg">
					</div>
					<div class="info">
						<div class="course">Masters in Computer Engineering</div>
						<div class="issuer">Universidade do Porto / Portugal (sandwich) </div>
						<div class="period">2012-2013</div>
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
			showUfv: false,
			showUp: false
		}
	},
	methods: {
		toggleUfv(callback) {
			this.showUfv = !this.showUfv;
			setTimeout(callback, 500);
		},
		toggleUp(callback) {
			this.showUp = !this.showUp;
			setTimeout(callback, 2000);
		}
	}
}
</script>

<style scoped lang="scss">

	@import '../interactivue/scss/animations.scss';	

	.formation {
		display: flex;
		align-items: center;
		height: 100%;
		overflow: hidden;

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
