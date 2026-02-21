'use client'

import Form from "next/form"
import { updateMyOtherThematicInterests } from "./actions"
import otherThematicInterests from "@/lib/otherThematicInterests"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'

export default function OtherThematicInterestsPage({ userOtherThematicInterests }: {
  userOtherThematicInterests: string[]
}) {
  const t = useTranslations('onboarding')
  const tc = useTranslations('common')
  const tContent = useTranslations('content.otherThematicInterests')
  const router = useRouter()

  const updateThematics = async (formData: FormData) => {
    await updateMyOtherThematicInterests(formData);

    router.push('/?welcome=true')
  }

  return (
    <div>
      <h1 className="font-bold text-xl">{t('gettingToKnow', { step: 3, total: 3 })}</h1>

      <Form action={updateThematics} className="mt-4 flex flex-col gap-6">
        <p>{t('question3')}</p>

        <div className="flex flex-col gap-4">
          {otherThematicInterests.map((thematic) => (
            <div className="flex gap-2" key={thematic}>
              <input type="checkbox" name="thematics" id={thematic} value={thematic}
                defaultChecked={userOtherThematicInterests.includes(thematic)}
              />
              <label htmlFor={thematic}>{tContent(thematic)}</label>
            </div>
          ))}
        </div>

        <div className="flex gap-8 ml-auto">
          <button type="button" className='p-2 text-gray-500 rounded-2xl'
            onClick={() => router.push('/premiers-pas/regions-douloureuses')}
          >
            {tc('back')}
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl ml-auto'>{tc('finish')}</button>
        </div>

      </Form>
    </div>
  )
}
