import { createRouter, createWebHistory } from 'vue-router'
import { wxAuth } from '@/utils/wxAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },

    // 需求模块
    {
      path: '/demand',
      name: 'demand',
      children: [
        {
          path: 'ask',
          name: 'demand-ask',
          component: () => import('@/views/demand/ask/index.vue'),
        },
        {
          path: 'list',
          name: 'demand-list',
          component: () => import('@/views/demand/list/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(() => {
  wxAuth()
})

export default router
