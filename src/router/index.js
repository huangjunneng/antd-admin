import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import store from '../store'

import MenuView from '../layout/MenuView'
import RouteView from '@/layout/RouteView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/Login'),
    invisible: true
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: MenuView,
    children: [
      {
        path: '/home',
        name: '主页',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/sys',
        name: '系统管理',
        redirect: '/sys/user',
        component: RouteView,
        meta: { title: '系统管理', icon: 'dashboard' },
        children: [
          {
            path: '/sys/user',
            name: '管理员列表',
            component: () => import('@/views/page1.vue'),
            meta: { title: '管理员列表', icon: 'dashboard' }
          },
          {
            path: '/sys/role',
            name: '角色管理',
            component: () => import('@/views/page2'),
            meta: { title: '角色管理', icon: 'dashboard' }
          }
        ]    
      },
      {
        path: '/member',
        name: '会员管理',
        redirect: '/member/tbkwalletrecord',
        component: RouteView,
        meta: { title: '会员管理', icon: 'dashboard' },
        children: [
          {
            path: '/member/tbkwalletrecord',
            name: '消费记录 ',
            component: () => import('@/views/page1'),
            meta: { title: '消费记录', icon: 'dashboard' }
          },
          {
            path: '/member/tbkmember',
            name: '会员信息',
            component: () => import('@/views/page2'),
            meta: { title: '会员信息', icon: 'dashboard' }
          },
          {
            path: '/member/tbkwallet',
            name: '会员钱包',
            component: () => import('@/views/page2'),
            meta: { title: '会员钱包', icon: 'dashboard' }
          }
        ]    
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login'] // no redirect whitelist
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info and MenuList
          await store.dispatch('user/getInfo')
          await store.dispatch('menulist/getMenuList')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
