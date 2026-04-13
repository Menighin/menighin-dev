import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            '@': '/src/ts',
        },
    },
    build: {
        sourcemap: true,
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: 'src/index.html',
                "comida-di-buteco": 'src/cdb.html',
            },
        },
    },
    // Plugin customizado para interceptar a URL no ambiente de Local Dev
    plugins: [
        {
            name: 'dev-server-rewrite',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    // Quando o usuario acessar a url literal /comida-di-boteco
                    if (req.url === '/comida-di-buteco') {
                        // O Vite internamente servirá nosso arquivo src/cdb.html
                        req.url = '/cdb.html';
                    }
                    next();
                });
            }
        }
    ]
});
