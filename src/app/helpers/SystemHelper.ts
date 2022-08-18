import { Injectable } from '@angular/core'
import { IResource } from '../models/systems'

@Injectable({
  providedIn: 'root',
})
export class SystemHelper {
  // 资源层级显示
  cascadeResource(data: IResource[]) {
    let map = new Map()
    data.forEach(item => {
      item['key'] = item.id
      item['title'] = item.name
      if (item.parentId == null && !map.has(item.id)) {
        map.set(item.id, item)
      }
      if (item.parentId) {
        let children = map.get(item.parentId).children
        children ? children.push(item) : (children = [item])
        map.get(item.parentId).children = children
      }
    })
    return [...map.values()]
  }
}
