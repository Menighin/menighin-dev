<template>
    <div class="code-explain">
        <prism ref="code" class="line-numbers" :language="language" :data-line="highlightLine">{{ code }}</prism>
        <div class="explanation">
            <div class="control">
                <div @click="moveTo('previous')" v-if="step > 0">
                    <font-awesome-icon icon="angle-left" />
                </div>
            </div>
            <div class="content">
                <div class="text">
                    <transition :name="animation" mode="out-in">
                        <div :key="explanationComp" v-html="explanationComp"></div>
                    </transition>
                </div>
                <div class="steps">
                    {{ step + 1 }} / {{ explanation.length }}
                </div>
            </div>
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
            step: 0,
            animation: 'slide-right'
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
            if (which === 'next') {
                this.animation = 'slide-right';
                this.step++;
            }
            else {
                this.animation = 'slide-left';
                this.step--;
            }
                
            this.$nextTick(() => {
                prism.highlightAll();
            });

            let line = this.explanation[this.step].line;

            if (line) {
                let code = this.$refs.code;
                const spans = code.querySelectorAll('.line-numbers-rows span');

                let lineToScroll = Math.max(0, line - 6);

                spans[lineToScroll].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    },
    mounted() {
        prism.highlightAll();
    }
}
</script>

<style lang="scss" scoped>

    $explanation-height: 120px;

    .code-explain {

        ::-webkit-scrollbar {
            width: 7px;
        }

        ::-webkit-scrollbar-track {
            background: #2d2d2d; 
        }
        
        ::-webkit-scrollbar-thumb {
            background: #4d4d4d; 
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }

        pre {
            margin-bottom: 0 !important;
            max-height: 500px;
        }
        .explanation {
            border-top: 1px dashed #6d6d6d;
            display: grid;
            grid-template-columns: 30px minmax(0, 1fr) 30px;
            height: $explanation-height;
            background: #2d2d2d;

            .control {
                font-family: Arial, Helvetica, sans-serif;
                background: #2d2d2d;
                display: flex;
                align-content: center;
                justify-content: center;
                line-height: $explanation-height;

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

            .content {
                background: #2d2d2d;
                box-sizing: border-box;
                padding: 10px 10px;
                color: #ccc;

                display: grid;
                grid-template-rows: minmax(0, 1fr) 15px;
                height: $explanation-height;

                .text {
                    overflow-y: auto;
                    overflow-x: hidden;

                }

                .steps {
                    background: #2d2d2d;
                    text-align: center;
                    color: white;
                    padding-top: 5px;
                }
            }

        }

    }

    .slide-right-enter-active, .slide-right-leave-active {
        transition: all .3s;
    }
    .slide-right-enter {
        transform: translateX(-300px);
        opacity: 0;
    }

    .slide-right-enter-to, .slide-right-leave {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-right-leave-to {
        transform: translateX(300px);
        opacity: 0;
    }

    .slide-left-enter-active, .slide-left-leave-active {
	transition: all .3s;
    }
    .slide-left-enter {
        transform: translateX(300px);
        opacity: 0;
    }

    .slide-left-enter-to, .slide-left-leave {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-left-leave-to {
        transform: translateX(-300px);
        opacity: 0;
    }

</style>
