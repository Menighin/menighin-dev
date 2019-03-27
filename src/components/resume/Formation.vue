<template>
	<div class="formation">
		<div class="item">
			<div class="logo">
				<img alt="UFV Logo" src="../../assets/ufv.png">
			</div>
			<div class="info">
				<div class="course">Computer Science</div>
				<div class="issuer">Universidade Federal de Viçosa</div>
				<div class="period">2010-2015</div>
			</div>
		</div>
		<div class="item">
			<div class="logo">
				<img alt="U Porto Logo" src="../../assets/uporto.jpg">
			</div>
			<div class="info">
				<div class="course">Masters in Computer Engineering (part)</div>
				<div class="issuer">Universidade do Porto</div>
				<div class="period">2012-2013</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

	.formation {
		display: flex;
		align-items: center;
		height: 100%;

		.item {
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

</style>
