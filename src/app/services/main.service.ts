import { Injectable } from '@angular/core'
import { AxiosInstance } from 'axios'
import Request from '../helpers/Request'

/** 主要业务 */

@Injectable({
  providedIn: 'root',
})
export class MainService {
  request: AxiosInstance
  constructor(private http: Request) {
    this.request = this.http.request
  }
  /** 短信 */
  async getMessageTemp(){
    return this.request.get('/log/sms/template')
  }
  async getMessageLog(){
    return this.request.get('/log/smsLog')
  }
}
