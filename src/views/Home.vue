<template>
	<div class="home">
		<div class="articles-container">
			<div class="search">
				<i><font-awesome-icon icon="search" /></i> <input type="text" v-model="search">
			</div>
			<transition-group name="fade" tag="tbody" class="articles">
				<article-preview v-for="(a, i) in paginatedArticles" :key="`a-${i}-${a.name}`" :article="a" @tag-click="tagClick"/>
			</transition-group>
			<div class="pagination">
				<ul class="pages">
					<li v-for="p in pages" :key="p" :class="{active: p == selectedPage}" @click="paginate(p)">{{p}}</li>
				</ul>
			</div>
		</div>
		<div class="right-pane">
			<img alt="Joao Menighin profile picture" src="../assets/imgs/menighin.jpg">
			<span class="quote">{{ quoteComp }}</span>
			<div class="tags">
				<h3>Tags</h3>
				<ul>
					<li v-for="t in tagsCount" :key="t.tag" @click="tagClick(t.tag)">
						<span>{{t.tag}}</span> <span>[{{t.count}}]</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import ArticlePreview from '@/components/ArticlePreview';
import CSharpAsync from '@/components/articles/CSharpAsync';
import DotNetCoreOAuth from '@/components/articles/DotNetCoreOAuth';

const ITEMS_PER_PAGE = 6;

export default {
	name: 'home',
	components: {
		ArticlePreview
	},
	data() {
		return {
			articles: [CSharpAsync],
			search: '',
			selectedPage: 1,
			quote: {
				pt: 'Sim, ainda tá meio vazio aqui',
				en: 'Yes, this is still a bit empty',
			}
		}
	},
	methods: {
		tagClick(tag) {
			this.search = tag;
		},
		paginate(p) {
			this.selectedPage = p;
			this.$router.push({query: {page: p}, exact: true})
		}
	},
	computed: {
		filteredArticles() {
			return this.articles.filter(a => {
				return a.data().tags.filter(t => t.includes(this.search)).length > 0;
			});
		},
		pages() {
			const nPages = Math.ceil(this.filteredArticles.length / ITEMS_PER_PAGE);
			const pages = [];
			for (let i = 1; i <= nPages; i++)
				pages.push(i);
			return pages;
		},
		paginatedArticles() {
			return this.filteredArticles.slice((this.selectedPage - 1) * ITEMS_PER_PAGE, this.selectedPage * ITEMS_PER_PAGE);
		},
		quoteComp() {
			const lang = localStorage.getItem('lang') || 'en';
			return this.quote[lang];
		},
		tagsCount() {
			const articlesCount = this.articles.reduce((pv, cur) => {
				const data = cur.data();
				for (let tag of data.tags) {
					if (!pv.hasOwnProperty(tag))
						pv[tag] = 0;
					pv[tag]++;
				}
				return pv;
			}, {});
			
			return Object.keys(articlesCount).sort((a, b) => a > b ? 1 : -1).map(a => {
				return {
					tag: a,
					count: articlesCount[a]
				}
			});
		}
	},
	created() {
		this.selectedPage = this.$route.query.page || 1;
	}
}
</script>

<style lang="scss" scoped>

	.home {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: auto 280px;
		padding-bottom: 20px;
		padding-top: 20px;

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
					transition: all .3s;

					&:focus {
						outline: none;
						width: 200px;
						transition: all .3s;
						border-bottom: 1px solid #888;
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

			.pagination {
				margin-top: 10px;
				text-align: center;
				ul {
					list-style: none;
					li {
						cursor: pointer;
						display: inline-block;
						padding: 8px 14px;
						border: 1px solid #ccc;
						margin: 5px;
						background: white;
						font-weight: bold;
						transition: all .3s ease-in-out;

						&:hover {
							background: $highlight-color;
							color: white;
							transition: all .3s ease-in-out;
						}

						&.active {
							color: $highlight-color;
							&:hover {
								color: white;
							}
						}
					}
				}
			}
		}

		.right-pane {
			padding: 10px;
			text-align: center;
			img {
				display: inline-block;
				border: 3px solid #fff;
				width: 100%;
				height: auto;
				max-width: 160px;
				border-radius: 50%;
			}
			.quote {
				display: inline-block;
			}
			.tags {
				padding: 10px;
				margin-top: 10px;
				text-align: left; 
				h3 {
					border-bottom: 2px solid #aaa;
					padding: 10px 0;
					margin-bottom: 10px;
				}
				ul {
					list-style: none;
					li {
						display: flex;
						justify-content: space-between;
						padding: 3px 0;
						cursor: pointer;
						&:hover {
							text-decoration: underline;
							color: $highlight-color;
						}
					}
				}
			}
		}
	}

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

</style>