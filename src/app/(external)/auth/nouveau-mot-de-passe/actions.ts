'use server'

import { unauthenticatedPost } from '@/lib/httpMethods';
 
export async function newPassword(formData: FormData, token: string) {
  return unauthenticatedPost('new-password', {
    token,
    newPassword: formData.get('newPassword'),
  })
}