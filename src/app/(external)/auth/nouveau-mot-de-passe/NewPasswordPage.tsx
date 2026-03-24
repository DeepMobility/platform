'use client'

import Form from "next/form"
import { newPassword } from "./actions"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'

export default function NewPasswordPage({ token }: { token: string }) {
  const t = useTranslations('auth')
  const router = useRouter()

  const submitPassword = async function(formData: FormData) {
    await newPassword(formData, token)

    router.push('/auth/mot-de-passe-modifie')
  }

  return (
    <div className="flex flex-col">
      <Form action={submitPassword} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword">{t('newPassword')}</label>
          <input type="password" name="newPassword" required/>
        </div>

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>{t('save')}</button>
      </Form>
    </div>
  )
}
