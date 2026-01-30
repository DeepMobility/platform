import { get } from '@/lib/httpMethods';
import ReminderPage from './ReminderPage';
import { getCalendarUrl } from './actions';

export default async function RemindersPage() {
  const { reminderTime }: { reminderTime: string | null } = await get('get-my-reminder-time');
  const calendarUrl = await getCalendarUrl();

  return <ReminderPage initialReminderTime={reminderTime} calendarUrl={calendarUrl} />;
}

