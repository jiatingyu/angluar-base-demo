export interface IMenus {
  name: string
  router?: string
  icon?: string
  children?: IMenus[]
}
export const menus: IMenus[] = [
  {
    name: '行业常态化检测',
    router: '/sector',
    icon: 'dot-chart',
  },
  {
    name: '管控重点检测',
    router: '/mainManage',
    icon: 'appstore',
  },
  {
    name: '待检数据源配置',
    router: '/waitOrigin',
    icon: 'database',
  },
  {
    name: '系统设置',
    router: '',
    icon: 'setting',
    children: [
      { name: '用户管理', router: '/system/user', icon: '' },
      { name: '角色管理', router: '/system/role', icon: '' },
      { name: '资源管理', router: '/system/resource', icon: '' },
    ],
  },
  {
    name: '统计分析报表',
    router: '/analysis',
    icon: 'sliders',
  },
  {
    name: '短信模板',
    router: '/messageTemplate',
    icon: 'pie-chart',
  },
]
