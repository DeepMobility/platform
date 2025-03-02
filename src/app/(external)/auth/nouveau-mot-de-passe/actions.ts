'use server'

import { redirect } from 'next/navigation'
import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function newPassword(formData: FormData, token: string) {
  await unauthenticatedPost('new-password', {
    token,
    newPassword: formData.get('newPassword'),
  })

  redirect('/auth/mot-de-passe-modifie')
}