<template>
    <div class="article-root">

        <div class="article-content" ref="content">
            <h1>{{ titleLocalized }}</h1>
            <template v-for="(c, i) in content">
                <p v-html="$t(c.text)" v-if="c.type === 'p'" :key="`c-${i}`"></p>
                <prism v-if="c.type === 'code'" :key="`c-${i}`" :class="c.class" :language="c.language">{{ c.code }}</prism>
                <h2 v-html="$t(c.text)" v-if="c.type === 'h2'" :key="`c-${i}`"></h2>
                <h3 v-html="$t(c.text)" v-if="c.type === 'h3'" :key="`c-${i}`"></h3>
            </template>
        
        </div>

        <article-index :index="articleIndex" :fixIndex="fixIndex" ref="index" />
        
    </div>
</template>

<script>
import './articles.scss';

import { ArticlesMixin } from './ArticlesMixin.js';
import ArticleIndex from './ArticleIndex';

export default {
    name: 'CSharpAsync',
    components: {
        ArticleIndex
    },
    mixins: [ArticlesMixin],
    data() {
        return {
            code: 'var i = new List<string>();\n\n// Now lets do this\npublic void Main(string[] args]\n{\n}',
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
            tags: ['c-sharp', '.net', 'async', 'thread'],
            fixIndex: false,
            content: [
            {
                type: 'p',
                text: {
                    pt: `Esse vai ser um artigo rápido e simples sobre como <strong>usar o Async</strong> pra fazer o seu método rodar em outra thread e mais rápido.
                    Vamos lá, mãos à obra com o primeiro exemplo: `
                }
            },
            {
                type: 'code',
                language: 'csharp',
                class: 'line-numbers',
                code: `class Program
{
    static void Main()
    {
        Console.WriteLine($"[T{Thread.CurrentThread.ManagedThreadId}] Started main");
        var task = HeavyWorkAsync();
        Console.WriteLine($"[T{Thread.CurrentThread.ManagedThreadId}] Ended main");
    }

    public static async Task HeavyWorkAsync()
    {
        Console.WriteLine($"[T{Thread.CurrentThread.ManagedThreadId}] Starting heavy work");
        Task.Delay(2000);
        Console.WriteLine($"[T{Thread.CurrentThread.ManagedThreadId}] Heavy work finished");
    }
}`
            },
            {
                type: 'p',
                text: {
                    pt: `No exemplo acima, temos o método <code>Main</code> chamando o método assíncrono <code>HeavyWorkAsync</code> que simula uma função
                        que executa algum trabalho pesado e demora 2 segundos. Além disso, printamos no início da linha em qual thread o método está rodando e
                        no final da função Main, printamos ainda por quanto tempo a função rodou.
                        Ao executar o código acima, o resultado é:`
                }
            },
            {
                type: 'code',
                language: 'javascript',
                class: '',
                code: `[T1] Started main
[T1] Starting heavy work
[T1] Heavy work finished
[T1] Ended main after 10ms`
            },
            {
                type: 'p',
                text: {
                    pt: `Conforme esperado, o método assíncrono foi executado em outra thr... Espera um pouco... Algo está errado. Aparantemente o método 
                    assíncrono foi executado na mesma thread...? E pior, como o código rodou em 10ms se eu explicitei que o método assíncrono deveria demorar 2s...?`
                }
            },
            {
                type: 'h2',
                text: {
                    pt: `Conceitos`,
                    en: `Concepts`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Pois é, tenho certeza que não fui o primeiro e nem terei sido o último que, ao ver a palavra <code>Async</code> na declaração
                         da função, assumiu que a mesma seria executada assíncrona e (não me xinguem) em outra thread. É uma confusão muito comum entre
                         desenvolvedores. Os conceitos de <strong>Multithreading</strong> e <strong>Asynchronous</strong> são muitas vezes misturados e usados
                         um no lugar do outro. Vamos acabar de vez com essa confusão.`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Assíncronismo X Multithreading`,
                    en: `Asynchronous X Multithreading`
                }
            },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
