<script setup lang="ts">
import { useAppStore, useUserStore } from '@/store'
import defaultAvatar from '@/static/images/me/me_avatar.png'
import { actionList } from './data'

const appStore = useAppStore()
const userStore = useUserStore()

const userInfo = computed(() => {
  return userStore.getUserInfo
})

const titleStyle = computed(() => {
  return { top: `${appStore.getNavHeight - 30}px` }
})
</script>
<template>
  <view class="relative">
    <!-- nav -->
    <view class="relative">
      <image
        class="w-screen"
        src="../../../static/images/me/me_background.png"
      />
      <text
        class="absolute c-white left-50% translate-x--50% text-xl"
        :style="titleStyle"
        >我的</text
      >
    </view>
    <!-- info -->
    <view
      class="absolute flex justify-around items-center top-128 left-60 h-200"
    >
      <!-- avatar -->
      <view class="flex flex-1 items-center mr-20">
        <image class="w-120 h-120 rd-50%" :src="defaultAvatar" />
        <text class="ml-2 c-white"> {{ userInfo.realName || '未登录' }}</text>
      </view>
      <!-- action -->
      <text class="ml-2 c-white mr-2">V币: 1000</text>
    </view>
    <!-- action list -->
    <view class="action-box">
      <view
        v-for="action in actionList"
        :key="action.name"
        class="action-box-list"
      >
        <!-- item left -->
        <view class="flex flex-1 items-center">
          <image class="w-58 h-58" :src="action.icon" />
          <text class="ml-3 text-xs" color="#999">{{ action.title }}</text>
        </view>
        <!-- item right -->
        <uni-icons type="right" size="20" />
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.action-box {
  position: absolute;
  top: 350rpx;
  left: 28rpx;
  right: 28rpx;
  padding: 0 32rpx;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
  .action-box-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110rpx;
    border-bottom: 1rpx solid #e5e5e5;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
