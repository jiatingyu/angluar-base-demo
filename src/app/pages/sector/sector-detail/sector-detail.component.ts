import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { extend } from 'dayjs'
import { NzMessageService } from 'ng-zorro-antd'
import { DateHelper } from 'src/app/helpers/DateHelper'
import { FileHelper } from 'src/app/helpers/FileHelper'
import { baseURL } from 'src/app/helpers/Request'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { MainService } from 'src/app/services/main.service'
import { environment } from 'src/environments/environment'
interface ItemData {
  id: string
  name: string
  phoneNumber: string
  idCard: string
  checked: boolean
  sex: string
  gkcs: string
  trades: string
  gzdw: string
}

@Component({
  selector: 'app-sector-detail',
  templateUrl: './sector-detail.component.html',
  styleUrls: ['./sector-detail.component.less'],
})
export class SectorDetailComponent extends ResultHelper implements OnInit {
  searchForm: FormGroup
  loading = false
  constructor(
    private router: Router,
    private main: MainService,
    private fileHelper: FileHelper,
    private dateHelper: DateHelper,
    message: NzMessageService,
    private fb: FormBuilder
  ) {
    super(message)
  }
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {}
  listOfData: ItemData[] = []

  startEdit(id: string): void {
    this.editCache[id].edit = true
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id)
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    }
  }

  async saveEdit(id: string) {
    const index = this.listOfData.findIndex(item => item.id === id)
    Object.assign(this.listOfData[index], this.editCache[id].data)
    console.log(this.listOfData[index])
    let [err] = await this.requestHelper(this.main.operationSectorDetail(this.listOfData[index]))
    !err && (this.editCache[id].edit = false)
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      }
    })
  }
  rateArr = []
  async ngOnInit() {
    this.searchForm = this.fb.group({
      name: [null],
      idCard: [null],
      color: [null],
      queryDate: [null],
    })
    let [err, data] = await this.requestHelper(this.main.getRate())
    if (!err) {
      this.rateArr = data
    }
    this.loadData()
  }
  pageObj = {
    page: 1,
    size: 10,
    total: 0,
  }
  search() {
    this.pageObj.page = 1
    this.loadData()
  }
  reset() {
    this.searchForm.reset()
  }
  async loadData() {
    this.loading = true
    try {
      let obj = this.searchForm.value
      let params = { ...obj, ...{ page: this.pageObj.page, size: this.pageObj.size } }
      if (obj.queryDate) {
        params.queryDate = this.dateHelper.formart(obj.queryDate, 'YYYY-MM-DD HH:mm:ss')
      }
      let [err, list] = await this.requestHelper(this.main.getSectorDetails(params))
      if (!err) {
        this.listOfData = list.content || []
        this.pageObj.total = list.totalElements
        this.updateEditCache()
      }
    } catch (error) {
    } finally {
      this.loading = false
    }
  }

  onBack() {
    this.router.navigateByUrl('/sector')
  }
  isAllDisplayDataChecked = false
  isIndeterminate = false
  checkAll(event: boolean) {
    this.listOfData.forEach(item => {
      item.checked = !!event
    })
    this.itemCheckedChange()
  }
  itemCheckedChange() {
    this.isAllDisplayDataChecked = this.listOfData.every(item => item.checked)
    this.isIndeterminate = this.listOfData.some(item => item.checked) && !this.isAllDisplayDataChecked
  }
  async deleteRow(id) {
    let [err] = await this.requestHelper(this.main.deleteSectorDetail(id))
    if (!err) {
      this.loadData()
    }
  }
  msgLoading = false
  async sendMsg() {
    this.msgLoading = true
    let data = this.listOfData
      .filter(item => item.checked)
      .map(item => ({ name: item.name, idCard: item.idCard, phoneNumber: item.phoneNumber }))
    await this.requestHelper(this.main.postMsg(data))
    this.msgLoading = false
    this.listOfData.forEach(item => (item.checked = false))
    this.itemCheckedChange()
  }
  downLoading = false
  async exportData() {
    this.downLoading = true
    try {
      let obj = Object.assign({}, this.searchForm.value)
      if (obj.queryDate) {
        obj.queryDate = this.dateHelper.formart(obj.queryDate, 'YYYY-MM-DD HH:mm:ss')
      }
      let data = await this.main.getSectorDetailsExport(obj)
      // 传统做法
      // let values = this.searchForm.value as object
      // let params = new URLSearchParams()
      // for (const key of Object.keys(values)) {
      //   if (values[key]) {
      //     params.append(key, values[key])
      //   }
      // }
      // let url = baseURL + '/analysis/export?' + params.toString()
      // console.log(url)
      this.fileHelper.downLoad(data)
    } catch (error) {
    } finally {
      this.downLoading = false
    }
  }
}
