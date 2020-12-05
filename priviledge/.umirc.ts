import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  dva: {
    immer: true,
    hmr: false,
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/producation' : '/',
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      pathRewrite: { '^/api' : '' },
    }
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
