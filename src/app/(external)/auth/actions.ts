'use server'

import cookieOptions from '@/lib/cookieOptions';
import { cookies } from 'next/headers';
 
export async function setAuthCookies(user: any) {
  const cookieStore = await cookies()

  cookieStore.set('jwt', user.jwt, cookieOptions)
  cookieStore.set('userName', user.firstName, cookieOptions)
  cookieStore.set('userJobType', user.jobType, cookieOptions)
  cookieStore.set('userPainfulBodyPart', user.painfulBodyPart, cookieOptions)
  cookieStore.set('userOtherThematicInterest', user.otherThematicInterest, cookieOptions)
}