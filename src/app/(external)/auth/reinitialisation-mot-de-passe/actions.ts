'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function resetPassword(formData: FormData) {
  const headersList = await headers()

  await unauthenticatedPost('reset-password', {
    accountHost: headersList.get('host'),
    email: formData.get('email'),
  })

  redirect('/auth/token-envoye')
}