export const horizontal = {
  path:'/horizontal',
  redirect:'/horizontal/project',
  component: () => import('@/layout/horizontal'),
  children: [
    {
      path: 'project',
      redirect:'/horizontal/project/index',
      component: () => import('@/views/view'),
      meta: { path:'/horizontal/project/index',name: '项目', activeMenu:'/horizontal/project/index' },
      children: [
        {
          path: 'index',
          component: () => import('@/views/horizontal/project'),
          meta: { name: '项目', activeMenu:'/horizontal/project/index' },
        },
      ]
    },
  ]
}
