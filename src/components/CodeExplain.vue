<template>
    <div class="code-explain">
        <prism class="line-numbers" :language="language" :data-line="highlightLine">
            {{ code }}
        </prism>
        <div class="explanation">
            <div class="control">
                <div @click="moveTo('previous')" v-if="step > 0">
                    <font-awesome-icon icon="angle-left" />
                </div>
            </div>
            <div class="text">{{ explanationComp }}</div>
            <div class="control">
                <div @click="moveTo('next')" v-if="step < explanation.length - 1">
                    <font-awesome-icon icon="angle-right" />
                </div>
            </div>
        </div>
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
    props: {
        language: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true
        },
        explanation: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            step: 0
        }
    },
    computed: {
        explanationComp() {
            if (this.explanation.length == 0) return '';
            return this.explanation[this.step].text;
        },
        highlightLine() {
            if (this.explanation.length == 0) return '';
            return this.explanation[this.step].line;
        }
    },
    methods: {
        moveTo(which) {
            if (which === 'next')
                this.step++;
            else
                this.step--;
                
            this.$nextTick(() => {
                prism.highlightAll();
            });
        }
    },
    mounted() {
        prism.highlightAll();
    }
}
</script>

<style lang="scss" scoped>

    .code-explain {
        pre {
            margin-bottom: 0 !important;
        }
        .explanation {
            border-top: 1px dashed #2d2d2d;
            display: grid;
            grid-template-columns: 30px minmax(0, 1fr) 30px;
            height: 100px;

            .control {
                font-family: Arial, Helvetica, sans-serif;
                background: #2d2d2d;
                display: flex;
                align-content: center;
                justify-content: center;
                line-height: 100px;

                div {
                    width: 100%;
                    cursor: pointer;
                    font-size: 22px;
                    font-weight: bold;
                    color: white;
                    transition: all .5s;
                    text-align: center;
                    
                    &:hover {
                        background: #3d3d3d;
                    }
                }

                
            }

            .text {
                background: #2d2d2d;
                box-sizing: border-box;
                padding: 10px 10px;
            }

        }
    }

</style>
