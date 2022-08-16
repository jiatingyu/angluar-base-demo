import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { MainService } from 'src/app/services/main.service'

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.less'],
})
export class MessageTemplateComponent extends ResultHelper implements OnInit {
  Templates = []
  Logs = []
  constructor(message: NzMessageService, private mainService: MainService) {
    super(message)
  }

  ngOnInit() {
    this.loadData()
  }

  async loadData() {
    let [err, temps] = await this.requestHelper(this.mainService.getMessageTemp())
    let [err1, logs] = await this.requestHelper(this.mainService.getMessageLog(), false)
    if (!err && !err1) {
      this.Templates = temps
      this.Logs = logs
    }
  }
}
