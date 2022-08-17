import { Injectable } from '@angular/core'
import { AxiosInstance } from 'axios'
import Request from '../helpers/Request'
import { UserType } from '../models/systems'

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
  async getMessageTemp() {
    return this.request.get('/log/sms/template')
  }
  async getMessageLog() {
    return this.request.get('/log/smsLog')
  }
  // 获取系统信息
  async getSystemInfo(params = {}) {
    return this.request.get('/analysis/user', { params })
  }

  // 管控人员 详情
  async getMainAnalysisDetail(params = {}) {
    return this.request.get('/analysis', { params: { ...params, type: UserType.重点管控用户 } })
  }

  // 行业人员 详情
  async getSectorAnalysisDetail(params = {}) {
    return this.request.get('/analysis', { params: { ...params, type: UserType.行业用户 } })
  }
  // 管控人员 汇总
  async getMainAnalysis(params = {}) {
    return this.request.get('/analysis/sum', { params: { ...params, type: UserType.重点管控用户 } })
  }

  // 行业人员 汇总
  async getSectorAnalysis(params = {}) {
    return this.request.get('/analysis/sum', { params: { ...params, type: UserType.行业用户 } })
  }
}
