import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key, value) {
    window.localStorage[key] = value
  }
  get(key) {
    return window.localStorage[key] || null
  }
  setObject(key, obj) {
    window.localStorage[key] = JSON.stringify(obj)
  }
  getObject(key) {
    return JSON.parse(window.localStorage[key] || 'null')
  }
  remove(key) {
    window.localStorage.removeItem(key)
  }
  removeAll() {
    window.localStorage.clear()
  }
}

let storage = new LocalStorageService()

export { storage }
