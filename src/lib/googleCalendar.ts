import { getReminderMessageForTime } from './reminderMessages';

/**
 * Generate a Google Calendar URL for adding a recurring daily reminder
 * @param reminderTime - Time in HH:MM format (e.g., "08:00")
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarUrl(reminderTime: string): string {
  const [hours, minutes] = reminderTime.split(':');
  
  // Create a date for today at the specified time
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
  
  // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatDateForGoogle = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hour}${min}00`;
  };

  const startDateTime = formatDateForGoogle(startDate);
  
  // Event duration: 6 minutes (for the routine)
  const endDate = new Date(startDate.getTime() + 6 * 60000);
  const endDateTime = formatDateForGoogle(endDate);

  // Get personalized message based on time
  const { emoji, message } = getReminderMessageForTime(reminderTime);

  const title = encodeURIComponent(`${emoji} Rappel DeepMobility - Votre routine bien-être`);
  const description = encodeURIComponent(
    `${message}\n\n` +
    `Rendez-vous sur votre plateforme DeepMobility : ${window.location.origin}`
  );
  const location = encodeURIComponent('DeepMobility');

  // RRULE for daily recurrence (every day, indefinitely)
  const recurrence = encodeURIComponent('RRULE:FREQ=DAILY');

  // Construct Google Calendar URL
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}` +
    `&dates=${startDateTime}/${endDateTime}` +
    `&details=${description}` +
    `&location=${location}` +
    `&recur=${recurrence}` +
    `&ctz=Europe/Paris`;

  return calendarUrl;
}

/**
 * Open Google Calendar in a new window to add the reminder
 */
export function openGoogleCalendar(reminderTime: string): void {
  const url = generateGoogleCalendarUrl(reminderTime);
  window.open(url, '_blank', 'width=800,height=600');
}

