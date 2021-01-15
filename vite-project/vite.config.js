import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    include: [
      'highlight.js/lib/core',

      'element-plus/lib/locale',
      'element-plus/lib/locale/lang/zh-cn',
    ],
  },
  plugins: [vue()]
}
