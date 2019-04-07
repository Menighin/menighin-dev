<template>
	<div class="home">

		<div class="articles-container">
			<div class="search">
				<i> <font-awesome-icon icon="search" /></i> <input type="text" v-model="search">
			</div>
			<div class="articles">
				<article-preview v-for="(a, i) in filteredArticles" :key="`a-${i}-${a.name}`" :article="a" @tag-click="tagClick"/>
			</div>
		</div>
		<div class="right-pane">

		</div>
	</div>
</template>

<script>

import ArticlePreview from '@/components/ArticlePreview';
import CSharpAsync from '@/components/articles/CSharpAsync';
import DotNetCoreOAuth from '@/components/articles/DotNetCoreOAuth';

export default {
	name: 'home',
	components: {
		ArticlePreview
	},
	data() {
		return {
			articles: [CSharpAsync, CSharpAsync, CSharpAsync, DotNetCoreOAuth, CSharpAsync, DotNetCoreOAuth, DotNetCoreOAuth, DotNetCoreOAuth, CSharpAsync],
			search: ''
		}
	},
	methods: {
		tagClick(tag) {
			this.search = tag;
		}
	},
	computed: {
		filteredArticles() {
			var self = this;
			var filterFn = function(a) {
				return a.methods.isVisible && a.methods.isVisible(self.search, a);
			}
			return this.articles.filter(filterFn);
		}
	},
	created() {
		console.log(this.articles[0]);
	}
}
</script>

<style lang="scss" scoped>

	.home {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: auto 280px;

		.articles-container {

			.search {
				text-align: center;
				i {
					padding: 3px 10px;
					font-size: 30px;
					vertical-align: middle;
					color: #aaa;
				}
				input {
					height: 22px;
					font-size: 22px;
					padding: 3px 8px;
					background-color: rgba(0, 0, 0, 0);
					outline: none;
					border: none;
					border-bottom: 1px solid #ccc;
					text-align: center;
					width: 150px;
					color: #444;

					&:focus {
						outline: none;
					}
				}
			}

			.articles {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				/deep/ .article-preview {
					flex-grow: 1;
				}
			}
		}

		.right-pane {
			background: deepskyblue;
			padding: 10px;
		}
	}

</style>