<template>
    <div class="article-root">

        <div class="article-content" ref="content">
            <h1>{{ titleLocalized }}</h1>
            <template v-for="(c, i) in content">
                <p v-html="$t(c.text)" v-if="c.type === 'p'" :key="`c-${i}`"></p>
                <prism v-if="c.type === 'code'" :key="`c-${i}`" :class="c.class" :language="c.language">{{ c.code }}</prism>
                <h2 v-html="$t(c.text)" v-if="c.type === 'h2'" :key="`c-${i}`"></h2>
                <h3 v-html="$t(c.text)" v-if="c.type === 'h3'" :key="`c-${i}`"></h3>
                <div v-if="c.type === 'quote'" :key="`c-${i}`" class="quote"><h4 v-html="$t(c.text)"></h4></div>
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
            {
                type: 'p',
                text: {
                    pt: `Para melhor entender a diferença entre assíncronismo e multithreading vamos utilizar um exemplo. Você acorda pela manhã e precisa preparar o seu café
                        da manhã que consiste de café e torrada. Para o nosso estudo, essa atividade pode ser feita de 3 maneiras:
                        <ul>
                            <li>
                                <strong>Síncrona:</strong> Você coloca os igredientes do café na cafeteira e espera até que o café esteja pronto para colocá-lo em uma caneca.
                                Em seguida, pega o pão de forma, coloca na torradeira e espera até que a torrada esteja pronto, encarando a torradeira. Quando pronta, você pega a caneca de café
                                e vai pra sala comer enquanto vê um pedaço do jornal da manhã na televisão.
                            </li>
                            <li>
                                <strong>Assíncrona com thread única:</strong> Você coloca os igredientes do café na cafeteira e a liga. Em seguida, você pega o pão de forma e
                                coloca na torradeira. Enquanto o café a torrada estão sendo preparados, você vai na sala assistir um pedaço do jornal. Quando escuta os sons indicando
                                que ambos estão prontos, você serve o café, pega a torrada e senta-se na sala novamente para comer e terminar o jornal.
                            </li>
                            <li>
                                <strong>Assíncrona multithreading:</strong> Você acorda seus pais, pede pra sua mãe preparar o café e pro seu pai preparar a torrada. Enquanto isso,
                                você senta-se na sala e assiste as notícias dos jornais (enquanto seus pais provavelmente reclamam na cozinha, sonhando com o dia que você vai sair de casa
                                e ir pra faculdade).
                            </li>
                        </ul>
                        Do exemplo acima, podemos tirar duas conclusões muito importantes. A primeira é que multithreading é um "tipo" de assíncronismo. A segunda, muito importante e que
                        você deve levar pra sua vida de agora em diante pra nunca mais confundir multithreading com assíncronismo:`
                }
            },
            {
                type: 'quote',
                text: {
                    pt: `<strong>Threading</strong> está relacionado com <strong>Workers</strong>. <strong>Assíncronismo</strong> esta relacionado à <strong>Tasks</strong>.`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `No nosso exemplo, tasks são as diferentes tarefas (preparar o café, preparar o pão, assistir a TV) e workers são as pessoas envolvidas (nossos pais e nós mesmos).`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Mesma thread, tasks diferentes?`,
                    en: `Same thread, different tasks?`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Para o leitor menos acostumado com os conceitos acima tudo pode parecer meio estranho. Afinal, aprendemos na faculdade que um método executa de forma sequencial,
                    linha após linha. Então como é possível uma única thread executar diferentes tasks ao mesmo tempo?`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `A realidade é que uma mesma thread não consegue executar diferentes tasks ao mesmo tempo (ênfase no executar). Basicamente, tasks processor-bound (que dependendem do
                    processador) são executadas de forma sequencial enquanto tasks que não são processor-bound podem ser executadas de forma assíncrona. Ok, isso ficou um pouco confuso.
                    Vamos trazer esses conceitos para o nosso exemplo assíncrono de thread única. Temos várias tasks (preparar café, preparar torrada e assistir TV) e um só worker / thread (nós mesmos).
                    Dessas tasks, preparar o café e as torradas não dependem de nós. Não é necessário que fiquemos encarando a torradeira para que a torrada fique pronta. Portanto elas não são processor-bound.
                    Assistir TV por outro lado, depende totalmente de nós. Se no nosso exemplo tivéssemos duas tasks processor-bound, assitir TV e ouvir o radio por exemplo, não conseguiriámos
                    executá-las de forma assíncrona. Ou estaríamos assitindo a TV ou estaríamos ouvindo o rádio (não! Humanos não são multi-tasking, não importa o quanto você acredite ser!)`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Trazendo o nosso café da manhã de volta para o mundo da programação, fazer o café e as torradas seriam tarefas que não dependem do nosso processador,
                    por exemplo, uma requisição web ou uma operação de input. Por outro lado, assistir TV seria uma operação que depende do nosso processador, como por exemplo algum
                    cálculo ou lógica de negócio.`
                }
            },
            {
                type: 'h2',
                text: {
                    pt: `Async / Await no C#`,
                    en: `Async / Await in C#`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `As keywords async e await foram introduzidas no C# 5.0 e mudaram a forma como programação assíncrona é feita na linguagem. Vamos detalhar como utilizá-las nos próximos tópicos.`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Async`,
                    en: `Async`
                }
            },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
