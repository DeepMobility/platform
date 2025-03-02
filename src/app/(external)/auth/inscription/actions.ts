'use server'

import { post } from '@/lib/httpMethods';
import { headers } from 'next/headers';
import { setAuthCookies } from '../actions';
 
export async function register(
  _state: {
    isComplete: boolean,
    errorMessage: string
  },
  formData: FormData
) {
  const headersList = await headers()

  const response = await post('register', {
    accountHost: headersList.get('host'),
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName') || null,
    lastName: formData.get('lastName') || null,
    gender: formData.get('gender') || null,
    birthYear: formData.get('birthYear') || null,
  })

  if (response.statusCode === 422 && response.message === "user already exists") {
    return {
      isComplete: false,
      errorMessage: "Ce compte existe déjà"
    }
  }

  await setAuthCookies(response);

  return {
    isComplete: true,
    errorMessage: ""
  }
}