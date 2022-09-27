import { defineStore } from 'pinia'
import UserApi from '@/api/user'
import type { LoginParams } from '@/api/user/model'

interface UserState {
  realName: string
  phone: number
  token: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    realName: undefined,
    phone: undefined,
    token: undefined,
  }),
  getters: {
    getUserInfo(state: UserState): UserState {
      return { ...state }
    },
    getToken() {
      return this.token || (uni.getStorageSync('USER_TOKEN') as string)
    },
  },
  actions: {
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    setToken(token: string) {
      this.token = token || ''
      uni.setStorageSync('USER_TOKEN', token)
    },
    resetUserInfo() {
      this.$reset()
    },
    // 登录
    async login(loginForm: LoginParams) {
      // 账号密码登录
      const data = UserApi.login(loginForm)
      const { token } = data
      this.setToken(token)
      // TODO get user info
      return data
    },
    // 小程序授权登录
    // async authLogin(provider = 'weixin') {
    //   uni.login({
    //     provider,
    //     success: () => {
    //       uni.getUserInfo({
    //         provider,
    //         success: (res) => {
    //           this.setUserInfo(res.userInfo)
    //         },
    //         fail: (err) => {
    //           console.error(err)
    //         },
    //       })
    //     },
    //     fail: (err) => {
    //       console.error(`login error: ${err}`)
    //     },
    //   })
    // },
  },
})
