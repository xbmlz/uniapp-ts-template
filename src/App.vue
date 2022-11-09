<script setup lang="ts">
import { useAppStore } from '@/store'
import { setupPermission } from '@/permission'

const appStore = useAppStore()

onLaunch(() => {
  // App Launch

  // #ifndef H5
  appStore.initSystemInfo()
  // #endif

  setupPermission()
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
