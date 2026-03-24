'use client'

import { useEffect } from 'react'
import { setAccountSlugCookie } from '@/app/(external)/auth/actions'

export default function AccountSlugSetter({ slug }: { slug: string }) {
  useEffect(() => {
    setAccountSlugCookie(slug)
  }, [slug])

  return null
}
