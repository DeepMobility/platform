'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function login(formData: FormData) {
  const headersList = await headers()

  const data = await unauthenticatedPost('login', {
    email: formData.get('email'),
    password: formData.get('password'),
    host: headersList.get('host')?.split(':')[0],
  })

  const cookieStore = await cookies()

  cookieStore.set('jwt', data.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/')
}