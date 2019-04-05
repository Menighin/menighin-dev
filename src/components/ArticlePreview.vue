<template>
    <div class="root">
        <div class="card">
            <ul class="tags">
                <li v-for="t in tags" :key="t">{{ t }}</li>
            </ul>
            <div class="img"></div>
            <div class="title">{{ title }}</div>
            <div class="description">{{ previewText }}</div>
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
            author: ''
        };
    },
    created() {
        let d = this.article.data();

        let missingProperties = [];

        if (!d.title) missingProperties.push('title');
        if (!d.previewImg) missingProperties.push('previewImg');
        if (!d.previewText) missingProperties.push('previewText');
        if (!d.author) missingProperties.push('author');
        if (!d.tags) missingProperties.push('tags');
        if (!d.publish) missingProperties.push('publish');

        if (missingProperties.length > 0)
            throw `One or more required property is not defined in the article: ${missingProperties.join(',')}`;
            
        for (let [k, v] of Object.entries(d))
            this.$set(this, k, v);
    }
}
</script>

<style lang="scss" scoped>

</style>
