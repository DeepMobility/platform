import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

function deepMerge(target: any, source: any): any {
  const output = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key])
    } else {
      output[key] = source[key]
    }
  }
  return output
}

export default getRequestConfig(async () => {
  const locale = 'fr'
  const defaultMessages = (await import(`../../messages/${locale}.json`)).default

  const cookieStore = await cookies()
  const accountSlug = cookieStore.get('accountSlug')?.value
  let messages = defaultMessages

  if (accountSlug) {
    try {
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const overridePath = join(process.cwd(), 'messages', 'overrides', accountSlug, `${locale}.json`)
      const content = await readFile(overridePath, 'utf-8')
      messages = deepMerge(defaultMessages, JSON.parse(content))
    } catch {
      // Pas d'overrides pour ce client, on utilise les traductions par défaut
    }
  }

  return { locale, messages }
})
