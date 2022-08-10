import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { DefaultComponent } from "./layout/default/default.component";
import { PassportComponent } from "./layout/passport/passport.component";
import { SectorComponent } from "./pages/sector/sector.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { LoginComponent } from "./pages/passport/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    PassportComponent,
    SectorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
