<template>
    <div class="root">
        <h1>CSHARP ASYNC SYNC</h1>
    </div>
</template>

<script>

import { ArticlesMixin } from './ArticlesMixin.js';

export default {
    name: 'CSharpAsync',
    mixins: [ArticlesMixin],
    data() {
        return {
            title: {
                pt: 'Guia definitivo: Async / Await',
                en: 'Definitive guide: Async / Await',
            },
            route: 'c-sharp-async',
            previewImg: '/imgs/csharpsyncasync/preview.png',
            previewText: {
                pt: 'O que são métodos async? Eles rodam em outra thread? Como async pode fazer meu código ficar mais performático? Vamos responder essas e outras perguntas com exemplos.',
                en: 'What are async methods? Do they run in another thread? How can async make my code run faster? Let\'s answer these and another questions with examples.'
            },
            author: 'Joao Menighin',
            publish: '2019-04-03', 
            tags: ['c-sharp', '.net', 'async', 'thread']
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
