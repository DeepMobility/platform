'use server'

import { post } from '@/lib/httpMethods';
 
async function startSession(videoId: number, question: string, rating: FormDataEntryValue) {
  return post('start-session', { videoId, question, questionRating: rating })
}

async function endSession(formData: FormData, sessionId: number) {
  const questionRating = formData.get('afterRating')

  return post('end-session', { sessionId, questionRating })
}

export {
  startSession,
  endSession,
}