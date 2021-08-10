import router,{ resetRouter } from './router'
import store from './store'
import NProgress from 'nprogress'
import { Message  } from 'element-ui'
import 'nprogress/nprogress.css'
import { getToken, removeToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false })

const whiteList = ['/user/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.name)
  const hasToken = getToken();
  if (whiteList.indexOf(to.path) !== -1){
    next()
    return;
  }
  if (hasToken) {
    const { name } = store.state.user;

    /**
     * 如已有个人信息
     * @type {[type]}
     */
    if(name || name == undefined) {
      next()
      return
    }
    /**
     * 未获取个人信息则重新获取
     * @type {[type]}
     */
    resetRouter();
    let roleId = await store.dispatch('user/getInfo')
    await store.dispatch('permission/generateRoutes',data)

  } else {
    removeToken()
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/user/login')
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})
