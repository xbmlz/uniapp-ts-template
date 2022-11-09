<script setup lang="ts">
import { useAppStore, useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import UserApi from '@/api/user'
import { isPhone } from '@/utils/is'

const { loading, setLoading } = useLoading()

const userStore = useUserStore()

const appStore = useAppStore()

const loginForm = reactive({
  agree: false,
  phone: '18500001111',
  code: '123456',
  encryptedData: '',
})

const contenStyle = computed(() => {
  const statusBarHeight = appStore.systemInfo?.statusBarHeight || 0
  return {
    top: `${statusBarHeight}rpx`,
    height: `calc(100vh - ${statusBarHeight}rpx);`,
  }
})

const codeRef = ref()
const tips = ref('')
const isWaitCode = ref(false)
const codeChange = (text: any) => {
  tips.value = text
}

const codeEnd = () => {
  isWaitCode.value = false
}

const validateCode = (): boolean => {
  if (!loginForm.code) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return false
  }
  return true
}

const validatePhone = (): boolean => {
  if (!isPhone(loginForm.phone)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return false
  }
  return true
}

const validateAgree = (): boolean => {
  if (!loginForm.agree) {
    uni.showToast({ title: '请先阅读并同意用户协议', icon: 'none' })
    return false
  }
  return true
}

const sendCode = async () => {
  if (!validatePhone()) {
    return
  }
  try {
    if (codeRef.value.canGetCode) {
      uni.showLoading({
        title: '正验发送验证码',
      })
      await UserApi.sendCode(loginForm.phone)
      uni.hideLoading()
      uni.showToast({ title: '验证码已发送', icon: 'none' })
      isWaitCode.value = true
      codeRef.value.start()
    } else {
      uni.showToast({ title: '您的操作过于频繁，请稍后再试！', icon: 'none' })
    }
  } catch (err) {
    uni.showToast({ title: `验证码发送失败,${err}`, icon: 'error' })
    isWaitCode.value = false
  }
}

const doLogin = async () => {
  if (!validateAgree()) return
  setLoading(true)
  try {
    await userStore.login(loginForm)
    uni.showToast({ title: '登录成功' })
    uni.switchTab({ url: '/pages/tabbar/home/index' })
  } finally {
    setLoading(false)
  }
}

const phoneLoginHandle = async () => {
  if (loading.value) return
  if (!validateCode() && !validatePhone()) return
  await doLogin()
}

const wxLoginHandle = async (e: any) => {
  loginForm.encryptedData = e.detail?.encryptedData
  await doLogin()
}

const goAgreement = () => {
  uni.navigateTo({ url: '/pages/agreement/index' })
}
</script>

<template>
  <view class="login">
    <!-- login banner -->
    <image
      class="login-background"
      src="../../static/images/login/background.png"
    />
    <view class="login-content" :style="contenStyle">
      <image class="banner" src="../../static/images/login/banner.png" />
      <!-- login form -->
      <view class="login-form">
        <u-field v-model="loginForm.phone" placeholder="请填写手机号">
          <template #icon>
            <image
              class="w-41 h-41"
              src="../../static/images/login/account.png"
            />
          </template>
        </u-field>
        <u-field v-model="loginForm.code" placeholder="请填写验证码">
          <template #icon>
            <image class="w-41 h-41" src="../../static/images/login/code.png" />
          </template>
          <template #right>
            <u-verification-code
              ref="codeRef"
              :seconds="60"
              @end="codeEnd"
              @change="codeChange"
            />
            <u-button
              size="mini"
              :type="isWaitCode ? 'default' : 'primary'"
              @click="sendCode"
            >
              {{ tips }}
            </u-button>
          </template>
        </u-field>
        <view class="flex items-center my-4 ml-4">
          <u-checkbox-group>
            <u-checkbox v-model="loginForm.agree" :size="28" shape="circle">
              我已阅读并同意
            </u-checkbox>
          </u-checkbox-group>
          <text class="agreement" @click="goAgreement()">《服务须知》</text>
        </view>

        <view class="login-action">
          <u-button
            class="w-600 mb-6"
            type="primary"
            :loading="loading"
            @click="phoneLoginHandle"
          >
            手机号登录
          </u-button>
          <view>
            <button
              class="wx-btn"
              open-type="getPhoneNumber"
              @getphonenumber="wxLoginHandle"
            >
              <image
                class="w-80 h-80 mb-6"
                src="../../static/images/login/wx-login.png"
              />
            </button>
          </view>
          <view class="line">
            <view class="tip">微信登录</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }

  .login-content {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .banner {
      width: 100%;
      height: 630rpx;
    }
  }

  .login-form {
    width: 700rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;

    .agreement {
      color: #0070f9;
    }

    .login-action {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;

      .wx-btn {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
        border: none;
        outline: none;
        border-color: transparent;
        background-color: transparent;
        line-height: 0;
        &::after {
          border: none;
        }
      }

      .line {
        display: flex;
        justify-content: center;
        width: 300rpx;
        height: 40rpx;
        border-top: 1px solid #0070f9;
        position: relative;

        .tip {
          position: absolute;
          top: -20rpx;
          z-index: 10;
          width: 140rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          background: #fff;
        }
      }
    }
  }
}
</style>
