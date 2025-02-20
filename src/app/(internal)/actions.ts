'use server'

import { post } from '@/lib/httpMethods';
 
async function startSession(formData: FormData, videoId: number, question: string) {
  const questionRating = formData.get('beforeRating')

  return post('start-session', { videoId, question, questionRating })
}

async function endSession(formData: FormData, sessionId: number) {
  const questionRating = formData.get('afterRating')

  return post('end-session', { sessionId, questionRating })
}

export {
  startSession,
  endSession,
}