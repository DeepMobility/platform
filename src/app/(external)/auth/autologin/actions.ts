'use server'

import { unauthenticatedPost } from '@/lib/httpMethods';
import { setAuthCookies } from '../actions';

export async function autologin(token: string) {
  const response = await unauthenticatedPost('autologin', { token });

  if (response.statusCode === 401) {
    return {
      success: false,
      errorMessage: "Le lien de connexion est invalide ou a expiré.",
      purpose: null,
      redirectUrl: null,
    };
  }

  await setAuthCookies(response);
  
  let redirectUrl: string;
  console.log(response);
  if (!response.jobType) {
    redirectUrl = `/premiers-pas/mode-de-travail${response.purpose === 'registration' ? '?welcome=true' : ''}`;
  } else {
    redirectUrl = '/';
  }

  return {
    success: true,
    purpose: response.purpose,
    firstName: response.firstName,
    redirectUrl,
  };
}

