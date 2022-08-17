import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { CommonService } from 'src/app/services/common.service'
import { MainService } from 'src/app/services/main.service'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less'],
})
export class SectorComponent extends ResultHelper implements OnInit {
  constructor(private mainService: MainService, message: NzMessageService) {
    super(message)
  }
  listOfData = []
  async ngOnInit() {
    try {
      let [err, data] = await this.requestHelper(this.mainService.getSectorAnalysisDetail())
      !err && (this.listOfData = data)
    } catch (error) {
      console.dir(error)
      this.message.error(error.message)
    }
  }
}
