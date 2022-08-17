import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import axios, { AxiosInstance } from 'axios'
import * as dayjs from 'dayjs'
import { NzMessageService } from 'ng-zorro-antd'
import { storage } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class DateHelper {
  formart(date, formart = 'YYYY-MM-DD') {
    return dayjs(date).format(formart)
  }
}
