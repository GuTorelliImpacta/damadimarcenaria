import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { target: 'es2022', cssCodeSplit: false, sourcemap: false },
  ssgOptions: {
    dirStyle: 'nested',
    script: 'defer',
    formatting: 'none',
    beastiesOptions: false,
    includedRoutes: (paths) => paths.filter((p) => !p.includes(':') && p !== '/*'),
  },
})
