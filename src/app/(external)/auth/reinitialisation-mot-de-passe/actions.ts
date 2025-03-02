'use server'

import { headers } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function resetPassword(formData: FormData) {
  const headersList = await headers()

  return unauthenticatedPost('reset-password', {
    accountHost: headersList.get('host'),
    email: formData.get('email'),
  })
}