'use client'

import Image from 'next/image'

export default function ClientLogo({ logoUrl }: { logoUrl: string }) {
  return (
    <Image
      src={logoUrl}
      width={139}
      height={69}
      alt="Logo Client"
    />
  )
}