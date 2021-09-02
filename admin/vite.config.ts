import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VitePluginElementPlus from 'vite-plugin-element-plus'
// import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginElementPlus({
      // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
      // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
      // 的文档注释
      // useSource: true
    }),
  ],
  server: {
    port: 3333,
    open: true,
    proxy: {
      '^/api': {
        // target: 'http://192.168.2.108:3456',
        target: 'http://localhost:3456',
        changeOrigin: true,
        rewrite: path =>{
          console.log(path);
          return path.replace('/api', '')
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
