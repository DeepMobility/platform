'use server'

import { unauthenticatedPost } from '@/lib/httpMethods';

export async function completeInvitation(
  _state: {
    isComplete: boolean,
    redirectUrl: string,
    errorMessage: string
  },
  formData: FormData
) {
  const response = await unauthenticatedPost('complete-invitation', {
    token: formData.get('token'),
    password: formData.get('password'),
    firstName: formData.get('firstName') || null,
    lastName: formData.get('lastName') || null,
    gender: formData.get('gender') || null,
    birthYear: formData.get('birthYear') || null,
  })

  if (response.statusCode === 401) {
    return {
      isComplete: false,
      redirectUrl: "",
      errorMessage: "invitationExpired"
    }
  }

  if (response.statusCode === 400) {
    return {
      isComplete: false,
      redirectUrl: "",
      errorMessage: "invitationError"
    }
  }

  if (response.success && response.redirectUrl) {
    return {
      isComplete: true,
      redirectUrl: response.redirectUrl,
      errorMessage: ""
    }
  }

  return {
    isComplete: false,
    redirectUrl: "",
    errorMessage: "unknownError"
  }
}
