'use client'

import faq from "@/lib/faq"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"

export default () => {
  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-8 mt-4">
      <Link
        href="/"
        className="hover:underline flex gap-2 items-center"
      >
        <MdArrowBack />
        <span>Retour</span>
      </Link>

      <div className="bg-gray-100 rounded-3xl p-6 flex flex-col gap-6">
        <h1 className="font-bold text-xl">Foire aux questions :</h1>

        {faq.map(question => (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-lg">
              {question.label}
            </h2>

            <div>
              {question.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}