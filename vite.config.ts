import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  base: '/tbbw-client/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      resolvers: [
        VantResolver({
          // 禁用样式引用
          importStyle: false,
        }),
      ],
    }),
    Components({
      resolvers: [
        VantResolver({
          // 禁用样式引用
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 1234,
    proxy: {
      '/api': {
        // target: 'http://10.27.18.75:3000/v1',
        target: 'http://127.0.0.1:3001/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
