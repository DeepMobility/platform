'use client'

import { useEffect, useState } from 'react'
import { autologin } from './actions'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

export default function AutologinPage({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const purpose = searchParams.get('purpose') || 'login'

  useEffect(() => {
    if (token) {
      autologin(token)
        .then((result) => {
          if (result && result.success) {
            setSuccess(true)
            setLoading(false)
            
            if (result.purpose === 'registration') {
              setSuccessMessage('Votre compte a été confirmé avec succès.')
            } else {
              setSuccessMessage('Connexion réussie !')
            }

            if (result.redirectUrl) {
              setTimeout(() => {
                router.push(result.redirectUrl)
              }, 1250)
            }
          } else if (result && !result.success) {
            setError(result.errorMessage || "Une erreur est survenue")
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error('Autologin error:', error)
          setError("Une erreur est survenue lors de la connexion automatique.")
          setLoading(false)
        })
    } else {
      setError("Aucun token fourni")
      setLoading(false)
    }
  }, [token, router])

  const getLoadingMessage = () => {
    switch (purpose) {
      case 'registration':
        return 'Confirmation de votre inscription en cours...'
      case 'password-reset':
        return 'Vérification en cours...'
      default:
        return 'Connexion en cours...'
    }
  }

  const getErrorTitle = () => {
    switch (purpose) {
      case 'registration':
        return 'Erreur de confirmation'
      case 'password-reset':
        return 'Lien invalide'
      default:
        return 'Erreur de connexion'
    }
  }

  const getErrorDetails = () => {
    switch (purpose) {
      case 'registration':
        return 'Le lien de confirmation peut avoir expiré ou être invalide.'
      case 'password-reset':
        return 'Le lien de réinitialisation peut avoir expiré.'
      default:
        return 'Le lien de connexion peut avoir expiré ou être invalide.'
    }
  }

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <h2 className='text-2xl font-semibold mb-4'>✅ Connexion réussie !</h2>
        <p className='text-center max-w-md'>{successMessage}</p>
        <p className='mt-4 text-sm'>Redirection en cours...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500'></div>
        <p className='mt-4'>{getLoadingMessage()}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className='text-xl font-semibold mb-4'>{getErrorTitle()}</h2>
        <p className='text-red-500 mb-4'>{error}</p>
        <p className='text-sm mb-4'>
          {getErrorDetails()}
        </p>
        <div className='mt-6 flex gap-4'>
          {purpose === 'registration' && (
            <Link href="/auth/inscription" className='underline hover:no-underline'>
              Créer un nouveau compte
            </Link>
          )}
          <Link href="/auth/login" className='underline hover:no-underline'>
            Se connecter avec email et mot de passe
          </Link>
        </div>
      </div>
    )
  }

  return null
}

