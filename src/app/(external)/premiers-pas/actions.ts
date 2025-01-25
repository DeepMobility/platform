'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
import { cookies } from 'next/headers';
 
export async function updateUserJobType(formData: FormData) {
  const jobType = formData.get('jobType')

  console.log(jobType)

  await post('update-user-job-type', { jobType })

  const cookieStore = await cookies()

  cookieStore.set('userJobType', jobType?.toString() || '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/')
}