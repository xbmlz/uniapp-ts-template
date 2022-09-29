import { defineStore } from 'pinia'
import type { LoginParams } from '@/api/user/model'
import UserApi from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

interface UserState {
  token: string
  realName: string
  phone: number
  avatarUrl: string
  nickName: string
  vb: number
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: undefined,
    realName: undefined,
    phone: undefined,
    avatarUrl: undefined,
    nickName: undefined,
    vb: 0,
  }),
  getters: {
    getUserInfo(state: UserState): UserState {
      return { ...state }
    },
    getToken() {
      return this.token || getToken()
    },
  },
  actions: {
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    setToken(token: string) {
      this.token = token || ''
      setToken(token)
    },
    resetUserInfo() {
      this.$reset()
      removeToken()
    },
    // 登录
    async login(loginForm: LoginParams) {
      // 账号密码登录
      const data = await UserApi.login(loginForm)
      const { token } = data
      this.setToken(token)
      // 获取用户信息
      const info = await UserApi.getUserInfo()
      this.setUserInfo(info)
      return info
    },
    async logout() {
      if (this.token) {
        await UserApi.logout()
      }
      this.resetUserInfo()
      uni.reLaunch({ url: '/pages/login/index' })
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
