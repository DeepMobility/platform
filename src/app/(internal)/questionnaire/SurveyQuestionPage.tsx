'use client'

import surveyQuestions from "@/lib/surveyQuestions"
import Form from "next/form"
import { answerSurvey } from "./actions"
import { useRouter } from 'next/navigation'

export default function SurveyQuestionPage() {
  const router = useRouter()

  const answer = async (formData: FormData) => {
    await answerSurvey(formData);

    router.push('/?surveyAnswered=true')
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="font-bold text-2xl">Étude de satisfaction trimestrielle</h1>

      <p className="mt-4">
        Votre retour est essentiel pour nous aider à affiner nos routines 
        et à adapter nos contenus à vos besoins. Cette enquête de 5 questions 
        est rapide et confidentielle. Merci pour vos réponses !
      </p>

      <Form action={answer} className="bg-gray-100 rounded-3xl p-6 flex flex-col gap-6 mt-6">
        {surveyQuestions.map((question, index) => (
          <div className="mt-4 flex flex-col gap-4" key={question.value}>
            <div>
              <span className="font-bold">{index + 1} / 5</span>
              <span> - {question.label}</span>
            </div>

            {question.type === "rating" ? (
              <div className="flex justify-around">
                {[1,2,3,4,5].map((rating) => (
                  <div className="flex flex-col gap-2" key={rating}>
                    <label htmlFor={question.value + rating}>{rating}</label>
                    <input type="radio" name={question.value} id={question.value + rating} value={rating}/>
                  </div>
                ))}
              </div>
            ): (
              <div className="flex flex-col justify-around">
                {question.choices?.map((choice) => (
                  <div className="flex gap-2" key={choice.value}>
                    <input type="radio" name={question.value} id={choice.value} value={choice.value}/>
                    <label htmlFor={choice.value}>{choice.label}</label>
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
            Annuler
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2'>
            Valider
          </button>
        </div>
      </Form>
    </div>
  )
}