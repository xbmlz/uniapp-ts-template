import { defineStore } from 'pinia'

interface AppState {
  systemInfo: UniApp.GetSystemInfoResult
}

export const useAppStore = defineStore({
  id: 'id',
  state: (): AppState => ({
    systemInfo: undefined,
  }),
  getters: {
    getSystemInfo() {
      return this.systemInfo
    },
    getNavHeight() {
      const mbRect = uni.getMenuButtonBoundingClientRect()
      const sbHeight = this.systemInfo.statusBarHeight
      return sbHeight + mbRect.height + (mbRect.top - sbHeight) * 2
    },
  },
  actions: {
    setSystemInfo(info: UniApp.GetSystemInfoResult) {
      this.systemInfo = info
    },
    initSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.setSystemInfo(res)
        },
        fail: (err) => {
          console.error(err)
        },
      })
      uni.getMenuButtonBoundingClientRect
    },
  },
})
