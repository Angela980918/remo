export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src/',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['usebootstrap'],
  // nitro: {
  //   publicAssets: [
  //     { dir: 'static', baseURL: '/' },
  //   ],
  // },
  css: [
    'animate.css/animate.min.css', // 引入 Animate.css
  ],
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/wowjs@1.1.2/dist/wow.min.js', // 确保这里是非模块化的版本
          type: 'text/javascript', // 不使用 type='module'
          defer: true,
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['wow.min.js'], // 排除 wow.min.js 文件不进行模块化处理
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/global.scss";`,
        },
      },
    },
  },

  routeRules: {
    // 文章列表页面，每个分页页面都需要进行预渲染
    '/article/**': {
      prerender: true,
      isr: 3600,
    },
    // 文章详情页面，通过文章 ID 渲染具体内容，进行预渲染
    '/article-info/**': {
      prerender: true,
      isr: 3600,
    },
  },
});
