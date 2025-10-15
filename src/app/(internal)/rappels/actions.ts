'use server'

import { post } from "@/lib/httpMethods";

export async function updateReminderTime(formData: FormData) {
  const reminderTime = formData.get('reminderTime');
  
  await post('update-my-reminder-time', { reminderTime });
}

