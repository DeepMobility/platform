'use server'

import { post, getApiUrl, getUserIdFromJwt } from "@/lib/httpMethods";

export async function updateReminderTime(formData: FormData) {
  const reminderTime = formData.get('reminderTime');
  
  await post('update-my-reminder-time', { reminderTime });
}

export async function getCalendarUrl(): Promise<string | null> {
  const userId = await getUserIdFromJwt();
  if (!userId) return null;

  return `${getApiUrl()}/calendar/${userId}.ics`;
}

