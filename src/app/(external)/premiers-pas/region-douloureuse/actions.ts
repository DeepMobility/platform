'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
import cookieOptions from '@/lib/cookieOptions';
 
export async function updateMyPainfulBodyPart(formData: FormData) {
  const bodyPart = formData.get('bodyPart')

  await post('update-my-painful-body-part', { bodyPart })

  const cookieStore = await cookies()

  cookieStore.set('userPainfulBodyPart', bodyPart?.toString() || '', cookieOptions)

  redirect('/')
}