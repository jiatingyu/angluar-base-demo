import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { menus } from 'src/app/models/menus'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
})
export class DefaultComponent implements OnInit {
  constructor(private router: Router) {
    console.log(this.router.url)
  }
  menus = menus
  ngOnInit() {}
  loginOut() {
    window.localStorage.clear()
    this.router.navigate(['passport'])
  }
  menuClick(event) {
    console.log(event)
  }
  hasSelect(router) {
    return this.router.url === router
  }
}
