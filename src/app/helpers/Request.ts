import axios, { AxiosInstance } from 'axios'
import { storage } from './local-storage.service'

const baseURL = window['env']['url']
const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 10 * 10000,
})

request.interceptors.request.use(config => {
  if (config.method.toLocaleLowerCase() === 'get') {
    let access_token = storage.get('access_token')
    access_token && (config.headers['access_token'] = access_token)
  }
  return config
})

request.interceptors.response.use(
  config => {
    if (config.status === 200) {
      return config.data
    } else {
      Promise.reject(config)
    }
  },
  error => Promise.reject(error)
)

export default request
