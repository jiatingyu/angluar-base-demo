import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IMenus, menus } from 'src/app/models/menus'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
})
export class DefaultComponent implements OnInit {
  constructor(private router: Router) {
    console.log(this.router.url)
  }
  menus: IMenus[] = menus
  ngOnInit() {}
  loginOut() {
    window.localStorage.clear()
    this.router.navigate(['passport'])
  }
  menuClick(event) {
    // console.log(event)
  }
  hasSelect(router) {
    return this.router.url === router
  }
  toPerson() {
    this.router.navigate(['/system/person'])
  }
  byRoutertoName() {
    let res = ''
    let router = location.pathname
    let findBy = (menus, router) => {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].children) {
          findBy(menus[i].children, router)
        }
        if (menus[i].router === router) {
          res = menus[i].name
          return
        }
      }
    }
    findBy(this.menus, router)
    return res
  }
}
