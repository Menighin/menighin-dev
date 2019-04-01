<template>
	<div class="love-rating">
		<transition-group name="grow-shrink">
			<svg v-for="(h, i) in hearts" :key="`h-${i}`" class="heart"
				:width="size" :height="size" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<defs>
					<clipPath id="heart">
						<path stroke="blue" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
					</clipPath>
				</defs>

				<rect v-if="h === 'empty'" x="0" y="0" :fill="emptyColor" width="100%" height="100%" clip-path="url(#heart)" />

				<rect v-if="h === 'half'" x="0" y="0" :fill="fillColor" width="50%" height="100%" clip-path="url(#heart)" />
				<rect v-if="h === 'half'" x="50%" y="0" :fill="emptyColor" width="50%" height="100%" clip-path="url(#heart)" />

				<rect v-if="h === 'full'" x="0" y="0" :fill="fillColor" width="100%" height="100%" clip-path="url(#heart)" />
			</svg>
		</transition-group>
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 24
		},
		maxRating: {
			type: Number,
			default: 5
		},
		rating: {
			type: Number,
			default: 2.5
		},
		fillColor: {
			type: String,
			default: 'tomato'
		},
		emptyColor: {
			type: String,
			default: '#999'
		}
	},
	data() {
		return {
			hearts: []
		}
	},
	created() {
		let res = [];

		for (let i = 0; i < Math.floor(this.rating); i++)
			res.push('full');
		
		if (this.rating - Math.floor(this.rating) !== 0)
			res.push('half');
		
		for (let i = 0; i < Math.floor(this.maxRating - this.rating); i++)
			res.push('empty');

		var i = 0;
		var interval = setInterval(() => {
			this.hearts.push(res[i++]);
			if (i === res.length) clearInterval(interval);
		}, 200);
	}
}
</script>

<style lang="scss" scoped>

	.grow-shrink-enter-active, .grow-shrink-leave-active {
		transition: all 0.5s;
	}
	.grow-shrink-enter {
		transform: scale(0);
	}

	.grow-shrink-enter-to, .grow-shrink-leave {
		transform: scale(1);
	}

	.grow-shrink-leave-to {
		transform: scale(0);
	}

	.heart {
		padding: 0 5px;
	}
</style>
