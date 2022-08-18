import { Injectable } from '@angular/core'
import { AxiosInstance } from 'axios'
import Request from '../helpers/Request'
import request from '../helpers/Request'
import { IResponse, IResponsePage } from '../models/systems'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  request: AxiosInstance
  constructor(private http: Request) {
    this.request = this.http.request
  }

  getSectionList(params) {
    return this.request.get('/api', {
      params,
    })
  }
  uploadFile(data, progressFn?) {
    return this.request.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: event => {
        progressFn && progressFn(event)
      },
    })
  }
  // 下载文件
  downloadFile() {
    return this.request.get('/upload')
  }
  getUploadHistory(params): Promise<IResponsePage<any>> {
    return this.request.get('/log/upload', { params })
  }
  deleteUpload(id) {
    return this.request.delete(`/log/${id}`)
  }
}
