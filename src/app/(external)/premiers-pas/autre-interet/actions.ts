'use server'

import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
import cookieOptions from '@/lib/cookieOptions';
 
export async function updateMyOtherThematicInterest(formData: FormData) {
  const thematic = formData.get('thematic')

  await post('update-my-other-thematic-interest', { thematic })

  const cookieStore = await cookies()

  cookieStore.set('userOtherThematicInterest', thematic?.toString() || '', cookieOptions)

  return;
}