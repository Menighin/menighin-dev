<template>
    <div class="interactivue" ref="interactivue">
        <div 
            class="grid-item"
            v-for="(item, i) in grid" 
            :key="`key-${item.id}`"
            :style="`
                left: ${item.x}px; 
                top: ${item.y}px; 
                width: ${item.width}px;
                height: ${item.height}px;
                padding: ${gridPadding}px;
                transition: all ${gridTransitionTime}ms;`">

            <div class="content" :style="`background-color: ${colors[i]};`">
                <transition name="fade">
                    <component v-if="gridContent[item.id]" :is="gridContent[item.id].component" v-bind="gridContent[item.id].props" />
                </transition>
            </div>

        </div>
        <slot></slot>
        <button style="position: absolute; z-index: 99;" @click="currentStep++">NextStep</button>
    </div>
</template>

<script>

const ACTIONS = {
    Show: 'show'
};
export { ACTIONS };

const COMPONENTS = {
    ChangeGrid: 'ChangeGrid',
    Step: 'Step'
};

export default {
    name: 'Interactivue',
    props: {
        gridTransitionTime: {
            default: 1000,
            type: Number
        },
        gridPadding: {
            default: 5,
            type: Number
        }
    },
    data() {
        return {
            grid: [],
            steps: [],
            gridContent: {},
            currentStep: null,
            width: 0,
            height: 0,
            stepWidth: 0,
            stepHeight: 0,
            colors: ['red', 'blue', 'green', 'pink', 'yellow', 'purple', 'grey']
        };
    },
    watch: {
        currentStep(stepNumber) {
            const step = this.steps[stepNumber];
            if (step.type === COMPONENTS.ChangeGrid) {
                this.calculateGrid(step);
            } else if (step.type === COMPONENTS.Step) {
                this.handleStep(step);
            }
        }
    },
    methods: {
        calculateGrid(step) {
            const layout = step.layout;
            
            // Calculate steps size
            this.stepWidth = this.width / layout[0].length;
            this.stepHeight = this.height / layout.length;

            const ids = [].concat.apply([], layout).reduce((object, l) => { object[l] = true; return object; }, {});

            // Removing deleted items from grid
            for (let i = 0; i < this.grid.length; i++)
                if (!ids[this.grid[i].id])
                    this.grid.splice(i--, 1);


            for (let i = 0; i < layout.length; i++) {
                for (let j = 0; j < layout[i].length; j++) {

                    const id = layout[i][j];
                    const item = this.grid.find(g => g.id === id);

                    const itemAbove = layout[i - 1] ? layout[i - 1][j] : null;
                    const itemOnLeft = layout[i][j - 1] ? layout[i][j - 1] : null;

                    if (!item) {
                        this.grid.push({
                            id,
                            x: j * this.stepWidth,
                            y: i * this.stepHeight,
                            width: this.stepWidth,
                            height: this.stepHeight
                        });
                    } else {
                        
                        // Check if its the first ocurrence of the id
                        if (itemAbove !== id && itemOnLeft !== id) {
                            item.x = j * this.stepWidth;
                            item.y = i * this.stepHeight;
                            item.width = this.stepWidth;
                            item.height = this.stepHeight;
                        }

                        // Is a lower right corner, don't update
                        if (itemAbove === id && itemOnLeft === id) continue;

                        // Is first on row below, update height
                        if (itemAbove === id) item.height += this.stepHeight;

                        // Is first on column on the right, update width
                        if (itemOnLeft === id) item.width += this.stepWidth;
                    }
                }
            }
        },
        handleStep(step) {
            this.$set(this.gridContent, step.target, {
                component: step.component,
                props: step.props
            });
        }
    },
    created() {
        
    },
    mounted() {
        this.width = this.$parent.$el.clientWidth;
        this.height = this.$parent.$el.clientHeight;

        // Generating steps
        this.$children.forEach(c => {
            if (c.$options.name === COMPONENTS.ChangeGrid) {
                this.steps.push({
                    type: COMPONENTS.ChangeGrid,
                    layout: c.layout
                });
            } else if (c.$options.name === COMPONENTS.Step) {
                this.steps.push({
                    type: COMPONENTS.Step,
                    component: c.component,
                    target: c.target,
                    props: c.props,
                    action: c.action
                });
            }
        });

        // Triggers computed property
        this.currentStep = 0;
    }
}
</script>

<style scoped lang="scss">

.interactivue {
    position: relative;

    .grid-item {
        position: absolute;
        display: block;
        box-sizing: border-box;

        .content {
            width: 100%;
            height: 100%;
        }

    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

</style>
