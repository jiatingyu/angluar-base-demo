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
  uploadFile(data) {
    return this.request.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  getUploadHistory(): Promise<IResponsePage<any>> {
    return this.request.get('/log/upload', {})
  }
  deleteUpload(id) {
    return this.request.delete(`/log/${id}`)
  }
}
