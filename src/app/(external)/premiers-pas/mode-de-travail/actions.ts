'use server'

import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
import cookieOptions from '@/lib/cookieOptions';
 
export async function updateMyJobType(formData: FormData) {
  const jobType = formData.get('jobType')

  await post('update-my-job-type', { jobType })

  const cookieStore = await cookies()

  cookieStore.set('userJobType', jobType?.toString() || '', cookieOptions)

  return;
}