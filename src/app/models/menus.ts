export interface IMenus {
  name: string
  router?: string
  icon?: string
  children?: IMenus[]
}
export const menus: IMenus[] = [
  {
    name: '行业常态化检测',
    router: '',
    icon: 'dot-chart',
  },
  {
    name: '管控重点检测',
    router: '',
    icon: 'appstore',
  },
  {
    name: '待检数据源配置',
    router: '',
    icon: 'database',
  },
  {
    name: '系统设置',
    router: '',
    icon: 'setting',
    children: [
      { name: '用户管理', router: '', icon: '' },
      { name: '角色管理', router: '', icon: '' },
      { name: '资源管理', router: '', icon: '' },
    ],
  },
  {
    name: '统计分析报表',
    router: '',
    icon: 'sliders',
  },
  {
    name: '短信模板',
    router: '',
    icon: 'pie-chart',
  },
]
