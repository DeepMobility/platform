'use server'

import { unauthenticatedPost } from '@/lib/httpMethods';
import { setAuthCookies } from '../actions';

export async function autologin(token: string) {
  const response = await unauthenticatedPost('autologin', { token });

  if (response.statusCode === 401) {
    return {
      success: false,
      errorMessage: "autologinLinkExpired",
      purpose: null,
      redirectUrl: null,
    };
  }

  await setAuthCookies(response);

  let redirectUrl: string;

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
