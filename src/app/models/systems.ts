enum UserType {
  行业用户 = 1,
  重点管控用户,
  系统用户,
}

interface IResponse<T> {
  meta: { success: boolean; message: string }
  data: T
}
interface IResponsePage<T> {
  meta: { success: boolean; message: string }
  data: {
    content: T
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
  }
}
interface IUserInfo {
  account: string
  admin: number
  age: number
  birthday: string
  id: number
  password: string
  phone: string
  sex: string
  status: number
  userName: string
  userType: number
}

interface IUser {
  id?: number
  password?: string
  account: string
  admin?: number
  age?: number
  birthday?: string
  phone?: string
  roleId?: number[]
  roleVo?: IRole
  sex?: string
  status?: number
  userName: string
  userType: number
}

interface IRole {
  id?: number
  roleName: string
  status?: number
  resourceVos?: IResource[]
}
interface IResource {
  id?: number
  name: string
  orderNum?: number
  parentId?: number
  url?: string
}

export { IResponse, IRole, IUser, IResource, IResponsePage, IUserInfo, UserType }
