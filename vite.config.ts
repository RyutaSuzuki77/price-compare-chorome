import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                panel: resolve(__dirname, 'src/panel/index.html'),
                background: resolve(__dirname, 'src/background/index.ts'),
                content: resolve(__dirname, 'src/content/index.ts')
            },
            output: {
                entryFileNames: 'assets/[name].js'
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    }
})