export interface LoginParams {
  phone: string
  code: string
}

export interface LoginResult {
  realName: string
  phone: string
}
