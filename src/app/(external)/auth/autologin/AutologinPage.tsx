'use client'

import { useEffect, useState } from 'react'
import { autologin } from './actions'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function AutologinPage({ token }: { token: string }) {
  const t = useTranslations('auth')
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
              setSuccessMessage(t('autologinAccountConfirmed'))
            } else {
              setSuccessMessage(t('autologinSuccess'))
            }

            if (result.redirectUrl) {
              setTimeout(() => {
                router.push(result.redirectUrl)
              }, 1250)
            }
          } else if (result && !result.success) {
            setError(result.errorMessage ? t(result.errorMessage) : t('autologinError'))
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error('Autologin error:', error)
          setError(t('autologinAutoError'))
          setLoading(false)
        })
    } else {
      setError(t('autologinNoToken'))
      setLoading(false)
    }
  }, [token, router])

  const getLoadingMessage = () => {
    switch (purpose) {
      case 'registration':
        return t('autologinLoadingRegistration')
      case 'password-reset':
        return t('autologinLoadingPasswordReset')
      default:
        return t('autologinLoadingDefault')
    }
  }

  const getErrorTitle = () => {
    switch (purpose) {
      case 'registration':
        return t('autologinErrorRegistration')
      case 'password-reset':
        return t('autologinErrorPasswordReset')
      default:
        return t('autologinErrorDefault')
    }
  }

  const getErrorDetails = () => {
    switch (purpose) {
      case 'registration':
        return t('autologinErrorDetailsRegistration')
      case 'password-reset':
        return t('autologinErrorDetailsPasswordReset')
      default:
        return t('autologinErrorDetailsDefault')
    }
  }

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <h2 className='text-2xl font-semibold mb-4'>{t('autologinSuccessTitle')}</h2>
        <p className='text-center max-w-md'>{successMessage}</p>
        <p className='mt-4 text-sm'>{t('autologinRedirecting')}</p>
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
              {t('createNewAccount')}
            </Link>
          )}
          <Link href="/auth/login" className='underline hover:no-underline'>
            {t('connectWithEmailPassword')}
          </Link>
        </div>
      </div>
    )
  }

  return null
}
