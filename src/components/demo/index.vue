<script setup lang="ts">
import QiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

const chartData = ref({
  categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
  series: [
    {
      name: '目标值',
      data: [35, 36, 31, 33, 13, 34],
    },
    {
      name: '完成量',
      data: [18, 27, 21, 24, 6, 28],
    },
  ],
})
</script>

<template>
  <view>
    <QiunDataCharts type="column" :chart-data="chartData" />
  </view>
</template>
