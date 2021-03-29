import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        index2: resolve(__dirname, 'index2.html'),
      },
    }
  },
  plugins: [vue()]
})
