<template>
    <div class="article-preview">
        <div class="card">
            <div class="img" :style="`background-image: url(${previewImg})`">
                <ul class="tags">
                    <li v-for="t in tags" :key="t"><span>{{ t }}</span></li>
                </ul>
                <div class="title">{{ titleLocalized }}</div>
            </div>
            <div class="description">{{ previewTextLocalized }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            tags: [],
            title: '',
            previewText: '',
            previewImg: '',
            publish: '',
            author: ''
        };
    },
    computed: {
        titleLocalized() {
            return this.title['pt'];
        },
        previewTextLocalized() {
            return this.previewText['pt'];
        }
    },
    created() {
        let d = this.article.data();

        let missingProperties = [];

        if (!d.title) missingProperties.push('title');
        if (!d.previewImg) missingProperties.push('previewImg');
        if (!d.previewText) missingProperties.push('previewText');
        if (!d.author) missingProperties.push('author');
        if (!d.tags) missingProperties.push('tags');
        if (!d.publish) missingProperties.push('publish');

        if (missingProperties.length > 0)
            throw `One or more required property is not defined in the article: ${missingProperties.join(',')}`;
            
        for (let [k, v] of Object.entries(d))
            this.$set(this, k, v);
    }
}
</script>

<style lang="scss" scoped>

    .article-preview {
        max-width: 400px;
        min-width: 300px;
        padding: 10px;

        .card {
            border: 1px solid #ccc;
            width: 100%;

            .img {
                height: 200px;
                background-size: cover;
                background-position: center;

                .tags {
                    list-style: none;
                    padding: 5px 0 0 2px;

                    > li {
                        display: inline-block;
                        cursor: pointer;

                        > span {
                            font-family: monospace;
                            font-weight: bold;
                            font-size: 12px;
                            padding: 3px 5px;
                            margin: 0 3px;
                            background: rgba(255, 255, 255, 0.4);
                            transition: background .5s;
                        }

                        &:hover {
                            > span {
                                background: rgba(255, 255, 255, 0.7);
                                transition: background .5s;
                            }
                        }
                    }
                }

                .title {
                    color: white;
                }

            }

        }
    }

</style>
