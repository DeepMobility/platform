'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
import { setAuthCookies } from '../actions';
 
export async function login(errorState: { message: string }, formData: FormData) {
  const headersList = await headers()

  const response = await unauthenticatedPost('login', {
    email: formData.get('email'),
    password: formData.get('password'),
    host: headersList.get('host'),
  })

  if (response.statusCode === 401) {
    return { message: "Aucun compte associé à cet email" }
  }

  if (response.statusCode === 403) {
    return { message: "Mot de passe incorrect" }
  }

  await setAuthCookies(response);
  
  redirect('/')
}