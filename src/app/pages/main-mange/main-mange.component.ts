import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { MainService } from 'src/app/services/main.service'

@Component({
  selector: 'app-main-mange',
  templateUrl: './main-mange.component.html',
  styleUrls: ['./main-mange.component.less'],
})
export class MainMangeComponent extends ResultHelper implements OnInit {
  constructor(private mainService: MainService, message: NzMessageService) {
    super(message)
  }
  listOfData = []
  async ngOnInit() {
    try {
      let [err, data] = await this.requestHelper(this.mainService.getMainAnalysisDetail())
      !err && (this.listOfData = data)
      console.log(data)
    } catch (error) {
      console.dir(error)
      this.message.error(error.message)
    }
  }
}
