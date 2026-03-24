'use client'

import faqCount from "@/lib/faq"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"
import { useTranslations } from 'next-intl'

export default () => {
  const t = useTranslations('faqPage')
  const tc = useTranslations('common')
  const tFaq = useTranslations('content.faq')

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-8 mt-4">
      <Link
        href="/"
        className="hover:underline flex gap-2 items-center"
      >
        <MdArrowBack />
        <span>{tc('back')}</span>
      </Link>

      <div className="bg-gray-100 rounded-3xl p-6 flex flex-col gap-6">
        <h1 className="font-bold text-xl">{t('title')}</h1>

        {Array.from({ length: faqCount }, (_, i) => (
          <div className="flex flex-col gap-3" key={i}>
            <h2 className="font-bold text-lg">
              {tFaq(`${i}.label`)}
            </h2>

            <div>
              {tFaq(`${i}.value`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
