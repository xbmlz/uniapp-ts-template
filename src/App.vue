<script setup lang="ts">
import { useAppStore } from '@/store'
import { getToken } from '@/utils/auth'
const appStore = useAppStore()
onLaunch(() => {
  // App Launch
  // #ifndef H5
  appStore.initSystemInfo()
  // #endif

  if (!getToken()) {
    uni.reLaunch({ url: '/pages/login/index' })
  }
})
onShow(() => {
  // App Show
  // #ifndef H5
  appStore.checkUpdate()
  // #endif
})
onHide(() => {
  // App Hide
})
</script>
<style lang="scss">
@import './uni_modules/vk-uview-ui/index.scss';
@import './static/styles/main.scss';
</style>
