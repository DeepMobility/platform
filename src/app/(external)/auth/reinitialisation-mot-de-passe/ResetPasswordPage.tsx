'use client'

import Form from "next/form"
import Link from "next/link"
import { resetPassword } from "./actions"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const router = useRouter()

  const reset = async (formData: FormData) => {
    await resetPassword(formData)

    router.push('/auth/token-envoye')
  }

  return (
    <div className="flex flex-col">
      <Form action={reset} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email du compte</label>
          <input type="text" name="email" required/>
        </div>
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>Réinitialiser le mot de passe</button>
      </Form>

      <Link
        href="/auth/login"
        className='mt-4 mx-auto underline'
      >
        Se connecter
      </Link>
    </div>
  )
}