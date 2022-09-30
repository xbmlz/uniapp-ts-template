import { getToken } from '@/utils/auth'
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

type MethodType =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

class Request {
  public request(method: MethodType, url: string, data: any) {
    const token = getToken()
    return new Promise((resolve, reject) => {
      let result
      uni.request({
        url: import.meta.env.VITE_BASE_URL + url,
        method,
        timeout: 15000,
        header: {
          Authorization: token ? token : '',
          'content-type':
            method === 'GET'
              ? 'application/json; charset=utf-8'
              : 'application/x-www-form-urlencoded',
        },
        data,
        success: (res: any) => {
          result = res.data
          if (!result) throw new Error('[HTTP] Request has no return value')
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
          const { code, msg, data } = result
          const hasSuccess = result && Reflect.has(result, 'code') && code === 0
          if (hasSuccess) {
            resolve(data)
          } else {
            uni.showToast({ title: msg, icon: 'error' })
            reject(new Error(msg || 'Error'))
          }
        },
      })
    })
  }

  public get<T = any>(url: string, data?: any): Promise<T> {
    return this.request('GET', url, data)
  }

  public post<T = any>(url: string, data: any): Promise<T> {
    return this.request('POST', url, data)
  }
}

export default new Request()
