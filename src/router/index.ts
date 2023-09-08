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
      meta: { title: '问诊记录' }
    }, {
      path: '/illness',
      component: () => import('../views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    }, {
      path: '/pay',
      component: () => import('../views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    }, {
      path: '/room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '问诊室' }
    }, {
      path: '/consult/:id',
      component: () => import('../views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    }, {
      path: '/order/pay',
      component: () => import('../views/Order/OederPay.vue'),
      meta: { title: '药品支付' }
    }, {
      path: '/order/pay/result',
      component: () => import('../views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },{
      path: '/orderdetail/:id',
      component: () => import('../views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
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
