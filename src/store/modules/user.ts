import { defineStore } from 'pinia'

interface UserState {
  nickName: string
  phone: number
  avatar: string
  gender: number
  province: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    nickName: undefined,
    phone: undefined,
    avatarUrl: undefined,
    gender: undefined,
    province: undefined,
  }),
  getters: {
    getUserInfo(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    resetUserInfo() {
      this.$reset()
    },
    // 小程序授权登录
    async authLogin(provider = 'weixin') {
      uni.login({
        provider,
        success: () => {
          uni.getUserInfo({
            provider,
            success: (res) => {
              this.setUserInfo(res.userInfo)
            },
            fail: (err) => {
              console.error(err)
            },
          })
        },
        fail: (err) => {
          console.error(`login error: ${err}`)
        },
      })
    },
  },
})
