<script setup lang="ts">
import useCountdown from '@/hooks/countdown'
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import UserApi from '@/api/user'
import { isPhone } from '@/utils/is'

const { time, start } = useCountdown()
const { loading, setLoading } = useLoading()

const userStore = useUserStore()

const sendCode = async () => {
  if (!isPhone(loginForm.phone)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    await UserApi.sendCode(loginForm.phone)
    start(60)
    uni.showToast({ title: '发送成功', icon: 'none' })
  } catch (err) {
    uni.showToast({ title: `发送失败,${err}`, icon: 'none' })
  }
}

const loginForm = reactive({
  phone: '18519004150',
  code: '',
})

const validateForm = (): boolean => {
  if (!isPhone(loginForm.phone)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return false
  }
  if (!loginForm.code) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return false
  }
  return true
}

const loginHandle = async () => {
  if (loading.value) return
  if (!validateForm()) return
  setLoading(true)
  try {
    await userStore.login(loginForm)
  } catch {}
}

const wxLoginHandle = (e: any) => {
  // 获取手机号 + encryptedData 登录
  uni.showToast({
    title: e.detail?.encryptedData,
  })
}
</script>

<template>
  <view class="login">
    <!-- login banner -->
    <view class="login-banner">
      <image src="" />
    </view>
    <!-- login form -->
    <view class="login-form">
      <uni-forms :model-value="loginForm">
        <uni-forms-item name="phone">
          <uni-easyinput
            v-model="loginForm.phone"
            type="number"
            placeholder="请输入手机号"
          />
        </uni-forms-item>
        <uni-forms-item name="code">
          <uni-easyinput
            v-model="loginForm.code"
            type="number"
            placeholder="请输入短信验证码"
          />
        </uni-forms-item>
        <button @click="sendCode()">
          {{ time === 0 ? '获取验证码' : `重新发送(${time})s` }}
        </button>
      </uni-forms>
    </view>
    <view>
      <button :loading="loading" class="btn-primary" @click="loginHandle">
        手机号登录
      </button>
      <button
        open-type="getPhoneNumber"
        :loading="loading"
        class="btn-success"
        @getphonenumber="wxLoginHandle"
      >
        微信授权登录
      </button>
    </view>
  </view>
</template>

<style lang="scss"></style>
