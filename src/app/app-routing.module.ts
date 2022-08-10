import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { DefaultComponent } from "./layout/default/default.component";
import { PassportComponent } from "./layout/passport/passport.component";
import { LoginComponent } from "./pages/passport/login/login.component";
import { SectorComponent } from "./pages/sector/sector.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "app",
  },
  {
    path: "passport",
    component: PassportComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
    ],
  },
  {
    path: "app",
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: SectorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
