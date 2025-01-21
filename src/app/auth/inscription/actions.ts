'use server'

import { redirect } from 'next/navigation'
import { post } from '@/lib/httpMethods';
import { cookies, headers } from 'next/headers';
 
export async function register(errorState: { message: string }, formData: FormData) {
  const headersList = await headers()

  const response = await post('register', {
    accountHost: headersList.get('host')?.split(':')[0],
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName') || null,
    lastName: formData.get('lastName') || null,
    gender: formData.get('gender') || null,
    birthYear: formData.get('birthYear') || null,
  })

  console.log(response)

  if (response.statusCode === 422 && response.message === "user already exists") {
    return { message: "Ce compte existe déjà" }
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