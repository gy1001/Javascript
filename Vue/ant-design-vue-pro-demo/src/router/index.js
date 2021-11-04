import Vue from 'vue'
import VueRouter from 'vue-router'
//import RenderRouterView from '../components/RenderRouterView.vue'
//import { bxAnaalyse } from '@/core/icons';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    redirect: '/user/login',
    //component: RenderRouterView,
    //component: { render: h => h('router-view') },
    component: () =>
      import(/* webpackChunkName: "user" */ '../layout/UserLayout'),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Login'),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Register'),
      },
    ],
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "basic" */ '../layout/BasicLayout'),
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          permission: ['dashboard'],
        },
        children: [
          {
            path: '/dashboard/analysis',
            //path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: '分析页',
            },
            children: [
              {
                path: '/dashboard/analysis1',
                name: 'Analysis1',
                component: () => import('@/views/dashboard/Analysis'),
                meta: {
                  title: '测试分析页',
                },
              },
            ],
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监视器', target: '_blank' },
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作空间',
            },
          },
        ],
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        name: 'form',
        meta: { title: '表单', icon: 'form' },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/forms/BasicForm'),
            meta: {
              title: '基础表单',
            },
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            hideChildrenMenu: true,
            component: () => import('@/views/forms/stepForm/StepForm'),
            meta: {
              title: '分布表单',
            },
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/forms/advancedForm/AdvancedForm'),
            meta: {
              title: '高级表单',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    meta: { title: '异常404' },
    name: '404',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
  {
    path: '*',
    redirect: '/404',
    hideInMenu: true,
  },
]
// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (from.path !== to.path) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
