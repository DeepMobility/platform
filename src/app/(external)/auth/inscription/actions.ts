'use server'

import { post } from '@/lib/httpMethods';
import { headers } from 'next/headers';

export async function register(
  _state: {
    isComplete: boolean,
    emailSent: boolean,
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
      emailSent: false,
      errorMessage: "userAlreadyExists"
    }
  }

  if (response.statusCode === 403 && response.message === "user not allowed") {
    return {
      isComplete: false,
      emailSent: false,
      errorMessage: "userNotAllowed"
    }
  }

  if (response.emailSent) {
    return {
      isComplete: true,
      emailSent: true,
      errorMessage: ""
    }
  }

  return {
    isComplete: false,
    emailSent: false,
    errorMessage: "registrationError"
  }
}
