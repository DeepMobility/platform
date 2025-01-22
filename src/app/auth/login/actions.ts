'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function login(errorState: { message: string }, formData: FormData) {
  const headersList = await headers()

  const response = await unauthenticatedPost('login', {
    email: formData.get('email'),
    password: formData.get('password'),
    host: headersList.get('host')?.split(':')[0],
  })

  if (response.statusCode === 401) {
    return { message: "Aucun compte associé à cet email" }
  }

  if (response.statusCode === 403) {
    return { message: "Mot de passe incorrect" }
  }

  const cookieStore = await cookies()

  cookieStore.set('jwt', response.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/')
}