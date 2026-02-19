import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: '/ceramics/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                galerii: resolve(__dirname, 'galerii.html'),
                hinnakiri: resolve(__dirname, 'hinnakiri.html'),
                kontakt: resolve(__dirname, 'kontakt.html'),
                tooted: resolve(__dirname, 'tooted.html'),
            },
        },
    },
    assetsInclude: ['finished/*.jpg', 'product/**/*'],
})
