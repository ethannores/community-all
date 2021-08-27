import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3333,
    open: true,
    proxy: {
      '^/api': {
        target: 'http://192.168.2.108:3456',
        changeOrigin: true,
        rewrite: path => path.replace('/api', ''),
      },
    },
  },
})
