import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn:true,
      mergeProps:true
    })
  ],
  server:{
    host: '0.0.0.0',
    proxy: {
      //转发api路径代理设置
      '/api/v1': {
        target: 'http://121.196.236.94:3000/',//当输入相对路径/api/v1实际指向路径
      }
    }
  },
  base:'./'
 
})
