import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { DefaultComponent } from './layout/default/default.component'
import { PassportComponent } from './layout/passport/passport.component'
import { SectorComponent } from './pages/sector/sector.component'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { LoginComponent } from './pages/passport/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MainMangeComponent } from './pages/main-mange/main-mange.component'
import { WaitOriginComponent } from './pages/wait-origin/wait-origin.component'
import { UserComponent } from './pages/system-manage/user/user.component'
import { RoleComponent } from './pages/system-manage/role/role.component'
import { ResourceComponent } from './pages/system-manage/resource/resource.component'
import { AnalysisComponent } from './pages/analysis/analysis.component'
import { MessageTemplateComponent } from './pages/message-template/message-template.component'
import { PersonComponent } from './pages/system-manage/person/person.component'
import { RoleNamePipe } from './pipes/role-name.pipe'
import { UserTypePipe } from './pipes/user-type.pipe' 
import { ShareModule } from './share/share.module';
import { TestComponent } from './pages/test/test.component';
import { SectorDetailComponent } from './pages/sector/sector-detail/sector-detail.component';
import { StoreModule } from '@ngrx/store'; 
import { reducers, metaReducers } from './store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
registerLocaleData(zh)
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    PassportComponent,
    SectorComponent,
    LoginComponent,
    MainMangeComponent,
    WaitOriginComponent,
    // UserComponent,
    // RoleComponent,
    // ResourceComponent,
    AnalysisComponent,
    MessageTemplateComponent,
    TestComponent,
    SectorDetailComponent,
    // PersonComponent,
    // RoleNamePipe,
    // UserTypePipe,
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, ShareModule, 
    StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : []],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
