/**
 * Generate a Google Calendar URL for adding a recurring daily reminder
 * @param reminderTime - Time in HH:MM format (e.g., "08:00")
 * @param reminderLabel - Label for the reminder
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarUrl(reminderTime: string, reminderLabel: string): string {
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
  
  // Event duration: 5 minutes (just a reminder)
  const endDate = new Date(startDate.getTime() + 5 * 60000);
  const endDateTime = formatDateForGoogle(endDate);

  const title = encodeURIComponent('🧘 Rappel DeepMobility - Votre routine bien-être');
  const description = encodeURIComponent(
    `C'est l'heure de votre routine bien-être quotidienne !\n\n` +
    `Prenez quelques minutes pour prendre soin de vous et améliorer votre mobilité.\n\n` +
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
export function openGoogleCalendar(reminderTime: string, reminderLabel: string): void {
  const url = generateGoogleCalendarUrl(reminderTime, reminderLabel);
  window.open(url, '_blank', 'width=800,height=600');
}

