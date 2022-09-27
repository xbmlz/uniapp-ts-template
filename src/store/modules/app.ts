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
    checkUpdate() {
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        // eslint-disable-next-line no-console
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用?',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })
      updateManager.onUpdateFailed((res) => {
        console.error(res)
        // 新的版本下载失败
        uni.showToast({
          title: '更新失败',
          icon: 'error',
        })
      })
    },
  },
})
