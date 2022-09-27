export default function useCountdown() {
  const time = ref(0)
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  const start = (num) => {
    time.value = num
    resume()
  }

  return { time, start }
}
