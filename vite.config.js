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
                "comida-di-buteco": 'src/comida-di-buteco/index.html',
            },
        },
    }
});
