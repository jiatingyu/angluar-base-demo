import { Component, OnInit } from '@angular/core'
import { NzMessageService, UploadChangeParam, UploadFile, UploadXHRArgs } from 'ng-zorro-antd'
import { FileHelper } from 'src/app/helpers/FileHelper'
import { ResultHelper } from 'src/app/helpers/ResultHelper'
import { CommonService } from 'src/app/services/common.service'

@Component({
  selector: 'app-wait-origin',
  templateUrl: './wait-origin.component.html',
  styleUrls: ['./wait-origin.component.less'],
})
export class WaitOriginComponent extends ResultHelper implements OnInit {
  constructor(message: NzMessageService, private commonService: CommonService, private fileHelper: FileHelper) {
    super(message)
  }
  dataSet = []
  loading = false
  downloading = false
  pageObj = {
    page: 1,
    size: 10,
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
      let { page, size } = this.pageObj
      let obj = { page, size }
      let { meta, data } = await this.commonService.getUploadHistory(obj)
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
    const progressFn = event => {
      let progress = event.loaded / event.total
      console.log('上传进度：' + progress * 100 + '%')
      fileArgs.onProgress(event, fileArgs.file)
    }
    let [message] = await this.requestHelper(this.commonService.uploadFile(formData, progressFn))

    if (!message) {
      this.loadData()
      fileArgs.onSuccess(null, fileArgs.file, null)
    } else {
      fileArgs.onError(null, fileArgs.file)
    }
  }
  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status
    if (status !== 'uploading') {
      console.log(file, fileList)
    }
    if (status === 'done') {
      this.message.success(`${file.name} 文件成功上传.`)
    } else if (status === 'error') {
      this.message.error(`${file.name} 文件上传失败.`)
    }
  }
  async delete(id: number) {
    let [message] = await this.requestHelper(this.commonService.deleteUpload(id))
    if (!message) {
      this.loadData()
    }
  }
  async downloadFile() {
    this.downloading = true
    let data = await this.commonService.downloadFile()
    try {
      this.fileHelper.downLoad(data)
    } catch (error) {
      console.log('下载出错', error.message)
    } finally {
      this.downloading = false
    }
  }
}
