import { get } from '@/lib/httpMethods';
import ReminderPage from './ReminderPage';

export default async function RemindersPage() {
  const { reminderTime }: { reminderTime: string | null } = await get('get-my-reminder-time');

  return <ReminderPage initialReminderTime={reminderTime} />;
}

