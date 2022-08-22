import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserComponent } from './user/user.component'
import { RoleComponent } from './role/role.component'
import { ResourceComponent } from './resource/resource.component'
import { PersonComponent } from './person/person.component'
import { SystemManageRoutingModule } from './system-manage-routing.module'
import { ShareModule } from 'src/app/share/share.module'

@NgModule({
  declarations: [UserComponent, RoleComponent, ResourceComponent, PersonComponent],
  imports: [CommonModule, SystemManageRoutingModule, ShareModule],
})
export class SystemManageModule {}
