import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { getCurrentUser } from '../helpers/local-storage.service'
import { IUser } from '../models/systems'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      let user: IUser = getCurrentUser()
      let role = user.roleVo
      let resource = role.resourceVos
      if (!resource.length) {
        throw new Error('无权限')
      }
      let res = resource.filter(item => item.url === state.url)
      if (res.length) {
        // 存在
        return true
      } else {
        // 不存在
        return this.router.createUrlTree([resource[0].url])
      }
    } catch (error) {
      return false
    }
  }
}
