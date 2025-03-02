'use client'

import Form from 'next/form'
import { login } from './actions'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginPage() {
  const initialErrorState = { message: "" }

  const [formState, formAction] = useActionState(login, initialErrorState)

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
          <input type="password" name="password"/>
        </div>

        {formState?.message && (
          <p className='text-red-500'>{formState.message}</p>
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