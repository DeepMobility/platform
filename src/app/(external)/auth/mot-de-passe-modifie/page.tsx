import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function PasswordUpdated() {
  const t = await getTranslations('auth')

  return (
    <div className="flex flex-col">
      <span className=' mx-auto'>
        {t('passwordUpdated')}
      </span>

      <Link
        href="/auth/login"
        className='mt-4 mx-auto underline'
      >
        {t('backToLoginLink')}
      </Link>
    </div>
  )
}
