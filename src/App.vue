<script setup lang="ts">
import { useAppStore } from '@/store'
const appStore = useAppStore()
onLaunch(() => {
  // App Launch
  appStore.initSystemInfo()
})
onShow(() => {
  // App Show
  appStore.checkUpdate()
})
onHide(() => {
  // App Hide
})
</script>
