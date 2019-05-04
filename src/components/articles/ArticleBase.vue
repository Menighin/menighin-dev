<template>
    <div class="article-root">

        <div class="article-content" ref="content">
            <h1>{{ titleLocalized }}</h1>
            <template v-for="(c, i) in content">
                <p v-html="$t(c.text)" v-if="c.type === 'p'" :key="`c-${i}`"></p>
                <prism v-if="c.type === 'code'" :key="`c-${i}`" :class="c.class" :language="c.language">{{ c.code }}</prism>
                <h2 v-html="$t(c.text)" v-if="c.type === 'h2'" :key="`c-${i}`"></h2>
                <h3 v-html="$t(c.text)" v-if="c.type === 'h3'" :key="`c-${i}`"></h3>
                <div v-if="c.type === 'quote'" :key="`c-${i}`" class="quote"><h4 v-html="$t(c.text)"></h4></div>
                <code-explain v-if="c.type === 'code-explain'" :key="`c-${i}`" :code="c.code" :language="c.language" :explanation="$tCodeExplain(c.explanation)" />
            </template>
        </div>
        <article-index :index="articleIndex" :fixIndex="fixIndex" ref="index" />
        
    </div>
</template>

<script>
import prism from "prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-csharp.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import Prism from 'vue-prism-component';

export default {
    components: {
        Prism
    },
    data() {
        return {
            articleIndex: []
        }
    },
    mounted() {
        prism.highlightAll();

        const contentDiv = this.$refs.content;

        const headings = contentDiv.querySelectorAll('h2, h3');

        let currentMaster = null;
        for (const h of headings) {
            if (h.tagName === 'H2') {
                currentMaster = {
                    title: h.innerHTML,
                    el: h,
                    sub: []
                };
                this.articleIndex.push(currentMaster);
            } else if (h.tagName === 'H3') {
                currentMaster.sub.push({
                    title: h.innerHTML,
                    el: h
                });
            }
        }
    },
    methods: {
        onScroll() {
            const y = this.$refs.index.$el.getBoundingClientRect().y;
            this.fixIndex = y <= 0;
        },
        $t(data) {
            const lang = localStorage.getItem('lang') || 'en';
            return data[lang];
        },
        $tCodeExplain(array) {
            const lang = localStorage.getItem('lang') || 'en';
            return array.map(i => ({text: i[lang], line: i.line}));
        }
    },
    computed: {
        titleLocalized() {
            const lang = localStorage.getItem('lang') || 'en';
            return this.title[lang];
        }
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style lang="scss">

.article-root {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: minmax(0, 1fr) 280px;
    box-sizing: border-box;
    min-height: 100%;
    background: #fff;

    @media only screen and (max-width: $large-device-width) {
        grid-template-columns: minmax(0, 1fr);
    }

    h1, h2, h3 {
        padding: 20px 0 10px;
    }

    p {
        padding: 5px 0;
        text-indent: 30px;
        code {
            font-size: 14px;
            background: #f1f1f1;
            padding: 0 3px;
        }
    }

    ul {
        list-style-position: inside;
        li {
            padding: 5px 0;
            text-indent: 30px;
        }
    }

    .quote {
        box-sizing: border-box;
        padding: 15px 15px;
        text-align: center;
        font-style: italic;
        background: rgb(255, 252, 215);
    }

    .article-content {
        padding: 20px;
        font-family: 'Montserrat Regular', Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 22px;
        text-align: justify;
    }
}

</style>
