<template>
  <view>
    <image class="w-32 h-32" src="/static/logo.png" />
    <view>
      <text>{{ title }}</text>
      <view class="i-carbon-sun dark:i-carbon-moon" />
    </view>
  </view>
</template>

<script setup lang="ts">
const title = ref('Hello World')
</script>

<style></style>
