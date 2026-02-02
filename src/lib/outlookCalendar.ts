import { getReminderMessageForTime } from './reminderMessages';

/**
 * Generate an Outlook Calendar URL for adding a reminder
 * Note: Outlook web doesn't support RRULE in URL params, so users need to manually set recurrence
 * @param reminderTime - Time in HH:MM format (e.g., "08:00")
 * @returns Outlook Calendar URL
 */
export function generateOutlookCalendarUrl(reminderTime: string): string {
  const [hours, minutes] = reminderTime.split(':');

  // Create a date for today at the specified time
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));

  // Event duration: 6 minutes
  const endDate = new Date(startDate.getTime() + 6 * 60000);

  // Format dates for Outlook (ISO 8601)
  const startdt = startDate.toISOString();
  const enddt = endDate.toISOString();

  // Get personalized message based on time
  const { emoji, message } = getReminderMessageForTime(reminderTime);

  const title = `${emoji} Rappel DeepMobility - Votre routine bien-être`;

  // Add recurrence reminder to description since URL doesn't support RRULE
  const description =
    `${message}\n\n` +
    `Rendez-vous sur votre plateforme DeepMobility : ${window.location.origin}\n\n` +
    `⚠️ IMPORTANT : Pensez à activer la répétition quotidienne dans Outlook pour que ce rappel se répète chaque jour.`;

  // Build URL parameters
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    body: description,
    location: 'DeepMobility',
    startdt,
    enddt,
  });

  // Use outlook.live.com for broader compatibility
  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

/**
 * Open Outlook Calendar in a new window to add the reminder
 * @param reminderTime - Time in HH:MM format
 */
export function openOutlookCalendar(reminderTime: string): void {
  const url = generateOutlookCalendarUrl(reminderTime);
  window.open(url, '_blank');
}
