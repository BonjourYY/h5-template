import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        shareData: {
          title: '龙凤城祥 桥见未来',
          desc: '常泰开启跨江融合发展',
          // link: window.location.href,
          imgUrl: 'https://site01.cbxmt.cn/ctdq/share.jpg',
        },
      },
    },
  ],
})

export default router
