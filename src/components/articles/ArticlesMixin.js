import prism from "prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-csharp.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import Prism from 'vue-prism-component';


export const ArticlesMixin = {
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
};