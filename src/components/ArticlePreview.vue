<template>
    <div class="article-preview">
        <div class="card">
            <div class="img-container"  @click="goTo">
                <div class="img" :style="`background-image: url(${previewImg})`"></div>
                <ul class="tags">
                    <li v-for="t in tags" :key="t" @click="$emit('tag-click', t)"><span>{{ t }}</span></li>
                </ul>
                <div class="title">{{ titleLocalized }}</div>
            </div>
            <div class="info">
                <div class="description">{{ previewTextLocalized }}</div>
            </div>
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
            author: '',
            route: ''
        };
    },
    methods: {
        goTo() {
            this.$router.push(this.route);
        }
    },
    computed: {
        titleLocalized() {
            const lang = localStorage.getItem('lang') || 'en';
            return this.title[lang];
        },
        previewTextLocalized() {
            const lang = localStorage.getItem('lang') || 'en';
            return this.previewText[lang];
        }
    },
    created() {
        let d = this.article.data();

        const requiredProps = ['title', 'previewImg', 'previewText', 'author', 'tags', 'publish', 'route'];
        let missingProperties = [];

        for (let prop of requiredProps) {
            if (!d[prop])
                missingProperties.push(prop);
        }

        if (missingProperties.length > 0)
            throw `One or more required property is not defined in the article: ${missingProperties.join(',')}`;
            
        for (let [k, v] of Object.entries(d))
            if (requiredProps.includes(k))
                this.$set(this, k, v);
    }
}
</script>

<style lang="scss" scoped>

    $border-radius: 3px;

    .article-preview {
        max-width: 400px;
        min-width: 300px;
        padding: 10px;
        display: flex;

        .card {
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            width: 100%;
            border-radius: $border-radius;
            background-color: white;
            display: flex;
            flex-direction: column;

            .img-container {
                height: 200px;
                position: relative;
                overflow: hidden;

                .img {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                    transition: all 0.5s ease;
                    cursor: pointer;
                }

                .tags {
                    position: absolute;
                    top: 0;
                    left: 0;
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
                            background: rgba(255, 255, 255, 0.6);
                            transition: all .5s;
                        }

                        &:hover {
                            > span {
                                background: rgba(255, 255, 255, 0.9);
                                color: $highlight-color;
                                transition: all .5s;
                            }
                        }
                    }
                }

                .title {
                    cursor: pointer;
                    user-select: none;
                    color: $highlight-color;
                    font-weight: bold;
                    position: absolute;
                    bottom: 5px;
                    right: 0px;
                    padding: 5px 10px;
                    background-color: rgba(255, 255, 255, 0.9);
                    transition: all 0.5s ease;
                }

                &:hover {
                    .img {
                        transform: scale(1.3) rotate(3deg);
                    }
                    .title {
                        background-color: $highlight-color;
                        color: white;
                    }
                }
            }

            .info {
                flex: 1 0 auto;
                padding: 10px;

                .description {
                    font-size: 14px;
                }
            }

        }
    }

</style>
