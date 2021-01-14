import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '主页',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index')
      },
      {
        path: 'page1',
        name: 'Page1',
        meta: {
          title: 'page1'
        },
        component: () => import(/* webpackChunkName: "page1" */ '../views/page1/index')
      },
      {
        path: 'page2',
        name: 'Page2',
        meta: {
          title: 'page2'
        },
        component: () => import(/* webpackChunkName: "page2" */ '../views/page2/index')
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index')
      }
    ]
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      title: '登出'
    },
    component: () => import(/* webpackChunkName: "logout" */ '@/views/logout')
  },
  {
    path: '/set_cache',
    name: 'SetCache',
    meta: {
      title: 'SetCache'
    },
    component: () => import(/* webpackChunkName: "set_cache" */ '@/views/set_cache')
  },
  {
    path: '/set_cookie',
    name: 'SetCookie',
    meta: {
      title: 'SetCookie'
    },
    component: () => import(/* webpackChunkName: "set_cookie" */ '@/views/set_cookie')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
