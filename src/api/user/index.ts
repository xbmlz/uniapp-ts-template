import request from '@/utils/request'
import type { LoginParams, LoginResult, UserInfoResult } from './model'

enum Path {
  Login = '/login',
  Logout = '/logout',
  SenCode = '/sendCode',
  UserInfo = '/user/info',
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
  // 获取用户信息
  static getUserInfo() {
    return request.get<UserInfoResult>(Path.UserInfo)
  }
  // 退出登录
  static logout() {
    return request.get(Path.Logout)
  }
}
