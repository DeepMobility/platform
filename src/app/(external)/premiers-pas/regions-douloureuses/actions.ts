'use server'

import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
import cookieOptions from '@/lib/cookieOptions';
 
export async function updateMyPainfulBodyPart(formData: FormData) {
  const bodyParts = formData.getAll('bodyParts')

  await post('update-my-painful-body-parts', { bodyParts })

  const cookieStore = await cookies()

  cookieStore.set('userPainfulBodyParts', JSON.stringify(bodyParts), cookieOptions)

  return;
}