'use client'

import Form from 'next/form'
import { login, resendConfirmation } from './actions'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const initialState = { isComplete: false, errorMessage: "" }

  const [formState, formAction] = useActionState(login, initialState)
  const [emailForResend, setEmailForResend] = useState('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    if (formState?.isComplete) {
      router.push('/')
    }
  }, [formState, router])

  const [showPassword, setShowPassword] = useState(false)

  const handleResendConfirmation = async () => {
    setResendStatus('sending')
    try {
      const result = await resendConfirmation(emailForResend)
      if (result.success) {
        setResendStatus('sent')
        setTimeout(() => setResendStatus('idle'), 5000)
      } else {
        setResendStatus('error')
        setTimeout(() => setResendStatus('idle'), 3000)
      }
    } catch {
      setResendStatus('error')
      setTimeout(() => setResendStatus('idle'), 3000)
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
        <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>Connexion</div>
        <Link href="/auth/inscription" className='flex-1 text-center px-auto py-2 text-gray-700'>Inscription</Link>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            name="email"
            onChange={(e) => setEmailForResend(e.target.value)}
          />
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

        {formState?.errorMessage === 'Email non confirmé' ? (
          resendStatus === 'sent' ? (
            <p className='text-gray-600'>✓ Email de confirmation renvoyé avec succès</p>
          ) : (
            <button
              type="button"
              onClick={handleResendConfirmation}
              disabled={resendStatus === 'sending'}
              className='border-2 border-gray-500 text-gray-500 px-4 py-2 rounded-2xl disabled:opacity-50 hover:opacity-70'
            >
              {resendStatus === 'sending' ? 'Envoi en cours...' : 'Renvoyer l\'email de confirmation'}
            </button>
          )) : null}

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