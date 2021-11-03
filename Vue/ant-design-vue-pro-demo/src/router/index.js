import Vue from 'vue';
import VueRouter from 'vue-router';
//import RenderRouterView from '../components/RenderRouterView.vue'
//import { bxAnaalyse } from '@/core/icons';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
};

const routes = [
  {
    path: '/user',
    redirect: '/user/login',
    //component: RenderRouterView,
    //component: { render: h => h('router-view') },
    component: () =>
      import(/* webpackChunkName: "user" */ '../layout/UserLayout'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Register'),
      },
    ],
  },
  {
    path: '/',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "basic" */ '../layout/BasicLayout'),
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: 'menu.dashboard',
          keepAlive: true,
          //icon: bxAnaalyse,
          permission: ['dashboard'],
        },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: 'menu.dashboard.analysis',
              keepAlive: false,
              permission: ['dashboard'],
            },
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' },
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: 'menu.dashboard.workplace',
              keepAlive: true,
              permission: ['dashboard'],
            },
          },
        ],
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/forms/BasicForm'),
            meta: {
              title: 'menu.form.basic-form',
              keepAlive: true,
              permission: ['form'],
            },
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/forms/stepForm/StepForm'),
            meta: {
              title: 'menu.form.step-form',
              keepAlive: true,
              permission: ['form'],
            },
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/forms/advancedForm/AdvancedForm'),
            meta: {
              title: 'menu.form.advanced-form',
              keepAlive: true,
              permission: ['form'],
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.path !== to.path) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
