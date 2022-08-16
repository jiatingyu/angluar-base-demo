import { Component, OnInit } from '@angular/core'
import { NzMessageService, UploadChangeParam, UploadFile, UploadXHRArgs } from 'ng-zorro-antd'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { CommonService } from 'src/app/services/common.service'

@Component({
  selector: 'app-wait-origin',
  templateUrl: './wait-origin.component.html',
  styleUrls: ['./wait-origin.component.less'],
})
export class WaitOriginComponent extends ResultHelper implements OnInit {
  constructor(message: NzMessageService, private commonService: CommonService) {
    super(message)
  }
  dataSet = []
  loading = false
  pageObj = {
    page: 1,
    size: 1,
    total: 0,
  }
  ngOnInit() {
    this.loadData()
  }
  beforeUpload = (file: UploadFile, fileList: UploadFile[]): boolean => {
    console.log(file, fileList)
    // if (/\.xls(x)?$/.test(file.name)) {
    //   return true
    // }
    if (fileList.every(file => /\.xls(x)?$/.test(file.name))) {
      return true
    }
    this.message.warning('暂只支持Excel文件解析！！')
    return false
  }

  async loadData() {
    try {
      this.loading = true
      let { meta, data } = await this.commonService.getUploadHistory()
      if (!meta.success) {
        this.message.warning(meta.message)
        return
      }
      this.dataSet = data.content
      this.pageObj.total = data.totalElements
    } catch (error) {
      this.message.warning(error.message)
    } finally {
      this.loading = false
    }
  }

  customerRequest = async (fileArgs: UploadXHRArgs) => {
    console.log(fileArgs)
    let formData = new FormData()
    formData.append('files', fileArgs.file as any)
    let [message] = await this.requestHelper(this.commonService.uploadFile(formData))
    if (!message) {
      this.loadData()
    }
  }
  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status
    if (status !== 'uploading') {
      console.log(file, fileList)
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`)
    }
  }
  async delete(id: number) {
    let [message] = await this.requestHelper(this.commonService.deleteUpload(id))
    if (!message) {
      this.loadData()
    }
  }
}
