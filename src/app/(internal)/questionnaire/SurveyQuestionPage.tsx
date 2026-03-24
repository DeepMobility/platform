'use client'

import surveyQuestions from "@/lib/surveyQuestions"
import Form from "next/form"
import { answerSurvey } from "./actions"
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function SurveyQuestionPage() {
  const t = useTranslations('survey')
  const tc = useTranslations('common')
  const tSurvey = useTranslations('content.surveyQuestions')
  const router = useRouter()

  const answer = async (formData: FormData) => {
    await answerSurvey(formData);

    router.push('/?surveyAnswered=true')
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="font-bold text-2xl">{t('title')}</h1>

      <p className="mt-4">
        {t('description')}
      </p>

      <Form action={answer} className="bg-gray-100 rounded-3xl p-6 flex flex-col gap-6 mt-6">
        {surveyQuestions.map((question, index) => (
          <div className="mt-4 flex flex-col gap-4" key={question.value}>
            <div>
              <span className="font-bold">{t('questionProgress', { current: index + 1, total: 5 })}</span>
              <span> - {tSurvey(`${question.value}.label`)}</span>
            </div>

            {question.type === "rating" ? (
              <div className="mx-auto">
                <datalist id="values" className="flex justify-between w-[250px] sm:w-[400px]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </datalist>

                <input
                  type="range" name={question.value} min="1" max="5" list="values"
                  className="w-[250px] sm:w-[400px] m-0 p-0 accent-gray-500"
                />
              </div>
            ): (
              <div className="flex flex-col justify-around">
                {question.choiceValues?.map((choiceValue) => (
                  <div className="flex gap-2" key={choiceValue}>
                    <input type="radio" name={question.value} id={choiceValue} value={choiceValue}/>
                    <label htmlFor={choiceValue}>{tSurvey(`${question.value}.choices.${choiceValue}`)}</label>
                  </div>
                ))}
              </div>
            )}

            <div className="border-b mt-4"></div>
          </div>
        ))}

        <div className="flex gap-8 ml-auto">
          <button type="button" className='p-2 text-gray-500 rounded-2xl'
            onClick={() => router.push('/')}
          >
            {tc('cancel')}
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2'>
            {tc('validate')}
          </button>
        </div>
      </Form>
    </div>
  )
}
