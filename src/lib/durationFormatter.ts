export default function formatDuration(duration: number, t: (key: string, params?: any) => string) {
  const minutes = Math.floor(duration / 60)
  const secondes = duration - minutes * 60

  return secondes > 0
    ? t('duration.minutesAndSeconds', { minutes, seconds: secondes })
    : t('duration.minutesOnly', { minutes })
}
