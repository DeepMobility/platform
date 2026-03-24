import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function TokenSent() {
  const t = await getTranslations('auth')

  return (
    <div className="flex flex-col">
      <span>
        {t('tokenSentMessage')}
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
