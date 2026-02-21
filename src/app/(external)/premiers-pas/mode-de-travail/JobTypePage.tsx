'use client'

import Form from "next/form"
import { updateMyJobType } from "./actions"
import jobTypes from "@/lib/jobTypes"
import { MdArrowForward } from "react-icons/md"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import AppModal from "@/components/AppModal"
import Image from 'next/image'
import Logo from "@/../public/logo.svg";
import { useTranslations } from 'next-intl'

export default function JobTypePage({ userJobType }: { userJobType: string | undefined }) {
  const t = useTranslations('onboarding')
  const tc = useTranslations('common')
  const tContent = useTranslations('content.jobTypes')
  const searchParams = useSearchParams()
  const router = useRouter()

  const [welcome, setWelcome] = useState(searchParams.get('welcome'))

  const removeWelcome = () => {
    router.replace('/premiers-pas/mode-de-travail');
    setWelcome(null);
  }

  const updateJob = async (formData: FormData) => {
    await updateMyJobType(formData);

    router.push('/premiers-pas/regions-douloureuses')
  }

  return (
    <div>
      <h1 className="font-bold text-xl">{t('gettingToKnow', { step: 1, total: 3 })}</h1>

      {welcome && (
        <AppModal closeModal={removeWelcome} size="md">
          <div className="w-full bg-[#A89B93] gap-4 flex flex-col items-center justify-around p-4 text-center">
            <Image
              src={Logo}
              width={150}
              height={120}
              alt={tc('deepmobilityLogoAlt')}
              className="w-[150px] h-[120px]"
            />

            <div className="font-bold text-2xl">
              {t('welcomeTitle')}
            </div>

            <div className="flex flex-col text-lg">
              <span>{t('welcomeIntro')}</span>
              <span dangerouslySetInnerHTML={{ __html: t.raw('welcomeCustomize') }} />
            </div>

            <button
              type="button"
              onClick={removeWelcome}
              className='bg-gray-500 text-white py-2 px-6 rounded-2xl'
            >
              {t('start')}
            </button>
          </div>
        </AppModal>
      )}

      <Form action={updateJob} className="mt-4 flex flex-col gap-6">
        <p>{t('question1')}</p>

        <div className="flex flex-col gap-4">
          {jobTypes.map((type) => (
            <div className="flex gap-2" key={type}>
              <input type="radio" name="jobType" id={type} value={type} required
                defaultChecked={userJobType === type}
              />
              <label htmlFor={type}>{tContent(type)}</label>
            </div>
          ))}
        </div>

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2 ml-auto'>
          <span>{t('nextQuestion')}</span>
          <MdArrowForward size="24px"/>
        </button>
      </Form>
    </div>
  )
}
