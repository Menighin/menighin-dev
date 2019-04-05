<template>
	<div class="home">
		<div class="articles">
			<article-preview v-for="(a, i) in articles" :key="`a-${i}`" :article="a" />
		</div>
		<div class="right-pane">

		</div>
	</div>
</template>

<script>

import ArticlePreview from '@/components/ArticlePreview';
import CSharpAsync from '@/components/articles/CSharpAsync';

export default {
	name: 'home',
	components: {
		ArticlePreview
	},
	data() {
		return {
			articles: [CSharpAsync, CSharpAsync]
		}
	},
	created() {

	}
}
</script>

<style lang="scss" scoped>

	.home {
		display: grid;
  		grid-gap: 10px;
		grid-template-columns: auto 280px;

		.articles {
			background: tomato;
		}

		.right-pane {
			background: deepskyblue;
			padding: 10px;
		}
	}

</style>