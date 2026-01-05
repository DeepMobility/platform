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
      errorMessage: "Le lien d'invitation est invalide ou a expiré"
    }
  }

  if (response.statusCode === 400) {
    return {
      isComplete: false,
      redirectUrl: "",
      errorMessage: "Une erreur est survenue lors de la finalisation de votre inscription"
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
    errorMessage: "Une erreur est survenue"
  }
}

