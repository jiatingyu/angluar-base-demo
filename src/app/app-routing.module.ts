import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { DefaultComponent } from './layout/default/default.component'
import { PassportComponent } from './layout/passport/passport.component'
import { AnalysisComponent } from './pages/analysis/analysis.component'
import { MainMangeComponent } from './pages/main-mange/main-mange.component'
import { MessageTemplateComponent } from './pages/message-template/message-template.component'
import { LoginComponent } from './pages/passport/login/login.component'
import { SectorComponent } from './pages/sector/sector.component'
import { PersonComponent } from './pages/system-manage/person/person.component'
import { ResourceComponent } from './pages/system-manage/resource/resource.component'
import { RoleComponent } from './pages/system-manage/role/role.component'
import { UserComponent } from './pages/system-manage/user/user.component'
import { WaitOriginComponent } from './pages/wait-origin/wait-origin.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sector',
  },
  {
    path: 'passport',
    component: PassportComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'sector',
        component: SectorComponent,
      },
      {
        path: 'mainManage',
        component: MainMangeComponent,
      },
      {
        path: 'waitOrigin',
        component: WaitOriginComponent,
      },
      {
        path: 'system/user',
        component: UserComponent,
      },
      {
        path: 'system/role',
        component: RoleComponent,
      },
      {
        path: 'system/resource',
        component: ResourceComponent,
      },
      {
        path: 'system/person',
        component: PersonComponent,
      },

      {
        path: 'messageTemplate',
        component: MessageTemplateComponent,
      },
    ],
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
