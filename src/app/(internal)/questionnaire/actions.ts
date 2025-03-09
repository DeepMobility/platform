'use server'

import { post } from "@/lib/httpMethods"
import surveyQuestions from "@/lib/surveyQuestions"

export async function answerSurvey(formData: FormData) {
  const answerValue = formData.get('answer')

  let survey: any = {}

  surveyQuestions.forEach(question => {
    survey[question.value] = formData.get(question.value)
  })

  return post('answer-survey', { survey })
}