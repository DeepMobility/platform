'use server'

import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
import cookieOptions from '@/lib/cookieOptions';
 
export async function updateMyOtherThematicInterests(formData: FormData) {
  const thematics = formData.getAll('thematics')

  await post('update-my-other-thematic-interests', { thematics })

  const cookieStore = await cookies()

  cookieStore.set('userOtherThematicInterests', JSON.stringify(thematics), cookieOptions)

  return;
}