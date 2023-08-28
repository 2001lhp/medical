import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login/index.vue'),
      meta: { title: '登录' }
    }, {
      path: '/enroll',
      component: () => import('../views/Enroll/index.vue'),
      meta: { title: '注册' }
    }, {
      path: '/',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [{
        path: '/home',
        component: () => import('../views/Home/index.vue'),
        meta: { title: '首页' }
      }, {
        path: '/article',
        component: () => import('../views/Article/index.vue'),
        meta: { title: '健康百科' }
      }, {
        path: '/notify',
        component: () => import('../views/Notify/index.vue'),
        meta: { title: '信息中心' }
      }, {
        path: '/user',
        component: () => import('../views/User/index.vue'),
        meta: { title: '我的' }
      },]
    }, {
      path: '/patient',
      component: () => import('../views/Patient/index.vue'),
      meta: { title: '家庭档案' }
    }
  ]
})

const list = ['/login']
router.beforeEach((to, from) => {
  const store = useCounterStore()
  // 如果没有token, 并且进入的页面也不是login/register/404/401等页面,则直接进入到登录页面
  document.title = '医疗问诊-' + to.meta.title
  if (!store.user?.token && !list.includes(to.path)) return '/login'
})

export default router
