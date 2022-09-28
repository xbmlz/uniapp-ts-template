const TOKEN_KEY = 'UNI_TOKEN'

export function getToken(): string {
  return uni.getStorageSync(TOKEN_KEY)
}

export function setToken(token: string) {
  return uni.setStorageSync(TOKEN_KEY, token)
}

export function removeToken() {
  return uni.removeStorageSync(TOKEN_KEY)
}
