'use client'

import Form from 'next/form'
import { login } from './actions'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const initialState = { isComplete: false, errorMessage: "" }

  const [formState, formAction] = useActionState(login, initialState)

  useEffect(() => {
    if (formState?.isComplete) {
      router.push('/')
    }
  }, [formState])

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
        <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>Connexion</div>
        <Link href="/auth/inscription" className='flex-1 text-center px-auto py-2 text-gray-700'>Inscription</Link>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mot de passe</label>
          <input type={showPassword ? "text" : "password"} name="password"/>
          <div className='flex gap-2'>
            <input id="showPassword" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPassword">Afficher le mot de passe</label>
          </div>
        </div>

        {formState?.errorMessage && (
          <p className='text-red-500'>{formState.errorMessage}</p>
        )}

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>Se connecter</button>
      </Form>

      <Link
        href="/auth/reinitialisation-mot-de-passe"
        className='mt-4 mx-auto underline'
      >
        Mot de passe oublié ?
      </Link>
    </div>
  )
}