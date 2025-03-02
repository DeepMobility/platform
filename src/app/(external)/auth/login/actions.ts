'use server'

import { headers } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
import { setAuthCookies } from '../actions';
 
export async function login(
  _state: {
    isComplete: boolean,
    errorMessage: string
  },
  formData: FormData
) {
  const headersList = await headers()

  const response = await unauthenticatedPost('login', {
    email: formData.get('email'),
    password: formData.get('password'),
    accountHost: headersList.get('host'),
  })

  console.log(response)

  if (response.statusCode === 401) {
    return {
      isComplete: false,
      errorMessage: "Aucun compte associé à cet email"
    }
  }

  if (response.statusCode === 403) {
    return {
      isComplete: false,
      errorMessage: "Mot de passe incorrect"
    }
  }

  await setAuthCookies(response);

  return {
    isComplete: true,
    errorMessage: ""
  }
}