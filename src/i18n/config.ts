export const defaultLocale = 'fr'
export const supportedLocales = ['fr'] as const
export type Locale = (typeof supportedLocales)[number]
