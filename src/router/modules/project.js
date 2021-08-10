
export const project = {
  path:'/project',
  redirect: '/project/menu1',
  component: () => import('@/layout/project/Layout'),//parent router-view
  meta: {
    name: '项目管理',
    path:'/project/menu1',
    icon: 'el-icon-house',
  },
  children:[
    {
      path: 'menu1',
      component: () => import('@/views/project/menu1'),
      meta: {
        name: '一级菜单',
        path:'/project/menu1',
        icon: 'el-icon-postcard'
      },
      children:[]
    },
    {
      path: 'menu2',
      component: () => import('@/views/view'), //children router-view
      redirect: '/project/menu2/menu2-1',
      meta: {
        name: '二级级菜单',
        path:'/project/menu2',
        icon: 'el-icon-set-up'
      },
      children: [
        {
          path: 'menu2-1',
          component: () => import('@/views/project/menu2/menu2-1'),
          meta: { name: '二级级菜单01',path:'/project/menu2/menu2-1'},
        },
        {
          path: 'menu2-2',
          component: () => import('@/views/project/menu2/menu2-2'),
          meta: { name: '二级级菜单02',path:'/project/menu2/menu2-2'},
        },
      ]
    },
  ]
}
