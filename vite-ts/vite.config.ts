import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: resolve(__dirname, 'src/pages'),
  plugins: [vue()],
  alias: {
    'src': resolve(__dirname, 'src'),
  },
  build: {
    outDir: '../../dist', //relative to project root.
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/pages/index/main.js'),
        index2: resolve(__dirname, 'src/pages/index2/main.js')
      }
    }
  }
})
