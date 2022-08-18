import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import axios, { AxiosInstance } from 'axios'
import { NzMessageService } from 'ng-zorro-antd'
import { storage } from './local-storage.service'

const baseURL = window['env']['url']
@Injectable({
  providedIn: 'root',
})
class Request {
  request: AxiosInstance
  notAuthRequest = [
    // 登录
    '/user/login',
  ]
  constructor(private message: NzMessageService, private router: Router) {
    this.request = axios.create({
      baseURL,
      timeout: 10 * 10000,
    })
    this.request.interceptors.request.use(config => {
      if (!this.notAuthRequest.includes(config.url)) {
        let access_token = storage.get('access_token')
        access_token && (config.headers['access_token'] = access_token)
      }
      return config
    })

    this.request.interceptors.response.use(
      config => {
        let contentType = config.headers['content-type'].match(/(x-download)/)
        if (contentType && contentType[1]) {
          // 说明是下载
          return config
        }
        if (config.status === 200) {
          return config.data
        }
      },
      error => {
        let { response } = error
        if (response && response.status === 401) {
          storage.removeAll()
          this.message.error('当前身份未认证')
          // location.pathname = '/passport'
          this.router.navigate(['/passport'])
        } else {
          Promise.reject(error)
        }
      }
    )
  }
}

export default Request
