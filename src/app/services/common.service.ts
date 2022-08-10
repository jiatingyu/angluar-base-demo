import { Injectable } from '@angular/core'
import request from '../helpers/Request'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getSectionList(params) {
    return request.get('/api', {
      params,
    })
  }
}
