/**
 * Get reminder message key based on time
 * @param time - Time in HH:MM format (e.g., "08:00")
 * @returns Translation key for the reminder message
 */
export function getReminderMessageKey(time: string): string {
  const [hours] = time.split(':');
  const hour = parseInt(hours);

  if (hour >= 6 && hour < 7) return '6to7'
  if (hour >= 7 && hour < 8) return '7to8'
  if (hour >= 8 && hour < 10) return '8to10'
  if (hour >= 10 && hour < 12) return '10to12'
  if (hour >= 12 && hour < 14) return '12to14'
  if (hour >= 14 && hour < 16) return '14to16'
  if (hour >= 16 && hour < 18) return '16to18'
  if (hour >= 18 && hour < 20) return '18to20'
  if (hour >= 20 && hour < 21) return '20to21'
  if (hour >= 21 && hour < 22) return '21to22'
  return 'default'
}
