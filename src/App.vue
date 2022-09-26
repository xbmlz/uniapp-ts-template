<script setup lang="ts">
import { useAppStore } from '@/store'
const appStore = useAppStore()
onLaunch(() => {
  // console.log('App Launch')
  appStore.initSystemInfo()
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>
