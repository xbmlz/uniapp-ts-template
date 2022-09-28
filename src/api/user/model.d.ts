export interface LoginParams {
  phone: string
  code: string
}

export interface LoginResult {
  userId: string
  token: string
}

export interface UserInfoResult {
  phone: string
  realName: string
  avatarUrl: string
  nickName: string
  vb: number
}
