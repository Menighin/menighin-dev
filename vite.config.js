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
    },
});
