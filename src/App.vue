<script setup lang="ts">
import { useAppStore } from '@/store'
import { getToken } from '@/utils/auth'
const appStore = useAppStore()
onLaunch(() => {
  // App Launch
  appStore.initSystemInfo()
  if (!getToken()) {
    uni.reLaunch({ url: '/pages/login/index' })
  }
})
onShow(() => {
  // App Show
  appStore.checkUpdate()
})
onHide(() => {
  // App Hide
})
</script>
