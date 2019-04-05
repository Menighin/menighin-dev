<template>
	<div class="home">
		<ul class="articles">
			<li v-for="(a, i) in articles" :key="`a-${i}`"> 
				<article-preview :article="a" />
			</li>
		</ul>
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
			articles: [CSharpAsync]
		}
	},
	created() {

	}
}
</script>

<style lang="scss" scoped>

</style>