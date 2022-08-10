import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { CommonService } from 'src/app/services/common.service'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less'],
})
export class SectorComponent implements OnInit {
  constructor(private commonService: CommonService, private message: NzMessageService) {}

  async ngOnInit() {
    try {
      let data = await this.commonService.getSectionList({})
      console.log(data)
    } catch (error) {
      console.dir(error)
      this.message.error(error.message)
    }
  }
}
