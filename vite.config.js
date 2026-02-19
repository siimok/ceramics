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
                galerii: resolve(__dirname, 'ceramics/galerii.html'),
                hinnakiri: resolve(__dirname, 'ceramics/hinnakiri.html'),
                kontakt: resolve(__dirname, 'ceramics/kontakt.html'),
                tooted: resolve(__dirname, 'ceramics/tooted.html'),
            },
        },
    },
    assetsInclude: ['finished/*.jpg', 'product/**/*'],
})
