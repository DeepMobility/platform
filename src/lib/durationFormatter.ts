export default function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60)
  const secondes = duration - minutes * 60

  return secondes > 0 ? `${minutes} min ${secondes}` : `${minutes} min`
}