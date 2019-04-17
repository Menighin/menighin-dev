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

<style>

</style>
