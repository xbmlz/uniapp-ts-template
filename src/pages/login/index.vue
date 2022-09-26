<script setup lang="ts">
import { useUserStore } from '@/store'
const userStore = useUserStore()
const loginHandle = () => {
  userStore.authLogin()
}
const decryptPhoneNumber = (e: any) => {
  uni.showToast({
    title: e.detail?.encryptedData,
  })
}
</script>

<template>
  <view>
    <button class="bg-green c-white" @click="loginHandle">Login</button>
    <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">
      获取手机号
    </button>
  </view>
</template>

<style lang="scss"></style>
