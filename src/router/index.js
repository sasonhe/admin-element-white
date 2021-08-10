import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/layout/login'

import { horizontal } from './modules/horizontal'
import { project } from './modules/project'

Vue.use(VueRouter)

// 404页面
export const errPage = {
  path: '*',
  redirect: '/user',
  meta: {
    name: '404',
    icon: ''
  },
}

// 预备路由配置
const constantRoutes = [
  horizontal,
  project,
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    name: '404',
    meta: {
      name: '404',
      icon: ''
    },
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: Login,
    meta: {
      name: '用户登陆',
      icon: ''
    },
    children: [
      {
        path: 'login',
        component: () => import('@/layout/login/login/'),
        name: 'login',
        meta: {
          name: '登陆',
          icon: '',
          activeMenu: '/user/login',
        },
      },
    ]
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  // base: process.env.NODE_ENV === 'production'?'/admin/':'',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
