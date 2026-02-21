const surveyQuestions: Array<{
  value: string
  type: 'rating' | 'choices'
  choiceValues?: string[]
}> = [
  { value: 'overall-feeling', type: 'rating' },
  { value: 'memorization', type: 'choices', choiceValues: ['yes', 'sometimes', 'no'] },
  { value: 'pain-reduction', type: 'rating' },
  { value: 'user-experience', type: 'choices', choiceValues: ['video-diversity', 'personalization', 'nothing'] },
  { value: 'commitment', type: 'choices', choiceValues: ['high', 'medium', 'low'] },
]

export default surveyQuestions
