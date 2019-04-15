import prism from "prismjs/prism";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-csharp.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Prism from 'vue-prism-component';


export const ArticlesMixin = {
    components: {
        Prism
    },
    mounted() {
        prism.highlightAll();
    },
    methods: {
        onScroll() {
            const y = this.$refs.index.getBoundingClientRect().y;
            this.fixIndex = y <= 0;
        }
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }
};