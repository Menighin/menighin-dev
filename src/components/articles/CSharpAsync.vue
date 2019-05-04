<script>

import ArticleIndex from './ArticleIndex';
import CodeExplain from '../CodeExplain';
import ArticleBase from './ArticleBase';

export default {
    name: 'CSharpAsync',
    components: {
        ArticleIndex,
        CodeExplain
    },
    extends: ArticleBase,
    data() {
        return {
            title: {
                pt: 'Async / Await: Primeiros passos',
                en: 'Async / Await: First steps',
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
                    pt: `Esse vai ser um artigo rápido e simples sobre como usar o <code>async</code> pra fazer o seu método rodar em outra thread e mais rápido.
                    Vamos lá, mãos à obra com o primeiro exemplo: `,
                    en: `This is going to be a quick and simple article on how to use <code>async</code> to make your method run in another thread and faster. Let's 
                    start with our first example then: `
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
                        Ao executar o código acima, o resultado é:`,
                    en: `In the above example, we have the <code>Main</code> method calling the asynchronous <code>HeavyWorkAsync</code> that simulates the execution of 
                    some heavy task and take 2 seconds to be done. We are also printing, at the begining of the line, in which thread the method is running and, at the end of 
                    the <code>Main</code>, we print for how long the method has ran.
                    Executing the above code we get the following output:`
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
                    assíncrono foi executado na mesma thread...? E pior, como o código rodou em 10ms se eu explicitei que o método assíncrono deveria demorar 2s...?`,
                    en: `As expected, the asynchronous method was executed in anot... Wait a sec... Something is wrong. Apparently the method was executed on the same thread...? 
                    And worse, how did the code ran in 10ms if I had explicitly told it to run in 2s...?`
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
                    pt: `Pois é, tenho certeza que não fui o primeiro e nem terei sido o último que, ao ver a palavra <code>async</code> na declaração
                         da função, assumiu que a mesma seria executada assíncronamente e (não me xinguem) em outra thread. É uma confusão muito comum entre
                         desenvolvedores. Os conceitos de <strong>Multithreading</strong> e <strong>Asynchronous</strong> são muitas vezes misturados e usados
                         um no lugar do outro. Vamos acabar de vez com essa confusão.`,
                    en: `Yes, I'm sure I wasn't the first nor will be the last that, seeing the <code>async</code> word in a method's signature, assumed it would be executed 
                        asynchronously and (don't kill me) in another thread. It is a very commom mistake among developers. The concepts of <strong>Multithreading</strong> and
                        <strong>Asynchronous</strong> are a lot of times confused and used as if they were interchangeable. Let's end this confusion.`
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
                                e ir pra faculdade). Quando o café e a torrada estão prontos, seus pais trazem até você na sala para que você possa comer.
                            </li>
                        </ul>
                        <p>Do exemplo acima, podemos tirar duas conclusões muito importantes. A primeira é que multithreading é um "tipo" de assíncronismo. A segunda, muito importante e que
                        você deve levar pra sua vida de agora em diante pra nunca mais confundir multithreading com assíncronismo:</p>`,
                    en: `To better understand the differences between asynchronous and multithreading let's use an example. You wake up in the morning and need to prepare your
                    breakfast consisting of coffee and toast. For our study, this activity can be done in 3 different ways:
                        <ul>
                            <li>
                                <strong>Synchronous:</strong> You put the ingredients of the coffee in the coffee machine, turn it on and wait until it is ready to put it in a mug.
                                Then you get the bread, put it in the toaster, turn it on and wait until the toast is ready, staring at the toaster. When ready, you take both the
                                mug and the toast and head to the living room to watch some morning news on TV, while eating your breakfast.
                            </li>
                            <li>
                                <strong>Single-thread Asynchronous:</strong> You put the ingredients on the coffee machine and turn it on. Next, you take the bread and put it in
                                the toaster. While the coffee and the toast are being prepared, you head to the living room to watch the morning news. When you hear the sounds indicating
                                both are ready, you pour the coffee, take the toast and seat back on the living room to eat the breakfast.
                            </li>
                            <li>
                                <strong>Multi-thread Asynchronous:</strong> You wake up your parents, ask your mom to prepare the coffee and your dad to prepare the toast. Meanwhile, you
                                sit on the living room to watch the morning news (while your parents are probably complaining in the kitchen, dreaming of the day you will leave for college).
                                When the breakfast is ready, your parents bring it to you on the living room where you can eat it.
                            </li>
                        </ul>
                        <p>From the above example, we can take two very important conclusions. The first one is that multithreading is a "type" of asynchronism. The second one will help you to
                        never mix these concepts again: `
                }
            },
            {
                type: 'quote',
                text: {
                    pt: `<strong>Multithreading</strong> está relacionado com <strong>Workers</strong>. <strong>Assíncronismo</strong> esta relacionado à <strong>Tasks</strong>.`,
                    en: `<strong>Multithreading</strong> is related to <strong>Workers</strong>. <strong>Asynchronism</strong> is related to <strong>Tasks</strong>.`,
                }
            },
            {
                type: 'p',
                text: {
                    pt: `No nosso exemplo, tasks são as diferentes tarefas (preparar o café, preparar o pão, assistir a TV) e workers são as pessoas envolvidas (nossos pais e nós mesmos).`,
                    en: `In our example, we have different tasks (prepare the coffee, prepare the toast, watch tv) and workers are the people involved (our parents and ourselves).`
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
                    linha após linha. Então como é possível uma única thread executar diferentes tasks ao mesmo tempo?`,
                    en: `To the reader less used to the above concepts, it all can seem a bit odd. After all, we usually learn that a method runs sequentially, line after line.
                    So how is it possible that only one thread execute different tasks at the same time?`
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
                    executá-las de forma assíncrona. Ou estaríamos assitindo a TV ou estaríamos ouvindo o rádio (não! Humanos não são multi-tasking, não importa o quanto você acredite ser!)`,
                    en: `The truth is a thread cannot execute different tasks at the same time (emphasis on "execute"). Basically, tasks processor-bound (that depend on the processor) are executed
                    in sequentially while tasks that are not processor-bound can be executed asynchronously. Ok, that's a bit confusing. Let's bring these concepts to our single-thread asynchronous
                    example. We have several tasks - prepare the coffee, the toast and watch TV -  and just one worker / thread - ourselves. From these tasks, prepare the coffee
                    and the toast do not depend on us. It is not necessary for us to be staring at the toaster for the toast to get done. Therefore, they are not processor-bound.
                    Watch the TV, on the other hand, depends totally on us. We need to pay attention on it, so it as a processor-boynd task. If in our example we had two processor-bound tasks,
                    watch the TV and listen to a radio for example, we wouldn't be able to do them in an asynchronous way. Either we would be watching the TV or we would be listening to the radio 
                    (no! Humans cannot multi-task!).`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Trazendo o nosso café da manhã de volta para o mundo da programação, fazer o café e as torradas seriam tarefas que não dependem do nosso processador,
                    por exemplo, uma requisição web ou uma operação de input. Por outro lado, assistir TV seria uma operação que depende do nosso processador, como por exemplo algum
                    cálculo ou lógica de negócio.`,
                    en: `Bringing our breakfast back to the programming world, preparing the coffee and the toast would be non processor-bound tasks, for example, a web request or an
                    input operation. On the other hand, watch the TV would be a processor-bound task, like some math operation or business logic.`
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
                    pt: `As keywords <code>async</code> e <code>await</code> foram introduzidas no C# 5.0 e mudaram a forma como programação assíncrona é feita na linguagem. Vamos detalhar como utilizá-las nos próximos tópicos.`,
                    en: `The keywords <code>async</code> and <code>await</code> were introduced in C# 5.0 and changed the way we do asynchronous programming. Let's detail a bit how to use them on the next topics.`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Async`,
                    en: `Async`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `A palavra reservada <code>async</code> é utilizada para marcar um método e indicar que o mesmo é assíncrono (retorna um <code>awaitable</code>). O uso do <code>async</code> no método habilita
                    a possibilidade de se utilizar o <code>await</code> no seu corpo e é basicamente tudo o que ele faz. Marcar um método como <code>async</code> simplesmente <strong>não</strong>
                    irá fazê-lo executar automaticamente de forma assíncrona.`,
                    en: `The keyword <code>async</code> is used to mark a method and indicate that the method is asynchronous (returns an <code>awaitable</code>). The use of <code>async<code> in the signature enables
                    the possibility to use the <code>await</code> keyword in the method body and that's pretty much all it does. Mark a method as <code>async</code> will not automatically make it run asynchronously.`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Um método marcado como <code>async</code> deve ter um dos seguintes tipos de retorno:
                    <ul>
                        <li><code>Task</code></li>
                        <li><code>Task&ltTResult&gt</code></li>
                        <li><code>void</code></li>
                    </ul>
                    Para um método <code>async</code> que não retorne nada, deve-se preferir retornar <code>Task</code> ao invés de <code>void</code>.
                    Retornar <code>void</code> deve ser usado especificamente quando lidando com eventos. Para uma leitura mais aprofundada sobre as diferenças
                    de retornar <code>void</code> ou <code>Task</code>, recomendo <a href="https://jaylee.org/archive/2012/07/08/c-sharp-async-tips-and-tricks-part-2-async-void.html">este artigo</a>.
                    <br/>Vamos ver um exemplo:`,
                    en: `A method marked as <code>async</code> should have one of the following return types:
                    <ul>
                        <li><code>Task</code></li>
                        <li><code>Task&ltTResult&gt</code></li>
                        <li><code>void</code></li>
                    </ul>
                    For an <code>async</code> method that does not return anything, one should return <code>Task</code> instead of <code>void</code>.
                    Returning <code>void</code> should be used specifically when dealing with events. For a deeper reading on the differences between returning
                    <code>void</code> or <code>Task</code>, I recommend <a href="https://jaylee.org/archive/2012/07/08/c-sharp-async-tips-and-tricks-part-2-async-void.html">this great article</a>.<br />
                    Let's see and example:`
                }
            },
            {
                type: 'code',
                language: 'csharp',
                class: 'line-numbers',
                code: `public async Task<int> GetNumberOfFriendsAsync()
{
    // Do an HTTP request to fetch the friends
    int friends = await FetchNumberOfFriendsFromRemoteHttpServiceAsync();
    return friends;
}`
            },
            {
                type: 'p',
                text: {
                    pt: `Um detalhe importante de se notar é que apesar do tipo de retorno ser <code>Task&lt;int&gt;</code> estamos retornando um <code>int</code> diretamente.
                    Se o retorno fosse do tipo <code>Task</code> somente, não precisaríamos retornar nada (como se o método fosse <code>void</code>. Essa é uma das mágicas
                    do <code>async</code>. O compilador trata de encapsular os retornos em Tasks de forma eficiente.`,
                    en: `An important detail to notice is, although the return type is <code>Task&lt;int&gt;</code>, we are returning an <code>int</code> explicitly. If
                    the return type were <code>Task</code>, we wouldn't need to return anything (just like <code>void</code>). This is one of the magics of the <code>async</code>.
                    It already unboxes the generic value from a <code>Task</code> when resolved.`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Await`,
                    en: `Await`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `A palavra reservada <code>await</code> atua como um operador unário recebendo um parâmetro - um <code>awaitable</code>. Um <code>awaitable</code> é qualquer
                    operação assíncrona, uma task por exemplo. O <code>await</code> checa se a operação assíncrona já terminou e é aqui que as coisas ficam menos... sequenciais:
                    <ul>
                        <li> Se a operação assíncrona já terminou, o <code>await</code> não muda em nada o fluxo e a execução segue normalmente;</li>
                        <li> Se a operação assíncrona não terminou, o <code>await</code> captura o contexto, para a execução e retorna o controle para a função chamante. A função chamante continua sua execução normalmente.
                        Quando o <code>awaitable</code> é resolvido na função assíncrona, o contexto do método assíncrono é retornado e o fluxo de execução continua após o <code>await</code>.</li>
                    </ul>`,
                    en: `The keyword <code>await</code> acts as a unary operator. It receives a parameter - an <code>awaitable</code>. An <code>awaitable</code> is any asynchronous
                    operation, like a task. The <code>await</code> checks if the asynchronous operation is finished and here is where things get a little less... sequential:
                    <ul>
                        <li> If the async operation has finished, the <code>await</code> doesn't change in any way the flow of the code. It executes just like a "normal" method;</li>
                        <li> If the async operation hasn't finished, the <code>await</code> captures the context, stops the execution and returns the control to the caller function. 
                        The caller function continues its execution as if nothing happened (because it actually hasn't... yet).
                        When the <code>awaitable</code> is resolved in the async function, the context in the async method is restored and the execution flow continues after the <code>await</code>.</li>
                    </ul>`
                }
            },
            {
                type: 'h3',
                text: {
                    pt: `Contexto Async`,
                    en: `Async Context`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Quando um <code>await</code> é executado em um <code>awaitable</code> que não terminou, o <code>awaitable</code> captura o contexto e, após a operação assíncrona
                        terminar, restaura esse contexto. Basicamente isso quer dizer que se uma operação assíncrona foi iniciada no contexto de uma requisição ASP.Net por exemplo, ela também
                        será resumida nesse mesmo contexto. E tudo isso é feito de forma transparente para o desenvolvedor (que ótimo, não?).`,
                    en: `When an <code>await</code> is executed in an <code>awaitable</code> that has not finished yet, the <code>awaitble</code> saves the context and, after resolving the async
                        operation, restores it. Basically, this means that an async operation started in the context of an ASP.Net request, for example, will have the same context when resumed.
                        And all of this is managed behind the scenes for you!`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Entendendo como o contexto é manuseado fica claro que assíncronismo é diferente de multi-threading. Todo o método assíncrono é executado no mesmo contexto por default e, portanto,
                        na mesma thread. Em alguns tipos de aplicação, Console Application por exemplo, não existe um <code>SynchronizationContext</code>. Nesses cenários, o contexto padrão adotado é <code>Thread Pool</code>.
                        Assim sendo, os métodos assíncronos podem rodar em threads diferentes neste cenário. Além disso, podemos explicitamente dizer para o nosso <code>await</code> não restaurar o contexto ao esperar uma task
                        através do <code>ConfigureAwait()</code>:`,
                    en: `By understanding how the context is managed it also makes clear that asynchronism is different from multi-threading. Every async method is executed, by default, on the same context and therefore
                        on the same thread. In some types of application, Console Application for example, there is no <code>SynchronizationContext</code>. In these scemarios, the default context is the Thread Pool context,
                        meaning that an async method CAN run in another thread. Furthermore, we can explicitly tell <code>await</code> to not restore the context when resolving the task with <code>ConfigureAwait()</code>:`
                }
            },
            {
                type: 'code',
                language: 'csharp',
                class: 'line-numbers',
                code: `public async Task DoSomething()
{
    // Do something here...
    await LogOnFileAsync().ConfigureAwait(false);
}

public async Task LogOnFileAsync()
{
    await WriteToFileAsync(...);
    // From here on, we are in a different context
}`
            },
            {
                type: 'h2',
                text: {
                    pt: `Mãos à obra`,
                    en: `Hands on`
                }
            },
            {
                type: 'p',
                text: {
                    pt: `Muito bem, vamos fazer finalmente o nosso café da manhã assíncrono. No exemplo abaixo, utilize as setas para seguir com a explicação passo a passo.`,
                    en: `Ok, so let's finally prepare our async coffee. In the below example, make use of the arrows to navigate through the code explanation.`
                }
            },
            {
                type: 'code-explain',
                code: `class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("Wake up and go to the kitchen!");

        // Start the coffee
        var coffeeTask = PrepareCoffeeAsync();

        // Start the toast
        var toastTask = PrepareToastAsync();

        // Then let's watch some TV
        Console.WriteLine("Let's watch some TV meanwhile.");

        // Await for the tasks
        Task.WhenAll(coffeeTask, toastTask);

        Console.WriteLine("Everything is ready. Let's eat!");
    }

    static async Task PrepareCoffeeAsync()
    {
        Console.WriteLine("Put the ingredients into the coffee machine and turn it on");
        await Task.Delay(2000);
        Console.WriteLine("Coffee is ready!");
    }

    static async Task PrepareToastAsync()
    {
        Console.WriteLine("Put the toast into the toaster and turn it on");
        await Task.Delay(3000);
        Console.WriteLine("Toast is ready!");
    }
}`,
                language: 'csharp',
                explanation: [
                    {
                        pt: `Acordamos e vamos até a cozinha preparar o nosso café.`,
                        en: 'We wake up and head up to the kitchen to prepare our breakfast.',
                        line: 5
                    },
                    {
                        pt: `Chamamos o método assíncrono para iniciar o preparo do café`,
                        en: 'We call the async method to start preparing the coffee',
                        line: 8
                    },
                    {
                        pt: `O método assíncrono é iniciado imediatamente. Colocamos os igredientes na cafeteira e ligamos.`,
                        en: 'The async method starts executing right away. We put the ingredients in the coffee machine and turn it on.',
                        line: 24
                    },
                    {
                        pt: `Aqui o nosso primeiro <code>await</code> é executado. Fazemos um <code>delay</code> na task para simular a cafeteira. 
                            O método será suspenso e o controle retornará para a função <code>Main</code>.`,
                        en: `Here our first <code>await</code> is executed. We execute a <code>delay</code> in the task to simulate the coffee machine.
                            The method is suspended and the control is returned to the <code>Main</code> function.`,
                        line: 25
                    },
                    {
                        pt: `Continuando no fluxo de execução, iniciamos a task da torradeira.`,
                        en: 'Moving on the execution, we start the toaster task.',
                        line: 11
                    },
                    {
                        pt: `Assim como a cafeteira, o método inicia imediatamente, executando o nosso <code>Console.WriteLine</code> e...`,
                        en: 'Just like the coffee machine, the method starts right away, executing the <code>Console.WriteLine</code> and...',
                        line: 31
                    },
                    {
                        pt: `... é suspenso ao encontrar novamente um <code>await</code>. Novamente, o fluxo retorna para a <code>Main</code>`,
                        en: '... gets suspended upon hitting the <code>await</code>. Again, the control is returned to the <code>Main</code>',
                        line: 32
                    },
                    {
                        pt: `De volta à <code>Main</code> vamos assistir TV enquanto o café é preparado.`,
                        en: 'Back in the <code>Main</code> we head to the living room to watch some TV while the coffee is being prepared.',
                        line: 14
                    },
                    {
                        pt: `Enquanto assistimos TV, fazemos o <code>await</code> para esperar até que as torradas e o café estejam prontos.
                            Como esse é o método principal de uma aplicação de console, não há método para devolver o controle. Então o nosso programa vai simplesmente
                            esperar até que as tasks terminem. Se essa fosse uma aplicação ASP.Net, por exemplo, ao executar o <code>await</code> em uma requisição
                            a thread em que a requisição está sendo executada seria liberada para atender outras requisições enquanto o <code>await</code> não fosse resolvido,
                            aumentando a velocidade de resposta da aplicação web.`,
                        en: `While we are watching the TV, we make an <code>await</code> to wait until the toasts and the coffee are ready.
                            This is the main method of our application, so there is no calleer to return the control to. So our program simply waits until the tasks finish.
                            If this were an ASP.Net application, for example, upon executing the <code>await</code> in a request, the thread in which the request is being executed
                            would be freed to deal with another requests while the <code>await</code> is not resolved, improving the response time of the web application.`,
                        line: 17
                    },
                    {
                        pt: `Ao resolver um <code>await</code>, o fluxo de execução continua de onde havia parado. Aqui é onde o contexto é restaurado, lembrando que um Console Application
                        não possui <code>SynchronizationContext</code> e o seu contexto padrão é o <code>ThreadPool</code>. Falaremos mais disso numa segunda parte. Nosso café está pronto entao!`,
                        en: `Upon resolving one <code>await</code>, the execution flow continues from where it was halted. Here is where the context is restored. Just remember that this is a
                             Console Application that doesn't have a <code>SynchronizationContext</code> and its default context is the Thread Pool. We will talk more about this in a second
                             article. But hey, the coffee is already ready!`,
                        line: 26
                    },
                    {
                        pt: `O controle volta novamente para a <code>Main</code>. Aqui, a execução continua esperando pois o <code>Task.WhenAll()</code> só é resolvido quando todos os seus 
                        <code>awaitable</code>s são resolvidos.`,
                        en: `The control is handed back to the <code>Main</code>. Here, the execution keeps waiting because <code>Task.WhenAll()</code> is only fully resolved when all of its
                        <code>awaitables</code> are resolved.`,
                        line: 17
                    },
                    {
                        pt: `Novamente, ao resolver o <code>await</code> da torradeira, o método termina de executar.`,
                        en: `Again, upon resolved the <code>await</code> of the toaster, the method finishes executing.`,
                        line: 33
                    },
                    {
                        pt: `Finalmente, nosso café está pronto e podemos comer tranquilamente. Conseguimos prepará-lo de forma assíncrona e de forma mais rápida, gastando cerca de
                        3 segundos para fazê-lo (cafeteira boa essa). Se fosse síncrono, gastaríamos aproximadamente 5 segundos, pois fariamos o café primeiro encarando a cafeteira
                        e depois a torradeira. E ainda estaráimos desinformados, pois não teríamos assistido o jornal na TV.`,
                        en: `Finally, our breakfast is ready to eat! We were able to prepare it in an asynchronous and faster way, spending about 3 seconds to do so (that's some good coffee machine).
                        If this were done synchronously, we would spend about 5 seconds, because we would need to be staring without blinking to our coffee machine and then do the same thing with the toaster.
                        And to make it worse, we would have lost some good news on the morning jornal.`,
                        line: 19
                    },
                ]
            },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
