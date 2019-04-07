<template>
    <div class="root">
        <h1>CSHARP ASYNC SYNC</h1>
    </div>
</template>

<script>
export default {
    name: 'DotNetCoreOAuth',
    data() {
        return {
            title: {
                pt: 'Autenticação com OAuth',
                en: 'OAuth authentication',
            },
            previewImg: '/imgs/dotnetcoreoauth/preview.png',
            previewText: {
                pt: 'Aprendendo a implementar autenticacao OAuth',
                en: 'OAuth authentication with .Net Core 2.2'
            },
            author: 'Joao Menighin',
            publish: '2019-04-03', 
            tags: ['c-sharp', '.net-core', 'oauth', 'asp-net-core']
        }
    },
    methods: {
        isVisible(filter, self) {
            const data = self.data();
            return data.tags.filter(t => t.includes(filter)).length > 0;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
