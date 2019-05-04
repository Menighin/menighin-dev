<template>
    <div class="article-index">
        <div class="index-content" :class="{ fixed: fixIndex }">
            <ul>
                <li v-for="(h, i) in index" :key="`heading-${i}`"> 
                    <span @click="scrollTo(h)">{{ h.title }}</span>
                    <ul>
                        <li v-for="(sh, j) in h.sub" :key="`heading-${i}-${j}`" @click="scrollTo(sh)">{{ sh.title }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Array,
            required: true
        },
        fixIndex: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        scrollTo(h) {
            h.el.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style lang="scss">
    .article-index {
        padding: 10px;
        font-size: 14px;
        line-height: 16px;

        .index-content {
            &.fixed {
                position: fixed;
                top: 10px;
                width: 260px;
            }

            ul {
                list-style: none;
                > li {
                    padding: 7px 0;
                    font-weight: bold;
                    cursor: pointer;
                    > ul {
                        list-style: circle inside;
                        padding-left: 20px;

                        > li {
                            padding: 5px 0 5px 30px;
                            text-indent: -18px;
                            font-weight: normal;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                    span:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
