'use client'

import Form from "next/form"
import { updateMyPainfulBodyPart } from "./actions"
import { MdArrowForward } from "react-icons/md"
import painfulBodyParts from "@/lib/painfulBodyParts"
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function PainfulBodyPartPages({ userPainfulBodyParts }: { userPainfulBodyParts: string[] }) {
  const t = useTranslations('onboarding')
  const tc = useTranslations('common')
  const tContent = useTranslations('content.painfulBodyParts')
  const router = useRouter()

  const updateBodyParts = async (formData: FormData) => {
    await updateMyPainfulBodyPart(formData);

    router.push('/premiers-pas/autre-interets')
  }

  return (
    <div>
      <h1 className="font-bold text-xl">{t('gettingToKnow', { step: 2, total: 3 })}</h1>

      <Form action={updateBodyParts} className="mt-4 flex flex-col gap-6">
        <p>{t('question2')}</p>

        <div className="grid grid-cols-2 gap-2">
          {painfulBodyParts.map((part) => (
            <div className="flex gap-2" key={part}>
              <input type="checkbox" name="bodyParts" id={part} value={part}
                defaultChecked={userPainfulBodyParts.includes(part)}
              />
              <label htmlFor={part}>{tContent(part)}</label>
            </div>
          ))}
        </div>

        <div className="flex gap-8 ml-auto">
          <button type="button" className='p-2 text-gray-500 rounded-2xl'
            onClick={() => router.push('/premiers-pas/mode-de-travail')}
          >
            {tc('back')}
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2'>
            <span>{t('nextQuestion')}</span>
            <MdArrowForward size="24px" className="my-auto"/>
          </button>
        </div>
      </Form>
    </div>
  )
}
