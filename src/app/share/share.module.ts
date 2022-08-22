import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { UserTypePipe } from '../pipes/user-type.pipe'
import { RoleNamePipe } from '../pipes/role-name.pipe'

@NgModule({
  declarations: [RoleNamePipe, UserTypePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule, RoleNamePipe, UserTypePipe],
})
export class ShareModule {}
