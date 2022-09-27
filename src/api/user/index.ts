import request from '@/utils/request'
import type { LoginParams, LoginResult } from './model'

enum Path {
  SenCode = '/sendCode',
  Login = '/login',
}

export default class UserApi {
  // 发送验证码
  static sendCode(phone: string) {
    return request.get(`${Path.SenCode}/${phone}`)
  }
  // 登录
  static login(form: LoginParams) {
    return request.post<LoginResult>(Path.Login, form)
  }
}
