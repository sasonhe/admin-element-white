/**
 * 路由表过滤
 * @param  {[type]} typeRouter    [路由表]
 * @param  {[type]} userRouter [后台返回菜单]
 * @return {[type]}            [description]
 */
function filterRuouteList(typeRouter,userRouter){
  let array = []
  typeRouter.forEach(c => {
    userRouter.forEach(u => {
      if(u.permissionPath == c.meta.path){
        if (u.children && u.children.length > 0) {
          c.children = filterRuouteList(c.children,u.children)
        }
        array.push(c)
      }
    })
  })
  return array
}
/**
 * 统一处理路由
 * @param  {[type]} userRouter [description]
 * @return {[type]}            [description]
 */
export const recursionRouter = (userRouter,rolesId) =>{

}

const state = {

}
const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
