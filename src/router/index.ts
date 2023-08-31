import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})

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
      component: () => import('../views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    }, {
      path: '/fast',
      component: () => import('../views/Consult/ConsultFast.vue'),
      meta: { title: '急速问诊' }
    }, {
      path: '/dep',
      component: () => import('../views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    }, {
      path: '/consult',
      component: () => import('../views/User/ConsultPage.vue'),
      meta: { title: '选择科室' }
    }, {
      path: '/illness',
      component: () => import('../views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    }
  ]
})

const list = ['/login']
router.beforeEach((to, from) => {
  NProgress.start()
  const store = useCounterStore()
  // 如果没有token, 并且进入的页面也不是login/register/404/401等页面,则直接进入到登录页面
  document.title = '医疗问诊-' + to.meta.title
  if (!store.user?.token && !list.includes(to.path)) return '/login'
})

router.afterEach((to) => {
  document.title = '医疗问诊 - ' + to.meta.title
  NProgress.done()
})

export default router
