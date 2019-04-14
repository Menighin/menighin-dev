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
    }
};