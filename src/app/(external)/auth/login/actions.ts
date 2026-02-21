'use server'

import { headers } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
import { setAuthCookies } from '../actions';

export async function resendConfirmation(email: string) {
  const headersList = await headers()

  try {
    await unauthenticatedPost('resend-confirmation', {
      email,
      accountHost: headersList.get('host'),
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}

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

  if (response.statusCode === 401) {
    return {
      isComplete: false,
      errorMessage: "noAccountForEmail"
    }
  }

  if (response.statusCode === 403) {
    if (response.message === 'email_not_confirmed') {
      return {
        isComplete: false,
        errorMessage: "emailNotConfirmed"
      }
    }
    return {
      isComplete: false,
      errorMessage: "wrongPassword"
    }
  }

  await setAuthCookies(response);

  return {
    isComplete: true,
    errorMessage: ""
  }
}
